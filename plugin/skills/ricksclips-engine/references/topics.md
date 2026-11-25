# Topics

Offer exactly three new topics every time. They must never repeat the topic, character or mechanic of an earlier short in WORK (`short-*/facts.md`), and never retell the story of a known video.

## The four groups (mix them across the three topics)
1. **Loopholes, schemes and tricks** (gambling and lottery flaws belong here). A strict rule, contract or law is outsmarted by one specific, odd trick. Ends with an unmasking, a profit for the trickster, or an ironic betrayal.
2. **Science and engineering quirks, and deadly nature.** A normal practical problem gets a solution that sounds absurd or dangerous. Ends with the physical explanation or the disaster.
3. **Psychology and the brain.** A common assumption about the mind is broken by an odd test or a brain quirk. Ends with a mind-bending reveal.
4. **Dark thought experiments and odd rules of society.** A technology, a town rule or a workplace practice looks helpful but has a horrifying catch. Ends with a chilling question or a loop.

## What makes a good topic
- The bizarre result comes first and the hidden reason second.
- One central character or object, one specific mechanic, one exact number.
- At least one physical object or action that can be built and shown on screen (a mirror, a bell, a jar, a can of oil, a button, scratch cards, a tree), and an everyday comparison for the hard part. Abstract ideas with nothing to show are skipped.
- A common tension: an outsider or underdog against a rival, a boss, an authority or a system, or a claim that sounds impossible and is explained at the end.
- Settings that fit well, to rotate and not to repeat: gambling and lotteries, ancient or medieval empires, pirates and the sea, the Old West, Japan, prisons, laboratories, small towns.
- It can be told in one short story without background lists.

## Real topics
- Research with web search before offering it, separately for each topic. Check the central claim, the mechanism and the exact number against at least two independent sources.
- A topic whose facts cannot be fully verified is never offered. A famous anecdote with disputed history counts as not verified.
- Never invent details of a real story. A detail that is unknown stays out.
- If this session has no web search, offer only made-up topics.
- Never tell the user what you checked or did not check.

## Made-up topics
The mechanism must still be logical and the numbers plausible. Add one line to the topic: "This is a made-up story, not a real event."

## Layout (exactly this, nothing more)
```
Here are three topics.

1. <Title, 4 to 8 words, Title Case>
<Two or three sentences on what the video will show, without the twist. For a made-up topic add: This is a made-up story, not a real event.>

2. ...

3. ...

Which one do you like? Or tell me and I will give you three new ones.
```

## After the user chooses
Create SHORT with `node "PLUGIN/scripts/settings.mjs" next-short`. Save SHORT/facts.md: the first line is `Story type: real` or `Story type: made-up`, then, for a real topic, each fact with its source, for a made-up topic the premise in one line. Then write the script ([script.md](script.md)).
