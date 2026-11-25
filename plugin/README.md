# RicksClips-Engine

RicksClips-Engine teaches Claude Code to make one kind of video from start to finish: a vertical (9:16) animated story short. Each story shows a bizarre result first and the hidden reason second (loopholes, science quirks, brain tricks, dark thought experiments). Flat inked characters and animals act in a toon 3D world, captions follow the voice word by word, and the music and sound effects are made by code for each story.

## What you need
- Claude Code (terminal, IDE extension, or the Code tab of the Claude desktop app). The plugin renders on your own computer, so it does not run in a normal chat.
- macOS, Windows (x64) or Linux (x64 or arm64).
- About 5 GB of free disk space for the tools, plus 2-3 GB while a short renders.
- A graphics card is strongly recommended: software rendering is about 9 times slower.
- A voice tool of your choice to record or generate the narration.

## Install
1. Upload the .zip as a plugin (Customize > Plugins > Add > Upload plugin).
2. In Claude Code send a message with the plugin, for example `make a short`. The first time, the plugin lists the tools it needs, shows which are missing, and installs them after you say yes. Everything except the system tools goes into one work folder (`RicksClips` in your home folder).

## Make a short
Say "make a short" or "give me topics". You get three topics, then the script of the one you choose. When the script is fine, send the voice audio file. The plugin does the rest and gives you the path of the finished mp4. Ask for the title, description and tags when you want them.

The video is 9:16 at 30 fps, in 2K (1440x2560). A computer that cannot do 2K renders 1080x1920 instead, and the plugin tells you why.

## Where things are
- Work folder: `~/RicksClips` (Windows: `%USERPROFILE%\RicksClips`), one folder per short with the facts, script, voice, project, sound, QA stills and `final.mp4`.
