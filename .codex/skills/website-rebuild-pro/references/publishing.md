# Publishing Rebuilds

## Workspace Contract

Use one public route per rebuild. Keep source and implementation files in
`sites/<site>/`, define the route in `site.config.json` as `publish.slug`, and
make the deployed URL predictable:

- User-site GitHub Pages: `https://<owner>.github.io/<slug>/`
- Project GitHub Pages: `https://<owner>.github.io/<repo>/<slug>/`

Do not merge rebuilt brands into one UI. A shared public index may link to each
route, but each route must open the corresponding standalone site.

## Static Export Pattern

Prefer a static export when the finished site has no server-only dependency:

1. Set the Next.js build to `output: "export"` for Pages publishing.
2. Set `images.unoptimized` for `next/image` in static exports.
3. Set the build `basePath` to the public route when internal links need a path
   prefix.
4. Keep public assets under a slug-prefixed directory or apply the same base
   path helper to asset URLs.
5. Export every site into one Pages artifact and include a root index that links
   all published slugs.

If a site needs server features, document that constraint and choose a host that
supports it before promising a live URL.

## Future Sites

When a new site is requested in this workspace, preserve earlier live rebuilds,
add the new route to the public index, and validate the new route plus one older
route before handoff.
