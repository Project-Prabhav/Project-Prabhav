// Page Load Animation
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const orgContent = document.querySelector('.org-content');

    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            orgContent.classList.remove('hidden');
        }, 1000); 
    }, 2000); 
});
// Animation HTML Insertion
document.addEventListener('DOMContentLoaded', function () {
    console.log('Footer script loaded');
    
    function loadExternalHTML() {
        fetch('animation.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('loadingOverlay').innerHTML = data;
            })
            .catch(error => console.error('Error loading external HTML:', error));
    }

    loadExternalHTML();
});
// Footer Insertion
document.addEventListener('DOMContentLoaded', function () {
    console.log('Footer script loaded');
    
    function loadExternalHTML() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => console.error('Error loading external HTML:', error));
    }

    loadExternalHTML();
});
// Mobile Menu Insertion
document.addEventListener('DOMContentLoaded', function () {
    console.log('Mobile Menu script loaded');
    
    function loadExternalHTML() {
        fetch('mobile-menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('mob-menu').innerHTML = data;
            })
            .catch(error => console.error('Error loading external HTML:', error));
    }

    loadExternalHTML();
});
// Mobile Menu Current Class Update
document.addEventListener('DOMContentLoaded', function() {
    function transferCurrentPageClass() {
        let currentPath = window.location.pathname.split('/').pop();
        if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

        const menuLinks = document.querySelectorAll('.menu a');
        if (menuLinks.length === 0) return;

        let classTransferred = false;

        menuLinks.forEach(function(link) {
            link.classList.remove('current-page');
            if (link.getAttribute('href').includes(currentPath)) {
                link.classList.add('current-page');
                classTransferred = true;
            }
        });

        if (!classTransferred) console.log('No matching link found for the current path.');
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                const menu = document.querySelector('.menu');
                if (menu) {
                    transferCurrentPageClass();
                    observer.disconnect();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
// Function for mobile menu
// Track if the menu is open
let isMenuOpen = false;

function toggleMenuMob(event) {
    const menu = document.getElementById("menu");
    const icon = document.querySelector(".menu-icon");
    const overlay = document.getElementById("overlay");
    const body = document.body;

    if (isMenuOpen) {
        // Close the menu
        menu.style.display = "none";
        icon.classList.remove("active");
        overlay.style.display = "none";
        body.classList.remove("no-scroll");

        // Restore original scroll position
        window.scrollTo(0, parseInt(body.dataset.scrollY || '0'));
        body.style.position = "";
        body.style.top = "";
        isMenuOpen = false;
    } else {
        // Open the menu
        menu.style.display = "block";
        icon.classList.add("active");
        overlay.style.display = "block";

        // Lock the scroll position
        body.dataset.scrollY = window.scrollY;
        body.style.position = "fixed";
        body.style.top = `-${body.dataset.scrollY}px`;
        body.classList.add("no-scroll");
        isMenuOpen = true;
    }
    event.stopPropagation();
}

document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    const icon = document.getElementById("menuIcon");

    // Close menu only if it's open and the click was outside the menu and icon
    if (isMenuOpen && !menu.contains(event.target) && event.target !== icon) {
        menu.style.display = "none";
        icon.classList.remove("active");
        document.getElementById("overlay").style.display = "none";
        document.body.classList.remove("no-scroll");

        // Restore scroll position only when closing the menu
        window.scrollTo(0, parseInt(document.body.dataset.scrollY || '0'));
        document.body.style.position = "";
        document.body.style.top = "";
        isMenuOpen = false;
    }
});


// Impact Section Height Adjustments (Media Width 1000-1399px)
function adjustSectHeight() {
    const sects = document.querySelectorAll('.sect');
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width >= 1000 && width <= 1399 && height <= 820) {
        sects.forEach(sect => {
            sect.style.height = `${sect.scrollHeight + 0.05 * height}px`;
        });
    } else {
        sects.forEach(sect => {
            sect.style.height = '';
        });
    }
}

window.addEventListener('load', adjustSectHeight);
window.addEventListener('resize', adjustSectHeight);

// Back To Top Button
document.addEventListener("DOMContentLoaded", function() {
    var BackToTop = document.getElementById("back-to-top");

    if (BackToTop) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                BackToTop.style.display = "block";
            } else {
                BackToTop.style.display = "none";
            }
        };

        BackToTop.addEventListener("click", function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    } else {
        console.error("Element with ID 'back-to-top' not found.");
    }
});

