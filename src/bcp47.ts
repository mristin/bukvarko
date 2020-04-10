export function primaryLanguage(spec: string): string {
  const parts = spec.split("-");
  if (parts.length === 0) {
    throw Error(
      `Unexpected language specification according to BCP 47: ${spec}`
    );
  }
  return parts[0];
}
