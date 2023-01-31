import React from 'react'

type Props = {
  question: string
  answers: string[]
  callback: any
  userAnswer: any
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
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map(answer => (
        <div>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default QuestionCard