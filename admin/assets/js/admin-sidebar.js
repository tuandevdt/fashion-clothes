document.addEventListener('DOMContentLoaded', function() {
  // Wait for sidebar to be loaded
  setTimeout(setupSidebarNavigation, 500);
});

function setupSidebarNavigation() {
  console.log('Setting up sidebar navigation...');
  
  // Get current page name for active state
  const currentLocation = window.location.pathname;
  const currentPage = currentLocation.split('/').pop();
  
  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  console.log('Found nav links:', navLinks.length);
  
  navLinks.forEach((link, index) => {
    const targetPage = link.getAttribute('data-page');
    console.log(`Link ${index}: ${targetPage}`);
    
    // Set active state
    if (currentPage === targetPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
    
    // Add click handler
    if (targetPage) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Navigating to:', targetPage);
        
        // Remove active from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked link
        this.classList.add('active');
        
        // Navigate to page
        window.location.href = targetPage;
      });
    }
  });
}

// Make function globally available
window.setupSidebarNavigation = setupSidebarNavigation;
