# /public/media/ — required poster images

Every `<video>` element on the LP references a poster image in this
directory. Browsers paint the poster instantly while the .webm/.mp4
streams; a missing poster falls back to the surrounding wrapper's
background colour (we've ensured every wrapper has one), but a real
poster is required to avoid a visible "popping in" of the video.

Drop files of the listed names and sizes here before launch. Format:
JPEG, optimized to ~80–120 KB each. The captioned color/mood column is
the spec the wider design system enforces.

| File                          | Used by                                 | Aspect / Size       | Color / mood spec                                  |
|-------------------------------|------------------------------------------|---------------------|----------------------------------------------------|
| `v1-basalt-poster.jpg`        | Hero — full-bleed                        | 16:9 · 1920×1080    | Sumi/copper. Water across wet basalt, low light    |
| `v3-kusatsu-poster.jpg`       | Onsens — Kusatsu plate                   | 16:11 · 1280×880    | Cold dawn, sulfuric steam, blue-grey               |
| `v3-beppu-poster.jpg`         | Onsens — Beppu plate                     | 16:11 · 1280×880    | Warm earth-red, mineral haze                       |
| `v3-gero-poster.jpg`          | Onsens — Gero plate                      | 16:11 · 1280×880    | Soft mountain light, alkaline pale-blue            |
| `v4-clavicle-poster.jpg`      | Thermoregulation — left half             | 1:1 · 1024×1024     | Bone/washi tones, skin macro                       |
| `v6-vial-poster.jpg`          | FinalCTA — formulation vial              | 4:5 · 800×1000      | Sumi background, single vial, copper rim light     |

Source videos themselves live alongside the posters with matching
basenames in `.webm` (VP9) and `.mp4` (H.264) variants:

    v1-basalt.{webm,mp4}
    v3-kusatsu.{webm,mp4}
    v3-beppu.{webm,mp4}
    v3-gero.{webm,mp4}
    v4-clavicle.{webm,mp4}
    v6-vial.{webm,mp4}

Until the real assets land, the wrappers stay coloured so the LP never
shows a stark blank rectangle.
