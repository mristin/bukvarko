"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Question {
    constructor(id, imageURL, expectedAnswer) {
        this.id = id;
        this.imageURL = imageURL;
        this.expectedAnswer = expectedAnswer;
    }
}
exports.Question = Question;
class QuestionBank {
    constructor(questions) {
        this.questions = questions;
        this.questionMap = new Map();
        for (const q of questions) {
            if (this.questionMap.has(q.id)) {
                throw Error(`Duplicate ID in questions: ${q.id}`);
            }
            this.questionMap.set(q.id, q);
        }
        this.previousMap = new Map();
        if (questions.length > 0) {
            this.previousMap.set(questions[0].id, questions[questions.length - 1].id);
            for (let i = 1; i < questions.length; i++) {
                this.previousMap.set(questions[i].id, questions[i - 1].id);
            }
        }
        this.nextMap = new Map();
        if (questions.length > 0) {
            this.nextMap.set(questions[questions.length - 1].id, questions[0].id);
            for (let i = questions.length - 2; i >= 0; i--) {
                this.nextMap.set(questions[i].id, questions[i + 1].id);
            }
        }
    }
    next(id) {
        const result = this.nextMap.get(id);
        if (result === undefined) {
            throw Error(`Question ID is invalid: ${id}`);
        }
        return result;
    }
    previous(id) {
        const result = this.previousMap.get(id);
        if (result === undefined) {
            throw Error(`Question ID is invalid: ${id}`);
        }
        return result;
    }
    has(id) {
        return this.questionMap.has(id);
    }
    get(id) {
        const result = this.questionMap.get(id);
        if (result === undefined) {
            throw Error(`Question ID is invalid: ${id}`);
        }
        return result;
    }
}
exports.QuestionBank = QuestionBank;
exports.questionBank = new QuestionBank([
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
function compareAnswers(expected, got) {
    return expected.toLowerCase() === got.toLowerCase();
}
exports.compareAnswers = compareAnswers;
