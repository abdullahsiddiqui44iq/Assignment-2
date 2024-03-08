document.addEventListener("DOMContentLoaded", function () {
    // Load questions
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            // Initialize variables
            let currentQuestionIndex = 0;
            let score = 0;
            let selectedCourse = sessionStorage.getItem('selectedCourse');
            let timer = 15;
            let timerInterval;

            // Function to display question and answer options
            function displayQuestion() {
                // Clear any existing timer
                clearInterval(timerInterval);

                const question = data[selectedCourse][currentQuestionIndex];
                const quizContainer = document.getElementById('quiz-container');

                // Clear previous question
                quizContainer.innerHTML = '';

                // Display question text
                const questionElement = document.createElement('h2');
                questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${question.question}`;
                quizContainer.appendChild(questionElement);

                // Display timer
                const timerElement = document.createElement('p');
                timerElement.id = 'timer';
                timerElement.textContent = `Time remaining: ${timer} seconds`;
                quizContainer.appendChild(timerElement);

                // Start timer
                startTimer();

                // Display answer options
                question.options.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.textContent = `${index + 1}. ${option}`;
                    optionElement.classList.add('cursor-pointer', 'mb-2', 'px-4', 'py-2', 'rounded-md', 'hover:bg-gray-200');
                    optionElement.addEventListener('click', () => {
                        // Clear timer and check answer when an option is clicked
                        clearInterval(timerInterval);
                        checkAnswer(option);
                    });
                    quizContainer.appendChild(optionElement);
                });
            }

            // Function to start the timer
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

            // Function to check user's answer
            function checkAnswer(selectedOption) {
                const question = data[selectedCourse][currentQuestionIndex];
                if (selectedOption === question.correctAnswer) {
                    score++;
                }
                nextQuestion();
            }

            // Function to move to the next question
            function nextQuestion() {
                currentQuestionIndex++;
                if (currentQuestionIndex < data[selectedCourse].length) {
                    // Reset timer
                    timer = 15;
                    displayQuestion();
                } else {
                    // Quiz completed, show score
                    clearInterval(timerInterval);
                    showScore();
                }
            }

            // Function to show the final score
            function showScore() {
                const quizContainer = document.getElementById('quiz-container');
                quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${data[selectedCourse].length}</p>`;
            }

            // Start the quiz by displaying the first question
            displayQuestion();
        })
        .catch(error => console.error('Error loading questions:', error));
});
