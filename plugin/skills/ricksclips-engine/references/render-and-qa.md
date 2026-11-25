# Render and the self-check loop

All commands use the pinned Remotion in WORK/.engine. `render.mjs` picks the number of workers from the memory and cores, and chooses 2K or 1080p for this machine by itself (a failed 2K render is retried at 1080p automatically). Its JSON result has `quality`, `width`, `height`, `webgl` (gpu or software), `notes` (why 1080p, if so) and `engine_lines` (every `[rc]` line from the engine).

## Look check before the full render (picture not yet locked)
Build the shots right the first time. One look at the stills is enough if they are clean. Repeat only while a real problem is left, at most 3 times.
1. Stills at every shot start and the middle of long holds:
   `node "PLUGIN/scripts/render.mjs" stills "SHORT" --at <times>` -> SHORT/qa/stills/tNNN.NN.jpg
2. Look at the stills yourself against [look.md](look.md), and read the `engine_lines` (plan check, shot check, camera check, check). Make a contact sheet if there are many.
3. Check these traps:
   - the narrow vertical frame: at 6 m and fov 38 the frame is only about 2.3 m wide, so stage characters in depth
   - the camera inside a wall or prop, or passing through them; a prop closer than about 2 m turning into a huge cut-off blob; railings, posts or lamp cords across faces or text
   - mirrored text; text cut by the frame edge
   - characters or animals cut at the face, or out of frame; captions over a face
   - characters passing through a gate, wall, door or prop; characters coming up from below the floor or appearing without a cut
   - the bottom of the frame showing ground outside the room; ceilings or floors with noise textures
   - outlines missing or doubled on a character, prop or animal
   - the scene too dark or too grey; more than one strong colour family in a scene
   - signs unreadable; wrong or offensive flags or symbols
   - a dense crowd of small objects: render two stills one frame apart (`--at 3.00,3.03`) and compare; if the pattern jumps, use fewer or bigger pieces
4. If something is wrong, fix it and look again; if nothing is wrong, go on. Then lock the timing and make the sound ([sound.md](sound.md)).

## Full render
`node "PLUGIN/scripts/render.mjs" video "SHORT"` -> SHORT/final.mp4 (progress is printed in steps of 10 %). `--draft` and `--frames 0-90` give a quick low-quality test clip. Tell the user an honest time estimate first: a GPU renders a one-minute short in minutes, software WebGL is about 9 times slower.

## Automatic self-check
`PY "PLUGIN/scripts/qa.py" SHORT/final.mp4 SHORT/qa/round<N> --mix SHORT/audio/mix.wav --stems SHORT/audio/stems --words SHORT/words.json --times <shot start times>`
It measures and checks (numbers in PLUGIN/qa/thresholds.json):
- size (1080x1920 or 1440x2560), 30 fps; black, white, long-frozen and single-frame-pop frames
- hard cuts per 10 s, median shot length, a cluster of quick cuts in long shorts
- caption centre (70.6 % from the top) and outline width (about 8 px at 1080 wide)
- mean brightness YAVG (100-135) and mean saturation SATAVG (22-50), both from FFmpeg signalstats over all frames; hue spread per still; pure black
- soft focus or fast movement share (estimate)
- loudness (about -14.5 LUFS) and true peak (-1 dBTP or lower) of the final mix in the mp4; the voice above the music and the sound effects (from the stems); the first word within 0.15 s, at most four long pauses, the video ending right after the last word; A/V sync
It writes qa_report.json, stills/ and contact.jpg. Read `ok` and `problems`, then look at contact.jpg yourself against the traps above.

## Rounds
If the check is clean, stop: no extra rounds. If it finds a real problem, fix it and render again, and stop as soon as the check is clean (one fix round is often enough). Never more than 3 renders in total. If problems remain after that, deliver anyway and tell the user exactly what is still not right (frame times and what). Never deliver a bad video silently.
