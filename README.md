# marked-typograf
Use [typograf](https://github.com/typograf/typograf/) to translate plain punctuation characters from markdown into typographic punctuation inside HTML entities.

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
