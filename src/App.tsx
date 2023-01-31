import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'
//component
import QuestionCard from './components/QuestionCard'
//types
import { Difficulty } from './API'
const TOTAL_QUESTIONS = 10

function App() {
  //state
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  //
  const startTrivia = async () => {
    fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}
  const nextQuestion = () => {}

  return (
    <div className="App">
      <h1>QUIZ</h1>
      <button className="start" onClick={startTrivia}>
        퀴즈 시작
      </button>
      <p className="score">점수:</p>
      <p>퀴즈 로딩중...</p>
      {/* <QuestionCard
        questionNum={number + 1}
        totalQuestionNum={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>
        다음으로
      </button>
    </div>
  )
}

export default App
