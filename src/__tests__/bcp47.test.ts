import * as bcp47 from '../bcp47';

it('parses correctly the primary language with no other subtags.', () => {
  const lang = bcp47.primaryLanguage('sr');
  expect(lang).toBe('sr');
});

it('parses correctly the primary language with a region subtag consisting of letters.', () => {
  const lang = bcp47.primaryLanguage('en-US');
  expect(lang).toBe('en');
});

it('parses correctly the primary language with a region subtag consisting of numbers.', () => {
  const lang = bcp47.primaryLanguage('es-419');
  expect(lang).toBe('es');
});

it('parses correctly the primary language with a script.', () => {
  const lang = bcp47.primaryLanguage('zh-Hans');
  expect(lang).toBe('zh');
});

it('parses correctly the primary language with a region and a script.', () => {
  const lang = bcp47.primaryLanguage('zh-Hant-HK');
  expect(lang).toBe('zh');
});
