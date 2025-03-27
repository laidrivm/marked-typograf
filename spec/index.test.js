import { marked } from 'marked';
import { markedTypograf } from '../src/index.js';
import { describe, beforeEach, test, expect } from 'bun:test';

describe('markedTypograf', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('applies typographic transformations', () => {
    marked.use(markedTypograf());
    expect(marked('Hello -- "world"!')).toBe('<p>Hello — “world”!</p>');
  });

  test('preserves code span', () => {
    marked.use(markedTypograf());
    expect(marked('`Hello -- "world"!`')).toBe('<p><code>Hello -- &quot;world&quot;!</code></p>');
  });

  test('preserves code block', () => {
    marked.use(markedTypograf());
    expect(marked('```\nHello -- "world"!\n```')).toBe(
      '<pre><code>Hello -- &quot;world&quot;!\n</code></pre>',
    );
  });

  test('supports different locales', () => {
    marked.use(markedTypograf({ typografOptions: { locale: 'ru' } }));
    expect(marked('Hello -- "world"!')).toBe('<p>Hello — «world»!</p>');
  });

  test('supports custom Typograf rules', () => {
    marked.use(markedTypograf({ typografSetup: (tp) => tp.disableRule('en-US/dash/main') }));
    expect(marked('Hello -- "world"!')).toBe('<p>Hello -- “world”!</p>'); // No en-dash conversion
  });

  test('handles simple markdown', () => {
    marked.use(markedTypograf());
    expect(marked('This is a test.')).toBe('<p>This is a test.</p>');
  });
});
