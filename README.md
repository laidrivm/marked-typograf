# marked-typograf
Use [typograf](https://github.com/typograf/typograf/) to translate plain punctuation characters from markdown into typographic punctuation inside HTML entities.

# Usage
<!-- Show most examples of how to use this extension -->

```js
import {marked} from "marked";
import {markedTypograf} from "marked-typograf";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-typograf/lib/index.umd.js"></script>

const options = {
	// default options
};

marked.use(markedTypograf(options));

marked.parse("example markdown");
// <p>example html</p>
```

## `options`

<!-- If there are no options you can delete this section -->

## TODO:

- [ ] Fill in description
- [ ] Update usage example: options, markdown input and html output
- [ ] Write extension in `/src/index.js`
- [ ] Write tests in `/spec/index.test.js`
- [ ] Uncomment release in `/.github/workflows/main.yml`