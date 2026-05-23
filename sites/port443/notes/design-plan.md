# Port443 Design Plan

## Hero architecture

- Full-bleed network security hero using `hero-bg.jpg`.
- Brand-led headline with strong enterprise signal.
- Two primary CTAs: `Request a demo` and `Explore services`.
- Overlay a subtle telemetry/control rail motif to support the cyber automation narrative.

## Typography stack

- Use a strong sans display for the hero line and section headings.
- Use a neutral sans for body copy with high contrast for readability.
- Keep the first viewport headline wide and responsive; avoid cramped multi-line copy.

## Component architecture

- Hero: full-screen visual + text block + telemetry rail.
- Proof rail: three signal cards for MEA presence, automation, and framework validation.
- Control loop: sequential cards that show signals, correlation, and containment.
- Services section: four service offerings with clear narrative and action.
- Regional story: image-led section connected to the source geography.
- Contact stage: clear demo CTA with form and supporting details.

## Motion paradigm

- Use Framer Motion for entrance and reveal transitions only.
- Keep the hero motion subtle: parallax and opacity layers.
- Animate the telemetry rail and control loop with sequential reveals.
- Use `MotionConfig reducedMotion="user"` and `useReducedMotion` for accessibility.

## Conversion path

- Primary CTA in hero: `Request a demo`.
- Secondary CTA: `Explore services`.
- Repeat demo call-to-action in contact stage.
- Keep navigation links to About, Services, and Contact.

## Reduced-motion strategy

- Disable parallax on reduced motion.
- Replace continuous reveal animations with opacity-only transitions.
- Keep all content visible and readable without motion.
