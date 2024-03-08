document.addEventListener("DOMContentLoaded", function () {
    
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            
            let currentQuestionIndex = 0;
            let score = 0;
            let selectedCourse = sessionStorage.getItem('selectedCourse');
            let timer = 15;
            let timerInterval;

            
            function displayQuestion() {
                
                clearInterval(timerInterval);

                const question = data[selectedCourse][currentQuestionIndex];
                const quizContainer = document.getElementById('quiz-container');

                
                quizContainer.innerHTML = '';

                
                const questionElement = document.createElement('h2');
                questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${question.question}`;
                quizContainer.appendChild(questionElement);

                
                const timerElement = document.createElement('p');
                timerElement.id = 'timer';
                timerElement.textContent = `Time remaining: ${timer} seconds`;
                quizContainer.appendChild(timerElement);

                
                startTimer();

                
                question.options.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.textContent = `${index + 1}. ${option}`;
                    optionElement.classList.add('cursor-pointer', 'mb-2', 'px-4', 'py-2', 'rounded-md', 'hover:bg-gray-200');
                    optionElement.addEventListener('click', () => {
                        
                        clearInterval(timerInterval);
                        checkAnswer(option);
                    });
                    quizContainer.appendChild(optionElement);
                });
            }

            
            function startTimer() {
                const timerElement = document.getElementById('timer');
                timerInterval = setInterval(() => {
                    timer--;
                    timerElement.textContent = `Time remaining: ${timer} seconds`;
                    if (timer <= 0) {
                        clearInterval(timerInterval);
                        nextQuestion();
                    }
                }, 1000);
            }

            
            function checkAnswer(selectedOption) {
                const question = data[selectedCourse][currentQuestionIndex];
                if (selectedOption === question.correctAnswer) {
                    score++;
                }
                nextQuestion();
            }

            
            function nextQuestion() {
                currentQuestionIndex++;
                if (currentQuestionIndex < data[selectedCourse].length) {
                    
                    timer = 15;
                    displayQuestion();
                } else {
                    
                    clearInterval(timerInterval);
                    showScore();
                }
            }

            
            function showScore() {
                const quizContainer = document.getElementById('quiz-container');
                quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${data[selectedCourse].length}</p>`;
            }

            
            displayQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
});
