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
  locale: "ru"//default is en-US
};

marked.use(markedTypograf(options));

marked.parse('Hello -- "world"!');
// <p>Hello — «world»!</p>
```

### `options`

For more possible options please check [the original typograf documentation](https://github.com/typograf/typograf/tree/dev/docs).
