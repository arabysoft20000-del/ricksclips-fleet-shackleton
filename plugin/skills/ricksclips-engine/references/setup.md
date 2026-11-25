# Setup (first time, or when something is missing)

Speak in short, clear English. Never install anything without a clear "yes". Use only the tools and commands for THIS operating system (the check JSON has `os`, `package_manager`, and an `install` list per missing tool). Never mention tools of other systems.

## 1. Tell the user what is needed
From the check JSON, say in one message: "I have read RicksClips-Engine. To make these videos on your computer you need these tools." Then two lists:
- **Already installed** (name and version).
- **Not installed** (name, what it is for, size).
If nothing is installed, list everything. End with: "If you approve, I will install all the missing ones now. Do you approve?" [ASK]. If the answer is no, install nothing, say "No problem. Nothing was installed." and stop.

What the tools are (show only the ones that apply to this computer):
- **System tools**, installed with the OS package manager: Node.js 22 or newer with npm (runs the renderer and the scripts), FFmpeg 6 or newer (audio and video), Python 3.12 or newer (voice processing, sound, self-check). If the package manager itself is missing (Homebrew on macOS, winget or Chocolatey on Windows), it comes first.
- **Local parts**, all inside the work folder `WORK/.engine`, nothing global: Remotion 4.0.538 with React 19.2.9, three.js 0.186.1 and postprocessing 6.39.5 (about 300 MB, exact versions, no release newer than 14 days); the render browser (about 190 MB, Remotion's own headless Chrome); the fonts Montserrat and Nunito (about 1 MB, SIL Open Font License); the Python packages (numpy, scipy, Pillow, faster-whisper and friends, about 300 MB); the speech model OpenAI Whisper turbo (about 1.6 GB) for word timestamps, or Whisper small.en (about 0.5 GB) when the computer has less than 6 GB of memory. The check JSON says which one (`machine.whisper_model`).
Disk: about 5 GB for setup, 2 to 3 GB more per short while rendering.

## 2. Install (after the yes)
One message per step, short. Stop with one clear line (cause, then the fix) if a step fails. After two failed attempts on the same step, stop and explain.

System tools first (only the missing ones), with the exact commands from the check JSON. Show each command before running it.
- macOS: Homebrew, then `brew install node ffmpeg python@3.13`. The Homebrew installer asks for the user's password, so give its command in a code block and ask the user to run it in their own terminal, then wait.
- Windows: winget (or Chocolatey) with the commands in the JSON, for example `winget install --id OpenJS.NodeJS.LTS -e`. After installing, PATH reaches only new terminals: if a tool is still not found, ask the user to restart Claude Code and send the message again.
- Linux: apt, dnf or pacman as listed. Node 22+ comes through nvm. Commands with `sudo` need the user's password: give them in a code block for the user's own terminal.
- Windows uses `python` or `py -3`; macOS and Linux use `python3`. Use the command the check found (`tools.python.command`).

Then the local parts, in this order (`PY_CMD` = the python command from the check):
```
node "PLUGIN/scripts/init-workspace.mjs" folders
node "PLUGIN/scripts/init-workspace.mjs" npm
node "PLUGIN/scripts/init-workspace.mjs" venv --python "<PY_CMD>"
node "PLUGIN/scripts/init-workspace.mjs" fonts
node "PLUGIN/scripts/init-workspace.mjs" browser
node "PLUGIN/scripts/init-workspace.mjs" speech
```
Read the `speech` result: `self_test` must be "ok". If it says "failed", tell the user what the detail says and stop.

Finally run `node "PLUGIN/scripts/check-tools.mjs" --gpu` and make sure every tool is ok. Read `machine.quality_decision`: if it says 1080p, remember the reason for the delivery message and for the user if they ask; do not ask anything about it. Settings (captions on, ink width, 2K) are not asked; the defaults are written by the folders step.

## 3. Finish
Say: "Everything is installed. To make your first video, just say: make a short." Nothing else.

## Notes
- Windows on ARM and some Linux setups are untested. If a Python package or the speech model fails to install there, say exactly which one.
- A graphics card is strongly recommended. Software rendering is about 9 times slower; the check reports it.
- If the disk is short of space, say how much is needed and stop.
