# RicksClips Fleet Render — Shackleton short-1 ("The Fourth Man")

GitHub Actions package that renders the finished Shackleton short on the fleet:
the 1,889-frame film is split into 20 frame-range chunks rendered in parallel on
20 runners, then concatenated and muxed with the finished `mix.wav`.

**Status: prepared and locally proofed. NOT pushed, NOT run. Nothing published.**

## Contents

- `plugin/` — copy of RicksClips-Engine 3.0.1 (scripts, engine, qa, skills),
  excluding the `.remotion` browser cache (runners download their own).
- `work/settings.json` — engine settings (note: `work_folder` inside still names
  the local path; every command passes `--work` explicitly, which overrides it.
  The `quality: "2k"` field here is only used when *creating* projects.)
- `work/short-1/` — the finished short: `project/` (story.js, words.js,
  style.json, project.json, public/fonts incl. Noto Kufi Arabic, public/mix.wav),
  `words.json`, `script.md`, `facts.md`, `shots.md`, `audio/mix.wav` (62.98 s).
  Excluded on purpose: qa stills, `.bundle`, `render.log`, `final.mp4`, voice files.
- `.github/workflows/ricksclips-fleet.yml` — manual-trigger workflow (see below).

## Deterministic 1080p

`work/short-1/project/src/project.json` is forced to `"quality": "1080p"`,
`W: 1080`, `H: 1920`, duration 62.98 s. `Root.jsx` computes
`durationInFrames = round(62.98 × 30) = 1889` (frames 0–1888). render.mjs
normally auto-decides 2K vs 1080p per machine; with quality already `1080p`
every runner renders identical 1080×1920 chunks, so the stream-copy concat is valid.

## Chunk table (20 chunks, 1,889 frames, no gaps/overlaps)

| chunk | frames | count | | chunk | frames | count |
|---|---|---|---|---|---|---|
| 00 | 0–94 | 95 | | 10 | 949–1042 | 94 |
| 01 | 95–189 | 95 | | 11 | 1043–1136 | 94 |
| 02 | 190–284 | 95 | | 12 | 1137–1230 | 94 |
| 03 | 285–379 | 95 | | 13 | 1231–1324 | 94 |
| 04 | 380–474 | 95 | | 14 | 1325–1418 | 94 |
| 05 | 475–569 | 95 | | 15 | 1419–1512 | 94 |
| 06 | 570–664 | 95 | | 16 | 1513–1606 | 94 |
| 07 | 665–759 | 95 | | 17 | 1607–1700 | 94 |
| 08 | 760–854 | 95 | | 18 | 1701–1794 | 94 |
| 09 | 855–948 | 94 | | 19 | 1795–1888 | 94 |

## How Jole pushes and runs it (manual, nothing automatic)

1. Log in to GitHub (`gh auth login`, or use the web UI) and pick/create a repo
   (private recommended — the package contains the voice mix and project files).
2. Push this whole folder as the repo root:
   `git init && git add -A && git commit -m "Shackleton short-1 fleet render" && git push`
   (or upload via the GitHub web UI). The workflow file must land at
   `.github/workflows/ricksclips-fleet.yml` in the repo root.
3. In the repo: **Actions → "RicksClips Fleet Render — Shackleton short-1" →
   Run workflow**. It never runs on push.
4. When green, download the **`shackleton-short1-final`** artifact → `final.mp4`.
   (The 20 `chunk-NN` artifacts are also kept if a re-assemble is ever needed.)

Each render job: checkout → Node 24 → `init-workspace.mjs npm` (pinned Remotion
into `work/.engine`) → `init-workspace.mjs browser` → `render.mjs video … --frames A-B
--out <abs path>/chunks/chunk-NN.mp4` → upload artifact. The assemble job then
verifies 20 chunks and exactly 1,889 frames via ffprobe, concatenates with the
concat demuxer (`-c copy`; automatic re-encode fallback if stream copy fails),
and muxes `work/short-1/audio/mix.wav` as the only audio track, trimmed to the
video length. Note: chunks are rendered with their own audio track (render.mjs
always renders audio); the assemble step discards it and uses `mix.wav`, so the
final audio is exactly the approved mix.

## Estimated Actions minutes (estimate, not measured)

