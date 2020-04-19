export function ignoreCase(...expected: string[]): (answer: string) => boolean {
  return (answer: string) => {
    let result = false;

    for (const anExpected of expected) {
      if (answer.toLowerCase().trim() === anExpected.toLowerCase().trim()) {
        result = true;
        break;
      }
    }

    return result;
  };
}
