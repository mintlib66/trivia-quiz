import { shuffleArray } from './utils'
// import { QuestionState } from './API'
import QuestionCard from './components/QuestionCard'
export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

//answer 하나로 합친 타입 생성
export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()
  console.log(
    data.results.map((question: Question) => ({
      ...QuestionCard,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }))
  )
  // question, correct_answer, incorrect_answers
}
