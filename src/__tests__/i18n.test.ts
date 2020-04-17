import * as i18n from '../i18n';

it('selects the first language when no language matches.', () => {
  const lang = i18n.inferDefault('en-GB', ['hr', 'sr']);

  expect(lang).toBe('hr');
});

it('selects the exact match if available.', () => {
  const lang = i18n.inferDefault('en', ['hr', 'en', 'sr']);

  expect(lang).toBe('en');
});

it('selects the primary language match if available.', () => {
  const lang = i18n.inferDefault('en-GB', ['hr', 'en', 'sr']);

  expect(lang).toBe('en');
});
