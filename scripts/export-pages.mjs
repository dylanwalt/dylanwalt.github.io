import { spawn } from "node:child_process";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sitesRoot = path.join(root, "sites");
const dist = path.join(root, "pages-dist");

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

function run(command, args, cwd, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, shell: process.platform === "win32", stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function loadPublishedSites() {
  const folders = await readdir(sitesRoot, { withFileTypes: true });
  const sites = [];
  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const configPath = path.join(sitesRoot, folder.name, "site.config.json");
    const buildPath = path.join(sitesRoot, folder.name, "build");
    if (!(await exists(configPath)) || !(await exists(path.join(buildPath, "package.json")))) continue;
    const config = JSON.parse(await readFile(configPath, "utf8"));
    if (!config.publish?.slug) continue;
    sites.push({
      name: config.displayName,
      source: config.canonicalUrl,
      folder: folder.name,
      slug: config.publish.slug,
      buildPath,
    });
  }
  return sites.sort((left, right) => left.name.localeCompare(right.name));
}

async function liftSlugAssets(siteDist, slug) {
  const nestedAssets = path.join(siteDist, slug);
  if (!(await exists(nestedAssets))) return;
  for (const item of await readdir(nestedAssets)) {
    await cp(path.join(nestedAssets, item), path.join(siteDist, item), { recursive: true, force: true });
  }
  await rm(nestedAssets, { recursive: true, force: true });
}

function indexHtml(sites) {
  const cards = sites
    .map(
      (site) => `
        <a class="card" href="/${site.slug}/">
          <span>${site.folder.replaceAll("-", " ")}</span>
          <strong>${site.name}</strong>
          <small>${new URL(site.source).hostname}</small>
        </a>`,
    )
    .join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Website Rebuilds</title>
    <style>
      :root{color-scheme:dark;--bg:#081019;--ink:#f2eddf;--muted:#a8b6bc;--line:#ffffff1a;--hot:#ff9d4d}
      *{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 10% 0,#24485e,transparent 34rem),radial-gradient(circle at 92% 8%,#612e39,transparent 32rem),var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}
      main{min-height:100vh;max-width:1280px;margin:auto;padding:clamp(2rem,7vw,7rem)}
      p{max-width:50rem;color:var(--muted);font-size:clamp(1rem,2vw,1.35rem);line-height:1.7}h1{font-size:clamp(3.2rem,11vw,11rem);line-height:.9;letter-spacing:-.11em;margin:.7rem 0 1rem}
      .eyebrow{text-transform:uppercase;letter-spacing:.35em;font-weight:900;font-size:.75rem;color:var(--hot)}
      .grid{display:grid;gap:1rem;margin-top:3rem;grid-template-columns:repeat(auto-fit,minmax(min(17rem,100%),1fr))}
      .card{position:relative;display:grid;gap:.8rem;min-height:15rem;padding:1.5rem;border:1px solid var(--line);background:#ffffff0d;color:inherit;text-decoration:none;overflow:hidden;transition:transform .25s,border-color .25s,background .25s}
      .card:after{content:"";position:absolute;inset:auto -20% -55% 25%;height:11rem;background:radial-gradient(circle,var(--hot),transparent 66%);opacity:.22;transition:transform .35s}.card:hover,.card:focus-visible{transform:translateY(-5px);border-color:#ff9d4d88;background:#ffffff14;outline:none}.card:hover:after,.card:focus-visible:after{transform:translateY(-1rem)}
      span,small{text-transform:uppercase;letter-spacing:.24em;font-weight:900;font-size:.68rem;color:var(--muted)}strong{align-self:end;font-size:clamp(1.8rem,4vw,3.6rem);line-height:1;letter-spacing:-.08em}small{color:var(--hot)}
    </style>
  </head>
  <body>
    <main>
      <div class="eyebrow">Public rebuild index</div>
      <h1>Standalone local-business experiences.</h1>
      <p>Each route opens an independently rebuilt brand site from the multi-site website rebuild workspace.</p>
      <section class="grid">${cards}</section>
    </main>
  </body>
</html>`;
}

async function exportSite(site) {
  if (!(await exists(path.join(site.buildPath, "node_modules")))) {
    await run("npm", ["ci"], site.buildPath);
  }
  await run("npm", ["run", "build"], site.buildPath, {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: `/${site.slug}`,
  });
  const siteDist = path.join(dist, site.slug);
  await cp(path.join(site.buildPath, "out"), siteDist, { recursive: true, force: true });
  await liftSlugAssets(siteDist, site.slug);
}

const sites = await loadPublishedSites();
if (!sites.length) throw new Error("No published site builds found.");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const site of sites) {
  console.log(`Exporting ${site.name} at /${site.slug}/`);
  await exportSite(site);
}
await writeFile(path.join(dist, "index.html"), indexHtml(sites));
await writeFile(path.join(dist, ".nojekyll"), "");

async function patchLodgeLensBasePaths(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await patchLodgeLensBasePaths(full);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    let html = await readFile(full, "utf8");
    html = html.replaceAll('data-base-path=".."', 'data-base-path="/lodge-lens"');
    html = html.replaceAll('data-base-path=""', 'data-base-path="/lodge-lens"');
    await writeFile(full, html, "utf8");
  }
}

const lodgeLens = path.join(root, "lodge-lens");
if (await exists(lodgeLens)) {
  const lodgeDist = path.join(dist, "lodge-lens");
  await cp(lodgeLens, lodgeDist, { recursive: true, force: true });
  await patchLodgeLensBasePaths(lodgeDist);
  console.log("Copied lodge-lens to pages-dist/lodge-lens/ (base paths patched for GitHub Pages)");
}

console.log(`Exported ${sites.length} sites to ${path.relative(root, dist)}.`);
