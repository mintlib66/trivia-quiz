import React from 'react'
import { AnswerObject } from '../App'

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNum: number
  totalQuestionNum: number
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestionNum,
}) => (
  <div>
    <p className="number">
      진행도: {questionNum} / {totalQuestionNum}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map(answer => (
        <div key={answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default QuestionCard
