---
name: ricksclips-engine
description: Make finished vertical 9:16 animated story shorts end to end in Claude Code - checks and sets up the tools, offers three fact-checked topics, writes the script, takes the user's own voice file and builds the video (word timing, toon 3D world, characters, code-made music and sound, captions, render, self-check), and writes the title, description and tags on request. Use whenever the user mentions RicksClips-Engine, sends this plugin with no other instruction, or asks for a short, a video, a story, topics, a topic, a script, titles or SEO for a short.
---

# RicksClips-Engine

All replies to the user are in English: short, plain and direct. No praise of yourself or the plugin, no extras, no explaining the checks. Say plainly what failed or is not right. [ASK] means: stop and wait for the user's answer. Understand answers in any wording; never depend on one fixed reply.

Paths: PLUGIN = `${CLAUDE_PLUGIN_ROOT}`. WORK = the work folder (default `RicksClips` in the home folder; the scripts find it). SHORT = `WORK/short-N`. PY = the venv python in `WORK/.engine/.venv` (`bin/python`, or `Scripts\python.exe` on Windows); never activate it.

## 0. Every start (silent)
1. This plugin renders video on the user's computer. If there is no shell tool in this session, say: "RicksClips-Engine makes videos on your computer, so it runs in Claude Code. Open Claude Code and send your message there." and stop.
2. Run `node --version`. If Node is missing or older than 22, go to the install list in [setup.md](references/setup.md) (the other checks need Node).
3. Run `node "PLUGIN/scripts/check-tools.mjs"`. Read the JSON. Do not describe the check.
   - `ok` is false, or `WORK/settings.json` does not exist: do the setup in [setup.md](references/setup.md).
   - `ok` is true: setup is not needed again.
4. If everything is ready and the user's message already asks for something (a short, a video, topics, a script, SEO), do that at once. If the message is only the plugin or a greeting, say exactly this and nothing else: "I have read RicksClips-Engine. All the tools for making these videos are ready. Send for example: make a short, or: give me topics." Then wait [ASK].

## 1. Topics
Follow [topics.md](references/topics.md). Offer exactly three, each with a title and a short summary. Then wait [ASK]. Reply handling: a number or "the second one" or a pasted topic = that topic; "more", "different", "none of these" = three new topics.

## 2. Script
When a topic is chosen, follow [script.md](references/script.md). Show the script in a copyable code block, then wait [ASK]:
- Changes asked: edit and show the full script again, until the user is happy.
- Approved with no voice file yet: ask once for the audio file.
- Voice file sent: go to 3.

## 3. Build (no more questions except installs)
When the audio file arrives (mp3, wav, m4a, aac, flac, ogg), work to the end alone. Create SHORT with `node "PLUGIN/scripts/settings.mjs" next-short`, keep the topic file and script in it, then:
1. Voice: [voice.md](references/voice.md). Silent parts are removed first; word timestamps come from the cleaned audio.
2. Project: `node "PLUGIN/scripts/project.mjs" create "SHORT" --quality <settings.quality>`, then `project.mjs audio` with the cleaned voice.
3. Shot plan (SHORT/shots.md) from the script, then the world, characters, animals and animation in `SHORT/project/src/story.js`: [scene-direction.md](references/scene-direction.md), [engine-api.md](references/engine-api.md), [look.md](references/look.md), [captions.md](references/captions.md).
4. Build the shots carefully so the first pass is already right. Render stills and look at them. Fix only if there is a real problem and stop as soon as the stills are clean (often one pass is enough). Then lock the picture timing: [render-and-qa.md](references/render-and-qa.md).
5. Music and sound effects made by code for this story: [sound.md](references/sound.md).
6. Render and self-check. If the check is clean, deliver at once. Only if it finds a real problem, fix it and render again, stopping as soon as it is clean. Never more than 3 renders in total.

## 4. Deliver
Give the path of SHORT/final.mp4 and open the folder with it selected (macOS `open -R <file>`, Windows `explorer /select,<file>`, Linux `xdg-open <folder>`). Give length, resolution, and anything that is still not right, exactly. If 1080p was used instead of 2K, say so in one line with the reason and that closing other apps may allow 2K. Then say: "The video is ready. Tell me if you want the title, description and tags."

## 5. SEO (only when asked)
Follow [seo.md](references/seo.md).

## From the second short on
No setup talk. New topics, a new script, a new world, new characters and animals, a new palette and a new folder every time.

## Hard rules
- English only, in the videos and in messages.
- Real topics: every fact and number checked. Made-up topics and scripts: one line saying they are made up and not real. Never tell the user what you checked or did not check.
- Never copy another video's story, script, characters, signs or colours.
- No sound or music notes in the script. No sample libraries or downloaded audio: all music and effects are made by the plugin's code.
- Never hide a problem. If the self-check ends with issues, say exactly what is still wrong.
