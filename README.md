# marked-typograf
A plugin for [marked](https://github.com/markedjs/marked). Uses [typograf](https://github.com/typograf/typograf/) to translate plain punctuation characters from markdown into smart typographic punctuation inside HTML.

Operates in postprocessing phase: applies all the rules after marked has already renderered it's resulting HTML.

Supports all the typograf options, settings and the feature to add custom rules — only applies those without name conflicts.

## Setup

```bash
bun add marked-typograf
```

## Usage

```js
import {marked} from "marked";
import {markedTypograf} from "marked-typograf";

const options = {
  typografOptions: {
    locale: 'ru'
  },
  typografSetup: (tp) => {
    tp.addSafeTag('<code>', '</code>');
    tp.disableRule('common/space/afterColon');
  },
  customRules: [{
    name: 'common/other/typographicSmiley',
    handler: function(text) {
      return text.replace(/:-\)/g, ':—)');
    },
  }]
};

marked.use(markedTypograf(options));

marked.parse('Hello -- "world"!');
// <p>Hello — «world»!</p>
```

### `options`

For more possible options please check [the original typograf documentation](https://github.com/typograf/typograf/tree/dev/docs).
