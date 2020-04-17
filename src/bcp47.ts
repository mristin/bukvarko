export type Tag = string;

export function primaryLanguage(tag: string): string {
  const parts = tag.split('-');
  if (parts.length === 0) {
    throw Error(`Unexpected language specification according to BCP 47: ${tag}`);
  }
  return parts[0];
}
