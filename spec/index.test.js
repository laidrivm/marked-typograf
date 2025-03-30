import { marked } from 'marked';
import { markedTypograf } from '../src/index.js';
import { describe, beforeEach, test, expect } from 'bun:test';

describe('markedTypograf', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('applies en-US typographic transformations by default', () => {
    marked.use(markedTypograf());
    expect(marked('Hello -- "world"!')).toBe('<p>Hello — “world”!</p>');
  });

  test('applies ru typographic transformations with such a locale passed', () => {
    const opts = {
      typografOptions: {
        locale: 'ru',
      },
    };
    marked.use(markedTypograf(opts));
    expect(marked('Hello -- "world"!')).toBe('<p>Hello — «world»!</p>');
  });

  test('supports several locales', () => {
    const opts = {
      typografOptions: {
        locale: ['ru', 'en-US'],
      },
    };
    marked.use(markedTypograf(opts));
    expect(marked('Hello -- "world", а как же ещё!')).toBe('<p>Hello — «world», а как же ещё!</p>');
  });

  test('supports different entities', () => {
    const opts = {
      typografOptions: {
        locale: 'en-US',
        htmlEntity: { type: 'name' },
      },
    };
    marked.use(markedTypograf(opts));
    expect(marked('Hello -- "world"!')).toBe('<p>Hello&nbsp;&mdash; &ldquo;world&rdquo;!</p>');
  });

  test('preserves code span with such a safe tag set', () => {
    const opts = {
      typografSetup: (tp) => {
        tp.addSafeTag('<code>', '</code>');
        tp.addSafeTag('<pre>', '</pre>');
        tp.addSafeTag('<kbd>', '</kbd>');
        tp.addSafeTag('<script>', '</script>');
      },
    };
    marked.use(markedTypograf(opts));
    expect(marked('```Hello -- "world"!```')).toBe('<p><code>Hello -- &quot;world&quot;!</code></p>');
  });

  test('allows to disable Typograf rules', () => {
    marked.use(markedTypograf({ typografSetup: (tp) => tp.disableRule('en-US/dash/main') }));
    expect(marked('Hello -- "world"!')).toBe('<p>Hello -- “world”!</p>'); // No en-dash conversion
  });

  test('handles math signs', () => {
    marked.use(
      markedTypograf(
        {
          locale: 'ru',
          disableRule: '*',
        },
        (tp) => {
          tp.enableRule('common/number/mathSigns');
        },
      ));
    expect(marked('0 != 1')).toBe('<p>0 ≠ 1</p>');
  });

  test('supports custom rules', () => {
    const opts = {
      typografSetup: (tp) => {
        tp.disableRule('common/space/afterColon');
      },
      customRules: [{
        name: 'common/other/typographicSmiley',
        queue: 'end',
        index: 1311,
        handler: function(text) {
          return text.replace(/:-\)/g, ':—)');
        },
      }],
    };
    marked.use(markedTypograf(opts));
    expect(marked(':-)')).toBe('<p>:—)</p>');
  });
});
