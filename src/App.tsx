import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'
//component
import QuestionCard from './components/QuestionCard'
//types
import { QuestionState, Difficulty } from './API'
export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
const TOTAL_QUESTIONS = 10

function App() {
  //state
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  //기능 함수
  console.log(questions)
  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      //정답과 answer value값 확인
      const correct = questions[number].correct_answer === answer
      //점수 +1
      if (correct) setScore(prev => prev + 1)
      //유저 입력 답을 array로 저장
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestionNum = number + 1
    if (nextQuestionNum === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestionNum)
    }
  }

  return (
    <div className="App">
      <h1>TRIVIA QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          퀴즈 시작
        </button>
      ) : null}
      {!gameOver ? <p className="score">점수: {score}</p> : null}
      {loading && <p>퀴즈 로딩중...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNum={number + 1}
          totalQuestionNum={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          다음으로
        </button>
      ) : null}
    </div>
  )
}

export default App
