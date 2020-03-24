export type QuestionID = string;

export class Question {
  constructor(
    public id: QuestionID,
    public imageURL: string,
    public expectedAnswer: string
  ) {}
}

export class QuestionBank {
  private questionMap: Map<QuestionID, Question>;
  private previousMap: Map<QuestionID, QuestionID>;
  private nextMap: Map<QuestionID, QuestionID>;

  constructor(public questions: Array<Question>) {
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
