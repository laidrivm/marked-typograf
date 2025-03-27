import Typograf from 'typograf';

export function markedTypograf({
  typografOptions = { locale: 'en-US' },
  typografSetup = undefined,
} = {}) {
  const tp = new Typograf(typografOptions);
  if (typografSetup) {
    typografSetup(tp);
  }

  return {
    tokenizer: {
      inlineText(src) {
        const cap = this.rules.inline.text.exec(src);
        if (!cap) return;

        return {
          type: 'text',
          raw: cap[0],
          text: cap[0],
          escaped: true,
        };
      },
    },
    hooks: {
      postprocess(html) {
        return tp.execute(html);
      },
    },
  };
}