Local proof measured ~5.1 s/frame with 1 worker on this machine (software WebGL).
A standard `ubuntu-latest` runner (4 vCPU, 16 GB) gets 2 workers from render.mjs,
so estimate ~2.5–3 s/frame → ~4–5 min render per 94–95-frame chunk, plus
~3–5 min setup cold (npm install + browser download; less with the cache step).
**Estimate: ~7–10 min per job × 20 jobs ≈ 140–200 Actions minutes + ~3–5 min
assemble.** Wall-clock roughly 10–15 min if all 20 jobs run concurrently
(Free-plan private repos allow 20 concurrent jobs; if concurrency is capped,
wall-clock grows but billed minutes stay the same). Private-repo Free tier
includes 2,000 minutes/month.

## ⚠️ Remotion license flag

Remotion is free for individuals and teams of up to 3 people; larger teams need
a paid company license. Running this on a 20-runner fleet for team production
crosses into the paid tier — resolve the license before using fleet renders as
the production path. (Flagged previously by Layla, 2026-11-07.)

## Local proof (done 2026-11-25, packaged layout, this machine)

Two mini chunks rendered with the packaged plugin + packaged project
(`work/.engine` temporarily symlinked to the local install for the proof only;
symlink removed afterwards — CI creates `.engine` via the init steps):

- frames 0–14 → chunk-00.mp4: ok, 102.9 s render, 15 frames
- frames 15–29 → chunk-01.mp4: ok, 91.2 s render, 15 frames
- concat demuxer `-c copy`: OK (no re-encode needed)
- mux mix.wav trimmed to video length: OK
- ffprobe of result: **h264 1080×1920, 30 video frames, aac audio, duration 1.066 s**
  (30 frames at 30 fps = 1.0 s of frames; container duration 1.066 s from AAC
  frame granularity). Proof file: `~/workspace/RicksClips/fleet/proof-final-30frames.mp4`.

## After downloading final.mp4 — QA (run locally)

Save the downloaded file as `~/workspace/RicksClips/short-1/final.mp4`, then:

```bash
~/workspace/RicksClips/.engine/.venv/bin/python ~/workspace/tools/ricksclips-engine/scripts/qa.py \
  ~/workspace/RicksClips/short-1/final.mp4 ~/workspace/RicksClips/short-1/qa/fleet-round1 \
  --mix ~/workspace/RicksClips/short-1/audio/mix.wav \
  --stems ~/workspace/RicksClips/short-1/audio/stems \
  --words ~/workspace/RicksClips/short-1/words.json \
  --times 0.00,7.16,12.76,17.90,22.92,29.82,32.29,36.00,36.98,39.52,43.81,48.95,54.07,54.83,55.39,56.76,59.59
```

Then review the QA contact sheet before any publishing decision. Publishing
still requires araby's direct word.

## What could break on a clean runner (checked / notes)

- **Relative `--out` trap (handled):** render.mjs resolves `--out` *after*
  `process.chdir(ENGINE)`, so a relative output path would land inside
  `work/.engine`. The workflow passes absolute `$GITHUB_WORKSPACE/...` paths
  for short dir, `--work`, and `--out`.
- **Browser download:** `init-workspace.mjs browser` uses Remotion's
  `ensureBrowser`, which downloads chrome-headless-shell into
  `work/.engine/node_modules/.remotion`. Needs network access to the Remotion
  CDN — standard on GitHub-hosted runners.
- **System libraries:** chrome-headless-shell needs common libs (nss3, gbm, …).
  `ubuntu-latest` images ship Chrome + deps, and Remotion supports GitHub
  Actions rendering; if a chunk job ever fails at browser launch, add an
  apt step installing `libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2
  libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1
  libasound2t64 libpango-1.0-0 libcairo2`.
- **npm pins:** the npm step installs exact pinned versions with
  `--before=2026-10-24` (engine's own pinning). Needs npm registry access.
- **WebGL probe:** first render on each runner runs the engine's WebGL probe
  (software SwiftShader expected) and writes `work/render-profile.json` — local
  to the runner, harmless.
- **Cache step:** caches `work/.engine/node_modules` keyed on
  `plugin/scripts/lib/pins.mjs`. Safe to delete if a stale cache is ever suspected.
- **No absolute paths in the project:** verified — `project/src` contains no
  `/home/hatch` references; fonts and mix.wav are inside `project/public`.
- **Frame-count guard:** assemble fails loudly unless chunks total exactly
  1,889 frames, so a silent short chunk cannot slip into the final.
