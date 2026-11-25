# Look targets (the fixed RicksClips-Engine style)

Numbers were read from seven reference shorts with tools ("measured") or judged by eye ("est."). The engine is built to hit them; use them to judge stills. The goal is close to the reference style, not an exact match.

## Frame
- 9:16, 30 fps. 1440x2560 (2K) by default; the render falls back to 1080x1920 by itself on a machine that cannot do 2K. Length follows the voice.

## Characters (est., by eye from stills)
- Head slightly wider than tall, egg-shaped. Almost every head is white or very light cream, including old characters; identity comes from clothes and features, not skin colour (a full-colour head, for example purple, only for rage or a special character). Soft cool lilac shading on the shadow side, a highlight band on top, a very dark outline.
- Face about 22-30 % of the character's height (30-36 % with hair or hat); thin black stick limbs about 14-20 px; solid dot hands; eyes about 56-90 px when the head is big in frame, larger when shocked; very long thin legs ending in short strokes.
- Faces carry emotion: thick slanted eyebrows, half-lid dot eyes and a tiny mouth by default; presets for big ring eyes, clenched teeth, a wink, a wide smile, tongue out, sweat drops, pink cheeks.
- Every character has one or two identity features (a hat with a band, a vest, a bow tie and watch chain, a sash, a chef hat, a uniform cap with a badge, a bonnet, a moustache, a belt with a buckle). Clothes are flat colour with small details: buttons, buckles, pockets, stitching, collars, epaulettes.
- Outline width of characters, props and animals is settings.ink_px on screen at any distance (default 8 at 1080 wide, a starting value). In the reference the line looks thicker in close-ups; here it stays even.

## Props, sets, light
- Hero props are richer than the characters: highlights, glass, metal, liquid, steam, real-looking labels with small print, taped notes, an LED on a scale, a glass shine on a stopwatch. Usually a thin dark outline. Signs are readable, in a period font that fits the setting.
- Sets are dense: floors, railings, numbered doors, lamps, clock towers, bunting, ropes, sails, brick and wood textures, small objects on the ground.
- Strong light: window-bar shadows on the floor, light shafts, a sunset glow, a dark blue storm sky, soft depth blur on backgrounds (est. 6-67 % of frames per video), haze with distance, bloom on lamps, screens, coins and glowing eyes, shadows tinted by the scene colour.
- Each scene: one dominant colour plus one accent, with cool against warm contrast.

## Colour (measured)
- Average brightness YAVG about 116 per video 103-134 (night scenes 70-90, bright scenes up to about 187). Average saturation SATAVG about 33 per video 24-48. The checks allow YAVG 100-135 and SATAVG 22-50. Never let the video get too dark.
- Measured with FFmpeg `signalstats` on the final mp4, averaged over all frames. YAVG = mean 8-bit luma of the Y plane (limited range 16-235, mid grey about 126). SATAVG = mean 8-bit chroma saturation. They are not percentages: HSV saturation in percent reads about 2.3 times higher than SATAVG, and the full-range RGB luma average L relates as YAVG = 16 + 0.859 x L.
- Check a still yourself: `ffmpeg -v error -i still.jpg -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,signalstats,metadata=print:file=-" -f null -`.
- No pure black areas (captions excepted).

## Effects
- At least one signature effect per video, from the story. Anger gets steam, flames or a ring.

## Kept from the engine
- Shimmer and detail fixes stay on: 4x MSAA, mipmapped anisotropic textures, the ink pre-pass, the patched lens blur that keeps in-focus lines sharp, the whip smear.
