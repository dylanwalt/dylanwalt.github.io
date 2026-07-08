# Drone video analysis workflow

Guidance for agent-assisted review of DJI clips (60 fps aerial footage).

## Why multi-frame sampling

A single thumbnail misses motion, subject, and story. Production agents should sample across the timeline and reason about the **sequence**, not one frame.

References:

- [Building a video analysis agent (CallSphere)](https://callsphere.ai/blog/building-video-analysis-agent-frame-extraction-scene-detection-summarization) — scene detection + interval frames + LLM summary
- FFmpeg `select` filter with `gt(scene,0.3)` for shot changes
- Evenly spaced samples (every N seconds) for smooth drone moves

## Pipeline (`analyze-drone-videos.py`)

1. List drone clips with `duration > 4s` (exclude live-photo MOV companions).
2. Per clip:
   - Scene-change frames via FFmpeg `select='gt(scene,0.25)'`
   - Plus 6–10 evenly spaced frames across duration
3. Write storyboard JPEGs to `_drone-review/<clip-id>/`
4. Agent reviews **all** frames in order and records:
   - `subject` — lodge, wildlife, deck, dining, landscape, BTS
   - `motion` — orbit, reveal, push-in, static, calibration
   - `tier` — `hero` | `usable` | `rough`
   - `hero_notes` — edit direction for hero tier (music, length, portal use)

## Tier definitions

| Tier | Use |
|------|-----|
| **hero** | Client-facing: stable, beautiful, clear story. Worth full grade + sound design. |
| **usable** | Good B-roll; keep but not primary hero. |
| **rough** | BTS, wrong exposure, test flight, people/equipment visible, not for public. |

## Running

```powershell
cd lodge-lens
python scripts\catalog-safari-media.py
python scripts\analyze-drone-videos.py
# Agent reads storyboards, updates drone-analysis.json
python scripts\build-editor-index.py
```
