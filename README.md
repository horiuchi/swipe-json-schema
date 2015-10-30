# JSON Schema Generator for Swipe

This is a generator from `swipe.d.ts` to the JSON Schema of [Swipe](http://www.swipe.net/) Language.


## Usage

```
# install libraries
$ npm install

# generate JSON Schame files
$ npm start
Parsing TypeScript files
[16:42:37] Parsed typings/swipe/swipe.d.ts
Generating files
[16:42:37] Generated schema/swipe/num_value.json
[16:42:37] Generated schema/swipe/animatable_properties.json
[16:42:37] Generated schema/swipe/document.json
[16:42:37] Generated schema/swipe/element.json
[16:42:37] Generated schema/swipe/loop_animation.json
[16:42:37] Generated schema/swipe/page.json
[16:42:37] Generated schema/swipe/scene.json
[16:42:37] Generated schema/swipe/speech_info.json
[16:42:37] Generated schema/swipe/style.json
[16:42:37] Generated schema/swipe/transition_animation.json
[16:42:37] Generated schema/swipe/voice_info.json

✓ Finished successfully!

$ ls -l schema/swipe/
-rw-r--r--+  1 horiuchi  staff  2692 10 30 16:42 animatable_properties.json
-rw-r--r--+  1 horiuchi  staff  2497 10 30 16:42 document.json
-rw-r--r--+  1 horiuchi  staff  6951 10 30 16:42 element.json
-rw-r--r--+  1 horiuchi  staff   644 10 30 16:42 loop_animation.json
-rw-r--r--+  1 horiuchi  staff   191 10 30 16:42 num_value.json
-rw-r--r--+  1 horiuchi  staff  2061 10 30 16:42 page.json
-rw-r--r--+  1 horiuchi  staff  2762 10 30 16:42 scene.json
-rw-r--r--+  1 horiuchi  staff   195 10 30 16:42 speech_info.json
-rw-r--r--+  1 horiuchi  staff   190 10 30 16:42 style.json
-rw-r--r--+  1 horiuchi  staff  3064 10 30 16:42 transition_animation.json
-rw-r--r--+  1 horiuchi  staff   194 10 30 16:42 voice_info.json
```


