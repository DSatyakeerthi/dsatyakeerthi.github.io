document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar nav a');
    const sections = document.querySelectorAll('section');

    // --- 1. Smooth Scrolling for Navigation Links ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if the link is a standard section link (not the primary contact button)
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault(); 
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Scroll smoothly to the target section, adjusted for fixed navbar
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

// Call the function when the page loads
displaySuccessMessage();

    // --- 2. Navigation Link Highlighting on Scroll (Active State) ---
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px', // Highlights when the section is centered vertically
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const navLink = document.querySelector(`.navbar nav a[href="#${id}"]`);

            if (navLink) {
                if (entry.isIntersecting) {
                    // Add 'active' class to the current section's link
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                } else {
                    // Optionally remove the class when leaving the viewport, though the
                    // intersecting check handles this well.
                    // navLink.classList.remove('active'); 
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});



