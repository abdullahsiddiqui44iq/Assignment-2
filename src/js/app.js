
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