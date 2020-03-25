export type QuestionID = string;

export class Question {
  constructor(
    public id: QuestionID,
    public imageURL: string,
    public expectedAnswer: string
  ) {}
}

function verifyThatIndicesMatch(qb: QuestionBank) {
  for (const [i, q] of qb.questions.entries()) {
    const idx = qb.index(q.id);
    if (i !== idx) {
      throw Error(
        `Unexpected mismatching index() result (== ${idx}) and index in the question (== ${i}`
      );
    }
  }
}

function verifyThatPreviousLoopsThrough(qb: QuestionBank) {
  if (qb.questions.length === 0) {
    throw Error("Unexpected empty question bank");
  }

  const loop = new Array<QuestionID>(qb.questions.length + 1);

  let cursor: QuestionID = qb.questions[0].id;
  for (let i = 0; i < qb.questions.length + 1; i++) {
    const prev = qb.previous(cursor);
    loop[i] = cursor;
    cursor = prev;
  }

  const expected = [
    qb.questions[0].id,
    ...qb.questions.map((q) => q.id).reverse(),
  ];

  const passed =
    expected.length === loop.length && expected.every((v, i) => loop[i] === v);
  if (!passed) {
    throw Error(`Expected loop (== ${JSON.stringify(expected)} and 
        actual loop (== ${JSON.stringify(loop)}) did not match.`);
  }
}

function verifyThatNextLoopsThrough(qb: QuestionBank) {
  if (qb.questions.length === 0) {
    throw Error("Unexpected empty question bank");
  }

  const loop = new Array<QuestionID>(qb.questions.length + 1);

  let cursor: QuestionID = qb.questions[0].id;
  for (let i = 0; i < qb.questions.length + 1; i++) {
    const next = qb.next(cursor);
    loop[i] = cursor;
    cursor = next;
  }

  const expected = [...qb.questions.map((q) => q.id), qb.questions[0].id];

  const passed =
    expected.length === loop.length && expected.every((v, i) => loop[i] === v);
  if (!passed) {
    throw Error(`Expected loop (== ${JSON.stringify(expected)} and 
        actual loop (== ${JSON.stringify(loop)}) did not match.`);
  }
}

function verifyAllGet(qb: QuestionBank) {
  for (const q of qb.questions) {
    const got = qb.get(q.id).id;
    const passed = got === q.id;
    if (!passed) {
      throw Error(`Expected question ID ${q.id}, but got: ${got}`);
    }
  }
}

function verifyHas(qb: QuestionBank) {
  for (const q of qb.questions) {
    if (!qb.has(q.id)) {
      throw Error(
        `Expected ID to be positive in has(), but it was not: ${q.id}`
      );
    }
  }
}

function verifyQuestionBank(qb: QuestionBank) {
  verifyThatIndicesMatch(qb);
  verifyThatPreviousLoopsThrough(qb);
  verifyThatNextLoopsThrough(qb);
  verifyAllGet(qb);
  verifyHas(qb);
}

export class QuestionBank {
  private questionIndex: Map<QuestionID, number>;
  private questionMap: Map<QuestionID, Question>;
  private previousMap: Map<QuestionID, QuestionID>;
  private nextMap: Map<QuestionID, QuestionID>;

  constructor(public questions: Array<Question>) {
    this.questionIndex = new Map<QuestionID, number>();
    for (const [i, q] of questions.entries()) {
      this.questionIndex.set(q.id, i);
    }

    this.questionMap = new Map<QuestionID, Question>();
    for (const q of questions) {
      if (this.questionMap.has(q.id)) {
        throw Error(`Duplicate ID in questions: ${q.id}`);
      }
      this.questionMap.set(q.id, q);
    }

    this.previousMap = new Map<QuestionID, QuestionID>();
    if (questions.length > 0) {
      this.previousMap.set(questions[0].id, questions[questions.length - 1].id);

      for (let i = 1; i < questions.length; i++) {
        this.previousMap.set(questions[i].id, questions[i - 1].id);
      }
    }

    this.nextMap = new Map<QuestionID, QuestionID>();
    if (questions.length > 0) {
      this.nextMap.set(questions[questions.length - 1].id, questions[0].id);

      for (let i = questions.length - 2; i >= 0; i--) {
        this.nextMap.set(questions[i].id, questions[i + 1].id);
      }
    }

    verifyQuestionBank(this);
  }

  public index(id: QuestionID): number {
    const result = this.questionIndex.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }

  public next(id: QuestionID): QuestionID {
    const result = this.nextMap.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }

  public previous(id: QuestionID): QuestionID {
    const result = this.previousMap.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }

  public has(id: QuestionID): boolean {
    return this.questionMap.has(id);
  }

  public get(id: QuestionID): Question {
    const result = this.questionMap.get(id);
    if (result === undefined) {
      throw Error(`Question ID is invalid: ${id}`);
    }

    return result;
  }
}

export const questionBank = new QuestionBank([
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
