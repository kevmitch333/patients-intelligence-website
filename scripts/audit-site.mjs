const routes = [
  "/", "/about", "/accessibility", "/brand-and-attribution", "/contact",
  "/data-governance", "/demo", "/how-it-works", "/insights", "/partners",
  "/pgi-standard", "/pilot", "/platform", "/privacy", "/research-policy",
  "/terms", "/trust",
];

const workerUrl = new URL(`../dist/server/index.js?audit=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };
const internalTargets = new Set();
const failures = [];

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
    env,
    context,
  );
  const html = await response.text();
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "";

  if (response.status !== 200 || h1Count !== 1 || !title) {
    failures.push({ route, status: response.status, h1Count, title });
  }

  for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = match[1];
    if (
      href.startsWith("/") &&
      !href.startsWith("//") &&
      !href.startsWith("/assets/") &&
      !href.startsWith("/resources/") &&
      !href.startsWith("/favicon")
    ) {
      internalTargets.add(href.split("#")[0] || "/");
    }
  }
}

for (const target of internalTargets) {
  const response = await worker.fetch(
    new Request(`http://localhost${target}`, { headers: { accept: "text/html" } }),
    env,
    context,
  );
  if (response.status !== 200) failures.push({ target, status: response.status });
}

const result = {
  routesChecked: routes.length,
  internalTargetsChecked: internalTargets.size,
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
