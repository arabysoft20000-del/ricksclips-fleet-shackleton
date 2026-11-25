# Engine API for story.js

story.js lives in SHORT/project/src and is the only file you write per short (plus sound.json). A plain JS module that the Remotion project bundles.

```js
import words from "./words.js";
export default {
  seed: 12,               // any integer; changes painted textures and small variations
  words,                  // captions, lowercase and ink width come from style.json (the user's settings)
  light: "day",           // default light; keys can change it
  build({ W, kit, mat, glow, cast, fx, makeLook, rand, clock, aim, aerial, THREE, makePalette, tintLight, buildSet, prop, dress, lights, LIGHTS }) {
    const { at, end } = clock;           // at("bridge") = start time (s) of the first word "bridge"; at("it", 12) = first "it" after 12 s
    ...build world, cast, timeline...
    return { camera: [ ...keys ], kicks: [ {t, amp} ], onFrame(t, ctx) {} };
  },
};
```

## World kit (`kit.*`, all take W first; units are metres, y is up, the ground is y = 0)
- `ground(W, {kind:"grass"|"dirt"|"stone"|"slabs"|"planks", color})`, `path(W, [x,z], [x,z], {width, kind, color})`, `water(W, {x,z,w,d,color})`, `hills(W, {color, dist})`
- `house(W, {x, z, ry, w, d, h, wall:"plaster"|"brick"|"stone"|"planks", wallColor, roof:"tiles"|"planks", roofColor, trim, door:{x,color}|false, windows:[{x,y,w,h,side:"front"|"back"|"left"|"right",shutters:"#hex",lit}], chimney:false|{x}, awning:"#hex", sign:"TEXT", glow})` (front faces +z before ry)
- `tree(W,{x,z,s,kind:"round"|"pine",color})`, `bush(W,{x,z,s,color,flowers})`, `rock(W,{x,z,s})`
- `fence(W,[x,z],[x,z],{color,h})`, `lamp(W,{x,z,on})`, `bench`, `table(W,{x,z,w,d,h,cloth})`, `chair`, `crate`, `barrel`, `well`, `stall(W,{x,z,ry,color})`, `room(W,{x,z,w,d,h,wallColor,floor,floorColor})` (interior with open front), `flag(W,{x,z,h,paint:(g,w,h)=>{}})` (paint the correct flag yourself), `signBoard(text, {...})` (returns a group; add with `W.add(group)`)
- Custom props: `kit.box(w,h,d, mat(kind,{color}), {x,y,z,ry})`, `kit.cyl(rt,rb,h,material,{...})`, `kit.ball(r,material,{...})`, combine in a `new THREE.Group()` and `W.add(group, {name:"cart"})`. Give overlapping parts at least 1 cm depth difference (shared faces flicker in the ink pass).
- Materials: `mat(kind, {color, seed, repeat:[u,v]})` with kind = plaster, brick, planks, tiles, stone, slabs (opt. `check:"#hex"` for checker floors), grass, dirt, wood, flat, water. `glow([r,g,b])` for things that should bloom (values above 1, e.g. [3,2,0.9]). Unlit readable faces: `{unlit:true}`.
- Every object added with W.add registers a collider; the camera guard warns when the camera is inside or within 2 m of one. Mark a deliberate foreground prop: `W.colliders.at(-1).foreground = true`.

## Palettes, sets, props, dressing, lights
- `const pal = makePalette(rand.fork(1), { family: "teal", accent: "orange" })` -> pal.wall, wall2, floor, floor2, ceiling, trim, wood, metal, prop, prop2, prop3, propLight, fabric, paper, dark, accent, accentDark, fill, cloth(i). Families: teal blue indigo violet pink red orange amber olive green mint.
- Light presets per place in `this.lights` (inside build): `this.lights.lab = tintLight({ ...LIGHTS.interior, sun: { ...LIGHTS.interior.sun, dir: [-0.6, 0.55, 0.25] } }, pal)`; keys then use `light: "lab"` (a key without `light` keeps the previous one).
- `const set = buildSet(W, { palette: pal, rooms: [{ id, x, z, w, d, h, floor:{kind,color,check}, wall:{kind,color}, ceiling:true, open:["s"], openings:[{ side:"n|s|e|w", kind:"door|arch|window", at, w, h, sill }] }] })` -> set.rooms[id], set.windows, set.doors. Rooms that touch share one wall; put the door in ONE of the two rooms.
- `dress(W, set.rooms.lab, "lab", { pal, set, keepClear: [[x, z, r], ...], centre: true, fixture: (W, o) => lights.practical({ ...o, kind: "panel" }) })` returns the number of props placed.
- `prop.<name>(W, { pal, x, z, y, ry, ... })`: desk officeChair sofa armchair bed table roundTable chair stool bench bookshelf shelf cabinet filingCabinet locker crateStack sacks counter fridge stove sink vendingMachine shopShelf monitor computer printer waterCooler labBench whiteboard poster frame clock noticeBoard wallShelf calendar vent pipe radiator curtain rug plant floorLampShade mug bottle boxSmall bookPile phone bin coatRack extinguisher ladder workbench toolBoard streetLamp hydrant mailbox trashCan cone car awningStall bunting. Many return `userData.top` (height of their top surface) for clutter.
- `lights.practical({ kind: "ceiling|panel|pendant|desk|wall|neon", x, y, z, color, light: true, intensity, distance })` (max 4 with `light: true`), `lights.shaft({ from, dir, w, h, length, color, strength })`, `lights.patch({ window, dir, w, h, strength })`, `lights.screen({ x, y, z, ry, w, h, paint(g, w, h), brightness })`.

