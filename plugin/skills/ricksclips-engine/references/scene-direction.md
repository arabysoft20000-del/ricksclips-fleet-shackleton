# Scene direction: from script to shots

The script decides everything. Shot boundaries follow its sentence and idea changes, so scenes start earlier or later depending on the story. Never use a fixed timeline.

## 1. Shot plan first (SHORT/shots.md, before story.js)
A table, one row per shot, with times from words.json: frames, the words, what we SEE (shot size: wide, medium, close, extreme close-up, insert on a prop, aerial), the place, the light, the camera (see 2), the transition into it, the characters with poses and expressions, effects and the sound cue. Every sentence is illustrated literally; props and animals carry the jokes. Frame 0 is already the hook image.

Shot mix (from the reference shorts, scale with the length):
- About a third of the runtime has no character as the main subject: a macro on a hero prop (a stopwatch, a paint can, a ticket, a bowl, a button, a bullet, a newspaper, a map), an aerial or top-down view, or an empty environment. These inserts carry the story.
- About a fifth of the runtime is close-ups and prop macros, about a third wides and aerials, the rest mediums.
- About 7 different places per 60 s (a new one every 9 s or so) and about 13 palette changes per 60 s (one every 5 s or so). The same set may change palette between scenes (day to sunset to night, a cell that gets repainted).
- Signs, boards and notices with period fonts are part of the set. When time passes, show it with a device (a growing scarf, tally marks, a stopwatch, a calendar, a counter, a thermometer).

## 2. Camera
The camera keeps moving. The engine does this by default:
- Every shot of at least one second that is not an aerial gets a slow PUSH-IN (0.22 % of the distance per frame, stopping once the distance has changed 2x). Use `move: "pull"` when the narration widens the picture (the scale of a scheme, the consequences, the twist that changes the reading of the whole scene, the big-picture ending). Use `move: "locked"` for quick-cut clusters (every shot under one second), comic beats where timing matters, and dialogue holds.
- A NEARBY place is reached by a camera GLIDE, not a cut: `glide: 18-45` frames, with `path: [[x,y,z],...]` through a doorway or around a corner.
- A FAR place gets a short ghost crossfade (`transition: "dissolve"`, 6-9 frames, the old shot shows as a see-through layer) or a hard cut. Whips and flash wipes (`transition: "whip"` or `"flash"`) mark big place or time jumps: at most four in a short.
- Scene changes (cuts plus glides): 1.1 to 2.8 per 10 s. Hard cuts alone at most 2.8 per 10 s. Cuts are not an even beat: in long shorts use a cluster of 3 or 4 quick cuts (0.4-1.0 s each) for a list of three, a reveal or a punchline, between long holds (5-10 s or more).
- Aerial or top-down shots: `{ t, ...aerial([x, y, z], { height: 12-20 }) }`. About 1 to 5 in a long short.
- Impact kicks (`kicks: [{t, amp}]`) on hits and crashes. Lens: wide, soft background (`lens: { focus, px }`), close-ups where the face or the prop fills the frame.
- Never two moving shots of the same direction back to back in a cluster; never a move on a 0.4-1.0 s shot.

## 3. Build each place
- Palette: `makePalette(rand, { family, accent })` per scene: one dominant colour family chosen for the story's mood (warm amber or orange for comfort and greed, teal or blue for science and calm, red or violet for danger, green or olive for nature, indigo for night and dread) plus one accent on one to three things per frame. Neighbouring scenes differ clearly in hue (at least about 40 degrees).
- Interiors: `buildSet()` with connected rooms, then `dress(...)`; add the story's hero props by hand. Themes: office, home, kitchen, shop, lab, classroom, workshop, hall. Exteriors: ground + `kit.house` rows + `prop.*` street furniture + trees and bushes.
- Detail density: every view holds many objects (about 5 to 30), every hero prop has small details (labels, small print, bevels, wear), signs carry readable text. No empty backdrops, no large flat areas of floor or grass. Props have a real shape: a car is not a box and a tree is not a blob. Build vehicles, machines and furniture from several parts with proper proportions.
- Light: strong and readable. `lights.practical()` for visible fixtures, `lights.shaft()` and `lights.patch()` at windows (window-bar shadows on the floor, light shafts), `lights.screen()` for glowing displays; at most 4 fixtures with `light: true` in the whole video. Cool against warm contrast. Keep scenes bright (see look.md).
- Readable signs (short words), correct flags and symbols only, nothing under 2 m from the lens unless it is a deliberate foreground prop.

## 4. Characters and animals
- New designs for every video with `makeLook` (cream or white egg-shaped head, soft cool shading, capsule body, very long thin legs, thin stick arms, ball hands, big eyes). 3 to 6 clearly different characters per short. Each one has one or two identity features: a hat with a band, a vest, a moustache, a scarf, a belt with a buckle, a cap, an apron, a bow tie, a sash. Never the same face on everyone, no round glasses by default.
- Animals with `cast.animal({ species })` in the same flat inked style, never smooth glossy 3D.
- Act every line: a new expression or arm pose every 2-3 s; reactions land 0-3 frames before the word. The engine does the timing: expressions change in 3-5 frames, arm moves 6-12 frames, walk cycle 12-15 frames, idle bob 1-2 px.
- Motion: every character is always slightly alive (breathing bob, blinks, head movement on stressed words); actions wind up, overshoot and settle; impacts get a quick dip, a dust puff and a small kick; something small always moves in the scene (cloth, dust, leaves, drips, water). Walk speed 1.1-1.5 m/s; `place()` moves someone between shots.
- A character must never pass through a gate, wall, door or prop (walk around or through an opening), never come up from below the floor, and never appear inside the frame without a cut, flash or camera move.

## 5. Signature effect
At least one per video, chosen from the story: steam, smoke, dust, splash, sparkle, glowing ring, light shafts, crowd of dots (`fx.emit(...)`, `lights.shaft(...)`). Anger gets steam, flames or a ring. Never force an effect the script does not need.

## 6. Timing
- `at("Word")`: exact capitalisation is matched first; pass a start time to skip earlier matches (`at("So", 26)`). A number can be used by the word the script spells ("fifty") or by its digits.
- The last shot holds to the end of the last word (+0.25 s tail).
- Read every `[rc] plan check`, `shot check`, `camera check` and `check` line in the render output (`engine_lines`) and fix them before the full render.
