interface Options {
  question: string[];
  answer: string;
}

export interface IQuiz {
  questions: Options[];
  totalMark: number;
  duration: Date;
}
