document.addEventListener('DOMContentLoaded', () => {

    /* --- Mouse Spotlight Effect --- */
    const spotlight = document.getElementById('spotlight');
    
    // Check if the device has a fine pointer (like a mouse)
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isDesktop && spotlight) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
                spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
            });
        });
    } else {
        // Fallback for mobile/touch - disable the effect
        if(spotlight) spotlight.style.display = 'none';
    }


    /* --- ScrollSpy Navigation --- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    if (sections.length > 0 && navLinks.length > 0) {
        // Intersection Observer for highlighting nav items
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section crosses the middle of the screen
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active from all
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active to current
                    const activeId = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav a[href="#${activeId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

});
