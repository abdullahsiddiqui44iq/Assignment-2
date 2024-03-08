let currentTopicIndex = 0;
let topics = [];

const contentHeading = document.querySelector('.content-heading');
const videoFrame = document.querySelector('.video-frame');
const content = document.querySelector('.content');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Function to fetch HTML topics from the JSON file
async function fetchTopics() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        const course = document.title;
        // topics = data.HTML.topics; // Original code
        topics = data[course].topics;
        displayTopic();
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
}


function displayTopic() {
    const topic = topics[currentTopicIndex];
    contentHeading.textContent = topic.topic;
    videoFrame.src = topic.video;
    content.textContent = topic.content;
}


nextButton.addEventListener('click', () => {
    if (currentTopicIndex < topics.length - 1) {
        currentTopicIndex++;
        displayTopic();
    }
});


prevButton.addEventListener('click', () => {
    if (currentTopicIndex > 0) {
        currentTopicIndex--;
        displayTopic();
    }
});


fetchTopics();
