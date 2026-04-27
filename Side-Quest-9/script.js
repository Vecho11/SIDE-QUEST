import {data} from "./data/question.js"

const startScreen = document.querySelector(".start-screen")
const questionScreen = document.querySelector(".question-screen")
const resultScreen = document.querySelector(".result-screen")

const startButton = document.getElementById("start-button")
const input = document.getElementById("input")
const scoreText = document.getElementById("score-text")
const questionText = document.getElementById("question-text")
const submitBtn = document.getElementById("submit-btn")
const resetButton = document.getElementById("restart-button")

let currentIndex = 0
let score = 0

function showQuestions(){
    const currentQuestion = data[currentIndex]
    questionText.innerHTML = currentQuestion.question
}

function showResult(){
    questionScreen.classList.add('hide')
    resultScreen.classList.remove("hide")

    scoreText.innerHTML = `Your score - ${score} / ${data.length}`
}

submitBtn.addEventListener('click', () => {
    const userAnswer = input.value.trim()
    const answers = data[currentIndex].answer

    if(userAnswer.toUpperCase() === answers.toUpperCase()){
        score++
        alert("Correct")
        input.value = ""
    } else {
        alert("wrong answer")
        input.value = ""
    }

    currentIndex++

    if(currentIndex < data.length){
        showQuestions()
    } else {
        showResult()
    }
})

function reset(){
    score = 0
    currentIndex = 0
}

resetButton.addEventListener('click', () => {
    reset()

    questionScreen.classList.remove('hide')
    resultScreen.classList.add('hide')

    showQuestions()
    input.value = ""
})

startButton.addEventListener('click', () => {
    startScreen.classList.add('hide')
    questionScreen.classList.remove('hide')
    showQuestions()
})