## Cast
```js
const ada = cast.add({ name: "ada", look: makeLook(rand.fork(1), "adult", { fem: true, outfit: "coat", top: "#3b6fd2" }), pos: [x, z], h: 1.7 });
ada.walk(t0, t1, [[x, z], ...])   // walks along the points; feet stay planted; keep speed 1.1-1.5 m/s
   .face(t, "surprised")          // expressions: neutral happy grin laugh surprised shocked worried sad angry smug confused thinking sleepy determined
   .arms(t, "point")              // idle wave point armsUp shrug hips hold think cross reach clap facepalm
   .turn(t, "left"|"right")       // which way the face looks when standing
   .hop(t, 0.25)  .talk(t0, t1)  .hide(t)  .show(t)
   .hold(t0, t1, (g, hand, hands) => { /* draw a prop in the hand on the 640x1024 card canvas */ });
```
- Style: round head, flat capsule body, black stick limbs (about 16 px on screen), ball hands, big round eyes, one even outline (settings.ink_px on screen at any distance).
- Roles for makeLook: "adult" (3.5 heads tall, face about 29 % of the height), "child" (2.8), "elder" (3.3). Options override anything: skin, hair, hairStyle (short spiky bob long bun curly side ponytail bald none), hat (none cap tophat bowler beret hardhat straw helmet chef scarf), hatColor, outfit (tee shirt coat suit dress apron overalls uniform robe stripes), top, accent, shoes, glasses, mustache, beard, build (0.85-1.2).
- Timing is built in: a new face settles in 4 frames, a new arm pose blends over 9 frames, one walking step is about 13 frames, standing characters breathe 1-2 px.

## Animals
```js
const dog = cast.animal({ name: "dog", species: "dog", pos: [x, z], h: 0.6, color: "#c98a4a" });
dog.walk(t0, t1, [[x, z], ...]).face(t, "surprised").act(t0, t1, "wag").turn(t, "left").hop(t).hide(t).show(t);
```
- Species: dog cat rat pig cow sheep horse bird chicken fish. Options: h (height in m), color, belly, y (height above ground; fish swim at 0.6 m), seed.
- Faces: neutral happy surprised angry sleepy. Actions: wag (tail), peck (birds), flap (birds), sit (four-legged), eat (head down), swim (fish).
- Same flat inked style and outline as the characters; walking birds bob their heads with each step.
- Times: use `at("word")` so actions land 0-3 frames BEFORE the word (`at("crash") - 2/30`).
- `ada.eyes(t)` = the point between the eyes (focus target).

## Effects
- Pop-in stickers: `fx.add(kind, t0, t1, [x, y, z], {size, color})`: burst, stars, sweat, question, exclaim, notes, dust, heart.
- Signature effects (animated, seeded): `fx.emit(kind, t0, t1, [x, y, z], opts)`:
  steam / smoke / dust (rising puffs; opts size, rise, spread, count, color), splash (droplets thrown up at t0), sparkle (twinkling stars; spread), ring (glowing ring that expands; opts size, glow [r,g,b] above 1 for bloom), crowd (a crowd of simple figures that bob; opts area [w, d], count, colors).
- Light shafts: `lights.shaft(...)` (see above).

## Camera keys (`return { camera: [...] }`)
`{ t, pos:[x,y,z], look:[x,y,z], fov:38, roll:0, glide:0, move:"locked"|"push"|"pull", push:0, ease:"out"|"smooth"|"linear", path:[[x,y,z],...], transition:"whip"|"flash"|"dissolve", tframes, whipDir:1, aerial:true, light:"day"|"golden"|"night"|"interior"|<your preset>, lens:{ focus:"ada"|[x,y,z], px:12 }, shadowRadius:24 }`
- Every key is a new shot by default: glide 0 = hard cut at t. A shot of at least one second that is not an aerial gets a slow push-in by default (push 0.22 % of the distance per frame, stopping after the distance has changed 2x).
- `move: "pull"` (push -0.22) widens the picture, `move: "locked"` (or `push: 0`) keeps a shot still, or give an exact `push` value (positive = in, negative = back). See scene-direction.md for when.
- `glide: n` makes the camera travel to this key over n frames instead of cutting. Use it to reach a nearby place.
- `transition: "whip"` pans fast with a motion smear and switches place in the middle; `"flash"` sweeps a white band across and cuts under it (tframes 6); `"dissolve"` is the short ghost crossfade for a far place.
- `lens.px` = background blur size in px at 1920 high (0 = sharp). Focus follows a character's or animal's eyes.
- `light` changes per key; a key without `light` keeps the previous one.
- `aim([x,y,z], {dist, yaw, height, fov})` returns {pos, look, fov} framing a point; `aerial([x,y,z], {height, fov, tilt, yaw})` returns a top-down shot. Spread them into a key: `{ t, ...aim(ada.eyes(t), { dist: 4 }) }`. 9:16 is narrow: at 6 m and fov 38 the frame is only about 2.3 m wide.
- `kicks: [{t, amp: 0.06}]` = impact shake (flips every frame, decays over 7 frames).
- After build the engine prints `[rc] plan check`, `shot check`, `camera check` and `check` lines (pass-through, appearing in view, ground outside a room, cut signs). They come back in the `engine_lines` of every render.mjs result.

## Checking while writing
`node "PLUGIN/scripts/render.mjs" stills "SHORT" --at 1.5,8,20` renders single frames into SHORT/qa/stills and returns the `engine_lines`. Look at the stills yourself.
