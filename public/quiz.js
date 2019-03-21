
function populate () {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        const element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text

        const choices = quiz.getQuestionIndex().choices;
        console.log('choices', choices[0]);

        for(let i = 0; i < choices.length; i++) {
            console.log('element', i);
            console.log('element choice', document.getElementById("choice"))
            const element = document.getElementById("choice" + i);

            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}


const getQuestions = async () => {
    const url = 'https://sport-quiz.herokuapp.com/random'
    let res = await fetch(url) // Call the fetch function passing the url of the API as a parameter
    res = await res.json()
    console.log(res)
    
    const questions = res.data.map(el => {
        return new Question(el.question, el.options, el.answer)
    });
    return questions
}

function guess(id, guess) {
    const button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
}
function showProgress() {
    const currentQuestionNumber = quiz.questionIndex + 1;
    const element = document.getElementById("progress");
    element.innerHTML = "Questions " + currentQuestionNumber +"of "+ quiz.questions.length
}
function showScores() {
    let gameOverHtml = "<h1>Result</h1>";
          gameOverHtml += "<h2 id='score'> Your score: "+quiz.score +"</h2>";
          gameOverHtml += "<a href='/options'><button class='new'> Play Again </button></a>";
          gameOverHtml += "<a href='/' onclick='signOut()'><button class='new'> Sign Out </button></a>";
    const element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}

const result = getQuestions();

let quiz
result.then(data => {
    quiz = new Quiz(data);
    populate();
    document.querySelector('.grid').classList.add('show-quiz');
    document.querySelector('#loading').classList.add('hide-loading');
})
