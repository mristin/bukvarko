export type ID = string;

export class Question {
  constructor(
    public id: ID,
    public imageURL: string,
    public expectedAnswer: string
  ) {}
}

function verifyThatIndicesMatch(bank: Bank) {
  for (const [i, q] of bank.questions.entries()) {
    const idx = bank.index(q.id);
    if (i !== idx) {
      throw Error(
        `Unexpected mismatching index() result (== ${idx}) and index in the question (== ${i}`
      );
    }
  }
}

function verifyThatPreviousLoopsThrough(bank: Bank) {
  if (bank.questions.length === 0) {
    throw Error("Unexpected empty question bank");
  }

  const loop = new Array<ID>(bank.questions.length + 1);

  let cursor: ID = bank.questions[0].id;
  for (let i = 0; i < bank.questions.length + 1; i++) {
    const prev = bank.previous(cursor);
    loop[i] = cursor;
    cursor = prev;
  }

  const expected = [
    bank.questions[0].id,
    ...bank.questions.map((q) => q.id).reverse(),
  ];

  const passed =
    expected.length === loop.length && expected.every((v, i) => loop[i] === v);
  if (!passed) {
    throw Error(`Expected loop (== ${JSON.stringify(expected)} and 
        actual loop (== ${JSON.stringify(loop)}) did not match.`);
  }
}

function verifyThatNextLoopsThrough(bank: Bank) {
  if (bank.questions.length === 0) {
    throw Error("Unexpected empty question bank");
  }

  const loop = new Array<ID>(bank.questions.length + 1);

  let cursor: ID = bank.questions[0].id;
  for (let i = 0; i < bank.questions.length + 1; i++) {
    const next = bank.next(cursor);
    loop[i] = cursor;
    cursor = next;
  }

  const expected = [...bank.questions.map((q) => q.id), bank.questions[0].id];

  const passed =
    expected.length === loop.length && expected.every((v, i) => loop[i] === v);
  if (!passed) {
    throw Error(`Expected loop (== ${JSON.stringify(expected)} and 
        actual loop (== ${JSON.stringify(loop)}) did not match.`);
  }
}

function verifyAllGet(bank: Bank) {
  for (const q of bank.questions) {
    const got = bank.get(q.id).id;
    const passed = got === q.id;
    if (!passed) {
      throw Error(`Expected question ID ${q.id}, but got: ${got}`);
    }
  }
}

function verifyHas(bank: Bank) {
  for (const q of bank.questions) {
    if (!bank.has(q.id)) {
      throw Error(
        `Expected ID to be positive in has(), but it was not: ${q.id}`
      );
    }
  }
}

function verifyQuestionBank(bank: Bank) {
  verifyThatIndicesMatch(bank);
  verifyThatPreviousLoopsThrough(bank);
  verifyThatNextLoopsThrough(bank);
  verifyAllGet(bank);
  verifyHas(bank);
}

export class Bank {
  private questionIndex: Map<ID, number>;
  private questionMap: Map<ID, Question>;
  private previousMap: Map<ID, ID>;
  private nextMap: Map<ID, ID>;

  constructor(public questions: Array<Question>) {
    this.questionIndex = new Map<ID, number>();
    for (const [i, q] of questions.entries()) {
      this.questionIndex.set(q.id, i);
    }

    this.questionMap = new Map<ID, Question>();
    for (const q of questions) {
      if (this.questionMap.has(q.id)) {
        throw Error(`Duplicate ID in questions: ${q.id}`);
      }
      this.questionMap.set(q.id, q);
    }

    this.previousMap = new Map<ID, ID>();
    if (questions.length > 0) {
      this.previousMap.set(questions[0].id, questions[questions.length - 1].id);

      for (let i = 1; i < questions.length; i++) {
        this.previousMap.set(questions[i].id, questions[i - 1].id);
      }
    }

    this.nextMap = new Map<ID, ID>();
    if (questions.length > 0) {
      this.nextMap.set(questions[questions.length - 1].id, questions[0].id);

      for (let i = questions.length - 2; i >= 0; i--) {
        this.nextMap.set(questions[i].id, questions[i + 1].id);
      }
    }

    verifyQuestionBank(this);
  }

  public index(id: ID): number {
    const result = this.questionIndex.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }

  public next(id: ID): ID {
    const result = this.nextMap.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }

  public previous(id: ID): ID {
    const result = this.previousMap.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }

  public has(id: ID): boolean {
    return this.questionMap.has(id);
  }

  public get(id: ID): Question {
    const result = this.questionMap.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }
}

export const bank = new Bank([
  {
    id: "slon",
    imageURL: "./media/slon.jpeg",
    expectedAnswer: "slon",
  },
  {
    id: "tigar",
    imageURL: "./media/tigar.jpeg",
    expectedAnswer: "tigar",
  },
  {
    id: "lav",
    imageURL: "./media/lav.jpeg",
    expectedAnswer: "lav",
  },
  {
    id: "pas",
    imageURL: "./media/pas.jpeg",
    expectedAnswer: "pas",
  },
]);

export function compareAnswers(expected: string, got: string): boolean {
  return expected.toLowerCase() === got.toLowerCase();
}
