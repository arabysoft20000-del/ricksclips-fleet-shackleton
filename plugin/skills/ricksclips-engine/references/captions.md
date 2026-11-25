# Captions

On by default (settings.captions). Built into the engine from words.json; nothing to write by hand.
- 1 to 2 words at a time (two short words spoken close together share one caption), each word on screen about as long as it is spoken (about 0.2 s), in sync with the voice.
- Bold rounded sans: Nunito Black, white fill, solid black outline about 8 px at 1080 wide, outside the letters. No shadow, no box.
- Size: lowercase letters about 45 px tall at 1920 high (font size 88 px; x-height range 40-50 px). Everything scales with the video height, so 2K looks the same.
- Position: centred horizontally, caption centre 70.6 % from the TOP of the frame.
- Pop-in over 4 frames (scale 0.8, 1.08, 1.03, then 1.0); the allowed range is 2-6 frames.
- Sentence case with the script's own punctuation (all lowercase only when settings.caption_lowercase is true). Numbers show as digits ("50 coins") because words.json carries the digits in `text`.
- If a character's face would sit in the caption band when a caption starts, that caption moves up to 44 % from the bottom (decided per caption, never mid-word).
- Captions off: `settings.mjs set captions false`, then `project.mjs style SHORT`. Lowercase: `settings.mjs set caption_lowercase true`, then `project.mjs style SHORT`.
Check in stills: captions never cover a face and never touch the frame edges (if one word is wider than 86 % of the frame, rephrase).
