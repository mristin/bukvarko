export function ignoreCase(...expected: string[]): (answer: string) => boolean {
  return (answer: string) => {
    let result = false;

    for (const anExpected of expected) {
      if (answer.toLowerCase() === anExpected.toLowerCase()) {
        result = true;
        break;
      }
    }

    return result;
  };
}
