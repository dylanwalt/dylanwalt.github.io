# Taste-Skill Guardrails

This reference captures the highest-level design and behavioral rules for the
website rebuild workflow.

## Why it exists

A rebuild skill with strong tooling still needs strict aesthetic and process
guards. Without them, the agent defaults to safe, generic layouts and motion.
This taste-skill acts as the senior design engineer in the workflow.

## Mandatory process

1. **Do not write implementation until you have a design plan.**
   - The plan should select a hero architecture, typography stack,
     component architecture, motion paradigm, and conversion path.
   - The plan should be deterministic, not improvised.
2. **Commit to the design plan.**
   - Once the plan is established, use it as the blueprint for all edits.
3. **Audit component registry choices.**
   - If using shadcn/21st.dev/Aceternity/Magic UI, inspect files,
     dependencies, and any registry metadata before adding them.

## What is forbidden

- Generic purple gradients, generic glassmorphism, or unsupported decorations
- Copy like "SECTION 01" / "OUR FEATURES" / "WHY CHOOSE US" without brand context
- Font "Inter" used as brand identity unless the source explicitly requires it
- Decks of cards used as a low-effort visual strategy
- Motion that is purely decorative or that hides content
- Complex custom animation code when a registry-sourced component is a better fit

## AIDA and section discipline

The page should follow the AIDA flow:

- Attention: a strong hero with a clear brand or product promise
- Interest: supporting narrative or proof that explains why it matters
- Desire: evidence, capability details, or product surfaces that build trust
- Action: a decisive conversion section with a clear CTA

Use the experience brief and the design plan to enforce this sequence.

## Motion and interaction policy

- Use animation only when it serves hierarchy or comprehension.
- Prefer `transform` and `opacity` over layout-driven animation.
- Use scroll-linked motion when it reveals a real relationship between content and progress.
- Provide reduced-motion fallbacks for every meaningful interaction.
- Use GSAP ScrollTrigger for pinned, scrubbed, or timeline-based scrolling.
- Use Framer Motion for component-level entrance, hover, or reveal transitions.
- Use Lenis to add smooth scrolling inertia only when it improves the experience.

## Component and registry policy

- Prefer shadcn-style items because they expose the source and keep the project maintainable.
- Accept registry items only after verifying their `type`, `dependencies`, `devDependencies`, and
  `files[].target`.
- Do not accept a registry item that requires a major stack change unless the site stack
  explicitly supports it.

## Verification

Before handoff, ask:

- Can this page be mistaken for another brand if the logo is replaced?
- Is the hero specific to the source and the offer?
- Does the layout avoid generic component catalog patterns?
- Is the motion meaningful and gracefully disabled under reduced motion?
- Is the page navigable, responsive, and free of horizontal overflow?
