# Music and sound effects (all synthesised by code, made for this story)

Do this only after the picture timing is LOCKED. Any later change to times in story.js means making the sound again. No sample libraries, no downloaded audio.

## sound.json (write it in SHORT/audio/)
```json
{ "seed": 12,
  "music": { "mood": "curious", "sections": [ {"t": 0, "mood": "curious", "energy": 0.55}, {"t": 31.2, "mood": "tense", "energy": 0.35}, {"t": 36.0, "mood": "playful", "energy": 0.7} ], "under_voice_db": 9 },
  "sfx": [ {"t": 0.0, "kind": "whoosh"}, {"t": 4.13, "kind": "pop", "pitch": 1.2, "gain_db": -3} ],
  "tail": 0.25 }
```
- Plan the music from the script's five parts: hook (a clear opening colour), escalation (energy rising), pivot (drop to sparse or tense), execution (driving), resolution (the twist lands on a resolved chord, or a cold sparse ending for a haunting question). Choose moods that fit this story; a new seed for every short.
- Moods: curious, playful, tense, wonder, calm. Energy 0-1. The music stops at the twist line.
- Effects (kind): whoosh (opt. "up": false), swish, pop (pitch), boing (pitch), thud, impact, crash, click, tick, ding (note), chime, sparkle, splash, step (surface stone|soft), creak, rumble (dur), zap, slide_up, slide_down, drum (drum kick|snare|hat), gulp, bubble, buzz, clang, wind (dur), riser (dur).
- Put an effect on every whip and flash wipe (whoosh/swish), on the signature effect (steam: a soft hiss via wind, sparkle: sparkle, splash: splash), on impacts, on visible footsteps, and on the twist (ding, chime or a low hit). About one effect every 1.5-3 s; quick-cut clusters may have one per cut. A thump on stamps, a crash on collapses.
- Times are on the final voice clock (words.json). Hits land on the frame of the event.

## Make it
`PY "PLUGIN/scripts/make_sound.py" SHORT/audio/sound.json SHORT/voice/final.wav SHORT/audio`
Writes mix.wav (48 kHz stereo, voice length + tail), stems/ (voice, music, sfx) and sound_report.json.
The mix enforces: about -14.5 LUFS integrated, true peak -1 dBTP or lower, music and effects 8-12 dB under the voice overall, the music never closer than 6 dB to the voice while the voice speaks, sound effects at least 6 dB under the voice with peaks at most 0.7 times the voice peak. QA checks all of this from the stems. The loudness numbers come from earlier work, not from the reference style: after the first finished short, adjust `under_voice_db` if it plays badly.

Then put the finished mix into the project (this sets the length to the mix length, so picture and audio cannot drift):
`node "PLUGIN/scripts/project.mjs" audio "SHORT" SHORT/audio/mix.wav SHORT/words.json`
