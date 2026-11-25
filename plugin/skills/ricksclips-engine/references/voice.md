# Voice, silence and word timestamps

ORDER: normalise, find the pauses, remove the silent parts, (gently speed up a slow voice), THEN take the word timestamps from the cleaned audio. The picture, captions and sound are timed to the cleaned file only.

`VOICE` = SHORT/voice (copy the user's file in). Commands (PY = the venv python):
1. Normalise (any format): `PY "PLUGIN/scripts/prep_voice.py" VOICE/<file> VOICE/voice_norm.wav`. 48 kHz mono, -16 LUFS, peaks limited.
2. First pass, to find the pauses: `node "PLUGIN/scripts/transcribe.mjs" VOICE/voice_norm.wav VOICE/transcript1.json`, then `PY "PLUGIN/scripts/fix_words.py" VOICE/voice_norm.wav VOICE/transcript1.json SHORT/script.md VOICE/words_raw.json`. `match_ratio` under 0.9 means the recording differs from the script: tell the user, and the captions follow what was said.
3. Remove the silent parts: `PY "PLUGIN/scripts/trim_silence.py" VOICE/voice_norm.wav VOICE/words_raw.json VOICE/trimmed.wav VOICE/words_shifted.json`.
   - Pauses longer than 0.26 s become 0.28 s; shorter ones stay, so words never stick together.
   - Up to four dramatic pauses keep their natural length (at most 1.2 s): after the hook, before the pivot ("you see"), before the twist, before the last line.
   - The voice starts 0.03 s before the first word and ends 0.12 s after the last word.
4. Slow voice: `PY "PLUGIN/scripts/pace_voice.py" VOICE/trimmed.wav VOICE/words_shifted.json VOICE/final.wav VOICE/words_paced.json`. The reference voice speaks about 3.3 to 3.9 words per second; matching that is not required. Only a voice slower than 3.2 words per second is sped up, by at most 1.15x, pitch kept. If the result cannot be made, the original is kept.
5. Word timestamps from the cleaned audio: `node "PLUGIN/scripts/transcribe.mjs" VOICE/final.wav VOICE/transcript2.json`, then `PY "PLUGIN/scripts/fix_words.py" VOICE/final.wav VOICE/transcript2.json SHORT/script.md SHORT/words.json --digits`. This joins sub-word pieces into whole words, respells every word as in the script, snaps starts to clear energy rises, and writes numbers as digits for the captions (`text` = digits, `spoken` = the script's words).
   If the second pass fails or its `match_ratio` is under 0.9, use the first pass: `PY ".../fix_words.py" VOICE/final.wav VOICE/words_paced.json SHORT/script.md SHORT/words.json --digits`.
6. Put the voice into the project: `node "PLUGIN/scripts/project.mjs" audio "SHORT" VOICE/final.wav SHORT/words.json`. The sound step later replaces it with the finished mix.

Sanity checks on SHORT/words.json (fix by hand if needed): starts increase, no word shorter than 40 ms unless it is "a" or "I", the first word starts within 0.15 s, the number of words matches the script.
