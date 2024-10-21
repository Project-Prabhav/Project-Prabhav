// Function to animate the counter
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 50;
    let count = 0;

    const updateCounter = () => {
        count += increment;
        if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}
//Function to update height of enablers section
function setSectionHeight() {
    const section = document.getElementById('key-enablers-section');

    // Check if the viewport width is within the specified range
    if (window.innerWidth >= 320 && window.innerWidth <= 749) {
        const contentHeight = section.scrollHeight; // Get the height of the content
        const additionalHeight = window.innerHeight * -0.5; // Calculate 5vh
        const newHeight = contentHeight + additionalHeight; // Calculate total height

        // Set the height using a dynamically created CSS rule
        section.style.setProperty('height', `${newHeight}px`, 'important');
    } else {
        section.style.removeProperty('height'); // Reset height when outside the range
    }
}

window.addEventListener('resize', setSectionHeight); // Adjust height on resize
window.addEventListener('DOMContentLoaded', setSectionHeight); // Initial call


// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Trigger the counter animation when the section comes into view
window.addEventListener('scrollend', () => {
    const counterSection = document.getElementById('counter-section');
    const counters = document.querySelectorAll('.counter');

   

    if (isInViewport(counterSection)) {
        counters.forEach(counter => {
            counter.style.opacity = 1;  // Smoothly reveal the counter
            animateCounter(counter);
        });
    }
});
