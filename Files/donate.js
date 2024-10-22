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

    // Clear messages for UPI
    document.getElementById('upiMessage').textContent = "";
    document.getElementById('upiErrorMessage').textContent = "";

    // Clear messages for Net Banking
    document.getElementById('bankMessage').textContent = "";
    document.getElementById('errorMessage').textContent = "";
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

// Payment Gateway Buttons
function handleButtonClick(event) {
    // Prevent default behavior and stop propagation
    event.preventDefault();
    event.stopImmediatePropagation();
  
    // Set the title message on the clicked button
    const button = event.currentTarget;
    button.title = "Sorry, your request cannot be processed at this moment.";
  
    // Remove the title after 4 seconds
    setTimeout(() => {
      button.removeAttribute('title');
    }, 4000);
  }
  
  function applyButtonHandler() {
    const buttonClasses = [
      '.bhim-upi', '.phone-pay', '.paytm', 
      '.google-pay', ' #upi-fields .submit'
    ];
  
    // Attach the event listener to all specified buttons
    buttonClasses.forEach(selector => {
      document.querySelectorAll(selector).forEach(button => {
        button.addEventListener('click', handleButtonClick);
      });
    });
  }
  
  function disableFormSubmission() {
    // Disable form submissions to prevent reloads or 405 errors
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();  // Ensure no submission
      });
    });
  }
  
  // Initialize handlers on page load
  document.addEventListener('DOMContentLoaded', () => {
    applyButtonHandler();
    disableFormSubmission();
  });
  

// Function to handle bank selection and clear error message
function selectBank(bankName) {
    const bankMessage = document.getElementById('bankMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Update the selected bank message
    bankMessage.textContent = `Selected Bank: ${bankName}`;

    // Clear the error message whenever a new bank is selected
    errorMessage.textContent = "";
}

// Function to show error message when the submit button is clicked
function showErrorMessage(event) {
    event.preventDefault(); // Prevent form submission or page reload

    const bankMessage = document.getElementById('bankMessage');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = "Sorry, we cannot process your request at this moment.";

    // Clear the selected bank message when an error occurs
    bankMessage.textContent = "";
}

// Clear messages on page load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bankMessage').textContent = "";
    document.getElementById('errorMessage').textContent = "";
});

// Function to handle UPI app selection and clear error message
function selectUPI(upiApp) {
    const upiMessage = document.getElementById('upiMessage');
    const upiErrorMessage = document.getElementById('upiErrorMessage');

    // Update the selected UPI message
    upiMessage.textContent = `Selected UPI App: ${upiApp}`;

    // Clear the error message whenever a new UPI app is selected
    upiErrorMessage.textContent = "";
}

// Function to show the error message when the submit button is clicked
function showUPIErrorMessage(event) {
    event.preventDefault(); // Prevent form submission or page reload

    const upiMessage = document.getElementById('upiMessage');
    const upiErrorMessage = document.getElementById('upiErrorMessage');
    upiErrorMessage.textContent = "Sorry, we cannot process your request at this moment.";

    // Clear the selected UPI app message when an error occurs
    upiMessage.textContent = "";
}

// Clear messages on page load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('upiMessage').textContent = "";
    document.getElementById('upiErrorMessage').textContent = "";
});


// Function to show the error message on submit button click
function showCardErrorMessage(event) {
    event.preventDefault(); // Prevent form submission
    const errorMessage = document.getElementById('cardErrorMessage');
    errorMessage.textContent = "Sorry, we cannot process your request at this moment.";
}

// Function to hide the error message when any input field is focused
function hideErrorMessage() {
    const errorMessage = document.getElementById('cardErrorMessage');
    errorMessage.textContent = "";
}

// Ensure the error message is cleared on page load
window.addEventListener('DOMContentLoaded', () => {
    hideErrorMessage();
});
