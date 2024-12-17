document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to buttons dynamically
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const link = event.target.closest('a').href;
  
        if (link.includes('youtube.com')) {
          const videoId = link.split('v=')[1].split('&')[0]; // Extract YouTube video ID
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          openModal(embedUrl);
        } else if (link.includes('tinyurl.com')) {
          openModal(link); // Handle tinyurl or external links
        }
      });
    });
  });
  
  // Function to open the modal with embedded content
  function openModal(url) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalIframe = document.getElementById('modalIframe');
    
    modalIframe.src = url; // Set the source of iframe dynamically
    modalOverlay.style.display = "flex"; // Show modal
  }
  
  // Function to close the modal
  function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalIframe = document.getElementById('modalIframe');
    
    modalIframe.src = ''; // Clear iframe content
    modalOverlay.style.display = "none"; // Hide modal
  }
  
  // Attach close functionality to the modal's close button
  document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
  });
  // Function to search courses based on the search bar input
function searchCourses() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const courseCards = document.querySelectorAll('.course-card');

  courseCards.forEach((card) => {
    const courseTitle = card.querySelector('h3 a').innerText.toLowerCase();
    const courseDescription = card.querySelector('p').innerText.toLowerCase();

    // Check if the search term matches title or description
    if (courseTitle.includes(searchTerm) || courseDescription.includes(searchTerm)) {
      card.style.display = 'block'; // Show matching cards
    } else {
      card.style.display = 'none'; // Hide non-matching cards
    }
  });
}

// Function to close the modal
function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

// Function to open videos in the modal
function openModal(videoUrl) {
  const iframe = document.getElementById('modalIframe');
  iframe.src = videoUrl;
  document.getElementById('modalOverlay').style.display = 'flex';
}

  