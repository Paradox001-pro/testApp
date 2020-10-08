const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const questionContainer = document.querySelector('.option-container');
const answersIndicatorContainer = document.querySelector('.answer-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

//timing function
const countDownEl = document.querySelector('.right')
const startTime = countDownEl.innerHTML;
// let time = 3 * 60;
// function updateCountDown(){
//     if (countDownEl < 0) {
//         setTimeout('document.quizz.submit()', 1);
//     }else{
//         const minutes = Math.floor(time / 60)
//         let seconds = time % 60;
//         seconds = seconds < 10 ? '0' + seconds : seconds
//         countDownEl.innerHTML = `${minutes} : ${seconds} mins`
//         time--;
//     }
// }

let total_seconds = 60*25
let c_minutes = Math.floor(parseInt(total_seconds/60))
let c_seconds = Math.floor(parseInt(total_seconds%60))


function updateCountDown(){
    // countDownEl.innerHTML = 'time left '+c_minutes+' minutes '+c_seconds+' seconds'
    if(total_seconds <= 0){
        quizOver()
        // setTimeout('document.quizz.submit() ',1);
    }else{
        total_seconds--;
        c_minutes = Math.floor(parseInt(total_seconds / 60))
        c_seconds = Math.floor(parseInt(total_seconds % 60))
        c_seconds = c_seconds < 10 ? '0' + c_seconds : c_seconds
        countDownEl.innerHTML = `${c_minutes} : ${c_seconds} mins`
        setTimeout('updateCountDown'(), 1000);
    }
}
// end of timing function


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableoptions = [];
let correctAnswer = 0;
let attempt = 0;

function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}
// set question number an options
function getNewQuestion() {
    // set question number
    questionNumber.innerHTML = 'Question    ' + (questionCounter + 1) + '   of      ' + quiz.length;
    // set qustion text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // console.log(questionIndex);
    // get the position of the questionindex from the availablequestion array
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);
    // set options
    // get the length of the options
    const optionLen = currentQuestion.options.length
    // push options into the available arry
    for (let i = 0; i < optionLen; i++) {
        availableoptions.push(i)
    }

    questionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create option ffrom html
    for (let i = 0; i < optionLen; i++) {
        const optionIndex = availableoptions[Math.floor(Math.random() * availableoptions.length)];
        const index2 = availableoptions.indexOf(optionIndex);
        availableoptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        questionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}

function getResult(element) {
    const id = parseInt(element.id);
    //get the answer by comparing the id of the clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add("correct");
        //add indicator to the correct mark
        updateAnswerIndicator('correct')
        correctAnswer++;
        console.log('correct:' + correctAnswer)
    } else {
        // set the red color to the wrong option
        element.classList.add("wrong");
        //add indicator to the wrong mark
        updateAnswerIndicator('wrong')
        //if the answer is incorrect then show the correct option by adding the green color of the correct option
        const optionLen = questionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(questionContainer.children[i].id) === currentQuestion.answer) {
                questionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

    //make all options unclickable once the user selects an option(RESTRICT THE USER FROM CHANGING THE OPTION)
    function unclickableOptions() {
        const optionLen = questionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            questionContainer.children[i].classList.add("already-answered");
        }
    }

    function answersIndicator(){
        answersIndicatorContainer.innerHTML = '';
        const totalQuestion = quiz.length;
        for(let i = 0; i<totalQuestion; i++){
        const indicator = document.createElement('div');
        answersIndicatorContainer.appendChild(indicator)
        }
    }

    function updateAnswerIndicator(markType){
        console.log(markType)
        answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
    }

    function next() {
        if (questionCounter === quiz.length) {
            console.log('quiz over');
            quizOver()
        }
        else {
            getNewQuestion();
        }
    }

    function quizOver(){
        //hide quiz box
        quizBox.classList.add('hide')
        //show result box
        resultBox.classList.remove('hide')
        quizResult();
    }

    function quizResult(){
        resultBox.querySelector('.total-question').innerHTML = quiz.length;
        resultBox.querySelector('.total-attempt').innerHTML = attempt;
        resultBox.querySelector('.total-correct').innerHTML = correctAnswer;
        resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswer;
        const percentage = (correctAnswer/quiz.length) * 100;
        resultBox.querySelector('.percentage').value = percentage.toFixed(2) + '%';
        resultBox.querySelector('.total-score').value = correctAnswer + '/' + quiz.length;
    }

    function resetQuiz(){
        questionCounter = 0;
        correctAnswer = 0;
        attempt = 0;
    }

    function tryAgainQuiz(){
        resultBox.classList.add('hide');
        quizBox.classList.remove('hide')
        resetQuiz()
        startQuiz()
    }

    // function backToHome(){
        // resultBox.classList.add('hide')
        // homeBox.classList.remove('hide')
        // resetQuiz()
    //     window.location.href = '/'
    // }

    function startQuiz(){
        setInterval(updateCountDown, 1000)
        homeBox.classList.add('hide');
        quizBox.classList.remove('hide')
        setAvailableQuestions();
        getNewQuestion();
        answersIndicator();
    }


// Background Color
    var body = document.querySelector('.body');
    function yellow(){
        body.classList.add('yellow');
    }
    function blue(){
        body.classList.add('blue');
    }
    function green(){
        body.classList.add('green');
    }
    function black(){
        body.classList.add('black');
    }


    window.onload = function () { 
        homeBox.querySelector('.total-question').innerHTML = quiz.length;
    }

    window.on