# Immersive Website Rebuild Standard

Read this reference before editing a rebuild that should feel premium,
cinematic, spatial, editorial, or unusually polished.

## Design Standard

The rebuild must have an opinion about what the visitor should feel and notice
first. A strong result is not a set of fashionable blocks. It is a sequence:

1. recognition: the brand, product, venue, or offer is unmistakable
2. orientation: the visitor sees what it does and why it matters
3. evidence: real capabilities, product surfaces, credentials, or source details appear
4. momentum: the page changes tempo as the visitor scrolls
5. conversion: a primary action is repeated with context

Write the sequence into `notes/experience-brief.md` before implementation.

## Brand Archaeology

Extract source truth before redesign:

- logo variants, palette clues, typography clues, imagery, screenshots, and media
- repeated phrases, primary nouns, CTA language, offerings, audience, locations
- evidence: awards, client logos, years, metrics, news, testimonials, certifications
- useful content routes, forms, footer details, and legal details
- weak parts to improve: low-quality assets, redundant copy, generic stock imagery

If key proof is absent, design around clarity instead of inventing proof.

## Visual Direction

Define an experience thesis in one sentence:

```text
Make <brand> feel like <specific impression> by using <assets>, <layout rhythm>,
and <motion behavior>.
```

Then choose three visual anchors:

- hero scene: image, media, product surface, or generated bitmap
- signature motif: shape language, texture, line system, data rail, gallery rhythm,
  typographic device, material treatment, or object crop
- contrast strategy: light/dark banding, scale shift, density shift, color accent,
  or image-to-data transition

Avoid generic gradients, floating decoration blobs, wall-to-wall cards, and
visual motifs that are disconnected from the business.

## Hero Standard

The first viewport should look authored:

- H1 is the brand, literal offer, product name, place name, or person name
- value proposition moves to supporting copy
- a real visual asset carries the subject
- CTA hierarchy is obvious
- the next section is hinted at on short and wide viewports
- background media never makes text illegible

For a source with weak media, use a source logo plus generated or composed
bitmap assets that depict the subject. Do not substitute an abstract SVG scene.

## Section Rhythm

Use a paced section map instead of repeating a single component:

- full-bleed opener
- compact trust or proof rail
- narrative section with an image, product surface, or process view
- dense capability section
- lighter proof or insight beat
- decisive CTA

Repeated cards are useful for offerings or articles. They should not be the
entire visual language. Page sections should be full-width bands or unframed
layouts with constrained inner content.

## Motion Map

Write a motion map before implementation:

| Layer | Purpose | Typical effect | Reduced motion |
| --- | --- | --- | --- |
| Hero | establish hierarchy | staged reveal, slow depth shift | opacity only |
| Narrative | create sequence | one-time scroll reveal | static or fade |
| Product/proof | guide inspection | focus, highlight, count/progress if honest | static |
| Interaction | confirm intent | hover/focus transform or color | color/focus only |

Prefer fewer coherent effects over many unrelated effects. Animate `transform`
and `opacity` first. Use scroll-linked effects for a real narrative or progress
relationship, not because the library can do it.

Do not let motion hide text, block input, trigger repeated large layout work, or
make the page unusable with `prefers-reduced-motion`.

## Asset And Performance Rules

- Use `next/image` for static or dimensioned images where practical.
- Give fixed dimensions, aspect ratio, or fill constraints to visual assets.
- Treat the hero image as a likely LCP candidate and keep it efficient.
- Avoid shipping large unused galleries, video, shaders, or animation bundles.
- Audit registry components before accepting their dependencies and file writes.

## QA Gate

Inspect the rebuild in a browser before handoff:

- desktop and mobile first viewport
- section transition after the hero
- no horizontal overflow
- no illegible text over media
- focus is visible on navigation and CTAs
- reduced motion preserves comprehension
- real source details survive redesign

If the page still reads like a component catalog, revise it before handoff.

## Research Basis

- Motion accessibility guidance: use reduced-motion handling and replace large
  transform/parallax behavior when users request less motion.
- Motion scroll guidance: scroll-triggered and scroll-linked effects serve
  different purposes and should be chosen deliberately.
- Next.js image guidance: dimension images, use the image pipeline, and handle
  above-the-fold/LCP assets intentionally.
- shadcn registry docs: registry items can carry files, dependencies, registry
  dependencies, CSS variables, and environment variables.
- Core Web Vitals guidance: manage LCP and layout shift while building richer
  visual experiences.
