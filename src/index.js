import Typograf from 'typograf';

export function markedTypograf(opts = {}) {
  if (opts.customRules) {
    for (const rule of opts.customRules) {
      Typograf.addRule(rule);
    }
  }

  const tp = new Typograf(opts.typografOptions || { locale: 'en-US' });

  if (opts.typografSetup) {
    opts.typografSetup(tp);
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
