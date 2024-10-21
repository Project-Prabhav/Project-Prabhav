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
