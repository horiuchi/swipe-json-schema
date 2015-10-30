# JSON Schema Generator for Swipe

This is a generator from `swipe.d.ts` to the JSON Schema of [Swipe](http://www.swipe.net/) Language.


## Usage

```
# install libraries
$ npm install

# generate JSON Schame files
$ npm start
Parsing TypeScript files
[15:09:19] Parsed typings/swipe/swipe.d.ts
Generating files
[15:09:19] Generated schema/swipe/num_value.json
[15:09:19] Generated schema/swipe/document.json
[15:09:19] Generated schema/swipe/element.json
[15:09:19] Generated schema/swipe/page.json
[15:09:19] Generated schema/swipe/scene.json
[15:09:19] Generated schema/swipe/speech_info.json
[15:09:19] Generated schema/swipe/style.json
[15:09:19] Generated schema/swipe/voice_info.json

✓ Finished successfully!

$ ls -l schema/swipe/
drwxr-xr-x+ 10 horiuchi  staff   340 10 30 15:01 .
drwxr-xr-x+  3 horiuchi  staff   102 10 30 15:01 ..
-rw-r--r--+  1 horiuchi  staff  2495 10 30 15:09 document.json
-rw-r--r--+  1 horiuchi  staff  4628 10 30 15:09 element.json
-rw-r--r--+  1 horiuchi  staff   191 10 30 15:09 num_value.json
-rw-r--r--+  1 horiuchi  staff  2060 10 30 15:09 page.json
-rw-r--r--+  1 horiuchi  staff  2761 10 30 15:09 scene.json
-rw-r--r--+  1 horiuchi  staff   195 10 30 15:09 speech_info.json
-rw-r--r--+  1 horiuchi  staff   190 10 30 15:09 style.json
-rw-r--r--+  1 horiuchi  staff   194 10 30 15:09 voice_info.json
```


