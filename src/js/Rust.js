let currentTopicIndex = 0;
let topics = [];

const contentHeading = document.querySelector('.content-heading');
const videoFrame = document.querySelector('.video-frame');
const content = document.querySelector('.content');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Function to fetch Rust topics from the JSON file
async function fetchTopics() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        topics = data.Rust.topics;
        displayTopic();
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
}

// Function to display the current topic
function displayTopic() {
    const topic = topics[currentTopicIndex];
    contentHeading.textContent = topic.topic;
    videoFrame.src = topic.video;
    content.textContent = topic.content;
}

// Event listener for the next button
nextButton.addEventListener('click', () => {
    if (currentTopicIndex < topics.length - 1) {
        currentTopicIndex++;
        displayTopic();
    }
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
    if (currentTopicIndex > 0) {
        currentTopicIndex--;
        displayTopic();
    }
});

// Fetch topics when the page loads
fetchTopics();
