<!-- The character `|` around a string denotes a place in this markdown file that needs to be changed for each extension. -->
<!-- You may also delete any comments you don't need anymore. -->

# TODO:

- [ ] Replace information in `/README.md`
- [ ] Write extension in `/src/index.js`
- [ ] Write tests in `/spec/index.test.js`
- [ ] Uncomment release in `/.github/workflows/main.yml`

<!-- Delete this line and above -->

# marked-|this-extension|
<!-- Description -->

# Usage
<!-- Show most examples of how to use this extension -->

```js
import {marked} from "marked";
import {markedTypograf} from "marked-typograf";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-typograf/lib/index.umd.js"></script>

const options = {
	// |default options|
};

marked.use(markedTypograf(options));

marked.parse("|example markdown|");
// <p>|example html|</p>
```

## `options`

<!-- If there are no options you can delete this section -->
