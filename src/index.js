import Typograf from 'typograf';

export function markedTypograf(opts = {}) {
  if (opts.customRules) {
    for (const rule of opts.customRules) {
      if (!Typograf.getRule(rule.name)){
        Typograf.addRule(rule);
      }
    }
  }

  const tp = new Typograf(opts.typografOptions || { locale: 'en-US' });

  if (opts.typografSetup) {
    opts.typografSetup(tp);
  }

  return {
    hooks: {
      postprocess(html) {
        return tp.execute(html);
      }
    }
  };
}