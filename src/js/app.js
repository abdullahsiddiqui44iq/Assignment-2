
// const sidebarLinks = document.querySelectorAll('.sidebar-link');
// sidebarLinks.forEach(link => {
//   link.addEventListener('click', async function(event) {
//     event.preventDefault();
//     console.log('Sidebar link clicked:', this.getAttribute('title'));
//     const language = this.getAttribute('title');
//     const content = await fetchContent(language);
//     console.log('Content fetched:', content);
//     if (content && content.length > 0) {
//       displayVideo(content[0].video);
//     } else {
//       console.log('No content available for', language);
//     }
//   });
// });


// async function fetchContent(language) {
//   try {
//     const response = await fetch('content.json');
//     const data = await response.json();
//     const contentHeading = document.querySelector('main section h1');
//     contentHeading.textContent = language;
//     return data[language];
//   } catch (error) {
//     console.error('Error fetching content:', error);
//     return [];
//   }
// }


// function displayVideo(videoUrl) {
//     console.log('Displaying video:', videoUrl);
//     const iframe = document.querySelector('main section iframe');
//     console.log('iframe:', iframe);
//     iframe.src = videoUrl;
//   }

// JavaScript to handle dropdown toggle
document.addEventListener('DOMContentLoaded', function() {
  const dropdownButton = document.getElementById('dropdownBottomButton');
  const dropdownMenu = document.getElementById('dropdownBottom');

  dropdownButton.addEventListener('click', function() {
      dropdownMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', function(event) {
      const isDropdownButton = dropdownButton.contains(event.target);
      const isDropdownMenu = dropdownMenu.contains(event.target);
      if (!isDropdownButton && !isDropdownMenu) {
          dropdownMenu.classList.add('hidden');
      }
  });
});


document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function(event) {
    console.log('Dropdown item clicked:', this.getAttribute('data-course'));

    event.preventDefault();
    // Get the selected course
    const course = this.getAttribute('data-course');
    // Store the selected course in session storage
    sessionStorage.setItem('selectedCourse', course);
    
    // Redirect to the registration page
    window.location.href = 'signup.html';
  });
});