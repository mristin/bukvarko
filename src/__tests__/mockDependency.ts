import * as dependency from "../dependency";
import * as question from "../question";

const mockSpeechSynthesis: unknown = {
  cancel: () => {},
  speak: (_: SpeechSynthesisUtterance) => {},
};

export const registry: dependency.Registry = {
  questionBank: question.bank,
  speechSynthesis: mockSpeechSynthesis as SpeechSynthesis,
};