// Payment Page
function showPayment(option) {
    const paymentOptions = ['upi', 'netbanking', 'card'];
    paymentOptions.forEach(opt => {
        const fields = document.getElementById(`${opt}-fields`);
        const circleInner = document.querySelector(`.payment-option[onclick="showPayment('${opt}')"] .circle-inner`);
        const circle = document.querySelector(`.payment-option[onclick="showPayment('${opt}')"] .circle`);

        if (opt === option) {
            fields.style.display = 'block';
            circleInner.style.display = 'block';
            circle.classList.add('selected');
        } else {
            fields.style.display = 'none';
            circleInner.style.display = 'none';
            circle.classList.remove('selected');
        }
    });
}

function selectBank(bankName) {
    const dropdown = document.getElementById('bankDropdown');
    dropdown.value = bankName;
}

// Initialize default selection
document.addEventListener('DOMContentLoaded', () => {
    showPayment('upi');  // Show UPI option by default
});

// Payments Page Input
function formatCardNumber(input) {
    // Remove any non-digit character
    input.value = input.value.replace(/[^0-9]/g, '');
    
    // Add dashes after every 4 digits
    let formattedValue = input.value.replace(/(\d{4})(?=\d)/g, '$1-');
    
    // Limit to 29 characters (24 digits + 5 dashes)
    if (formattedValue.length > 29) {
        formattedValue = formattedValue.slice(0, 29);
    }
    
    input.value = formattedValue;
}
function formatExpiryDate(input) {
    // Remove any non-digit character
    input.value = input.value.replace(/[^0-9]/g, '');

    // Insert '/' after the first two digits
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2) + '/' + input.value.slice(2, 4);
    }

    // Limit to 5 characters (2 digits, a '/', 2 digits)
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5);
    }
}

// More People in Department
document.addEventListener('DOMContentLoaded', function () {
    const showCount = 3;

    const departments = [2, 3, 4]; // Array of department numbers

    departments.forEach(dept => {
        const items = document.querySelectorAll(`#department-${dept} .inner-data-${dept}`);
        const icons = document.querySelectorAll(`#department-${dept} .icons img`);
        let currentStart = 0;

        function updateDisplay() {
            items.forEach((item, index) => {
                item.style.display = (index >= currentStart && index < currentStart + showCount) ? 'block' : 'none';
            });
            updateIcons();
        }

        function updateIcons() {
            icons.forEach((icon, index) => {
                if (currentStart === 0) {
                    icon.style.display = (index < showCount) ? 'block' : 'none';
                } else if (currentStart + showCount >= items.length) {
                    icon.style.display = (index === 3) ? 'block' : 'none'; // Show last icon when at the end
                } else {
                    icon.style.display = 'none';
                }

                // Show new worker images when next is clicked
                const newWorkerImages = document.querySelectorAll(`#department-${dept} .new-worker`);
                if (currentStart > 0 && currentStart + showCount <= items.length) {
                    newWorkerImages.forEach((img, imgIndex) => {
                        img.style.display = imgIndex < (currentStart + showCount) - items.length ? 'block' : 'block';
                    });
                }
            });
        }

        document.getElementById(`prevBtn${dept}`).onclick = () => {
            if (currentStart > 0) {
                currentStart -= showCount;
                updateDisplay();
            }
        };

        document.getElementById(`nextBtn${dept}`).onclick = () => {
            if (currentStart + showCount < items.length) {
                currentStart += showCount;
                updateDisplay();
            }
        };

        updateDisplay(); // Initialize display for each department
    });
});
