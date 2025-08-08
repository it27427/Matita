/*========================================================================================

* File: assets/js/subscription-form.js
* This script handles the newsletter subscription form validation and submission
* It uses Bootstrap's Toast component for user feedback
* Ensure the script runs after the DOM is fully loaded
* and that Bootstrap's JavaScript is included for toasts.
* This script validates the username and email fields,
* showing error messages if they are empty, and a success message upon successful submission.

\=======================================================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Select the form and input elements
  const form = document.querySelector(".formnewsletter");
  const usernameInput = document.querySelector("#newsletter-username");
  const emailInput = document.querySelector("#newsletter-email");

  // Bootstrap Toast elements for different messages
  const toastNameRequiredEl = document.querySelector(
    "#toast-error-name-required"
  );
  const toastEmailRequiredEl = document.querySelector(
    "#toast-error-email-required"
  );
  const toastEmailInvalidEl = document.querySelector(
    "#toast-error-email-invalid"
  );

  const toastSuccessEl = document.querySelector("#toast-success");

  // Initialize Bootstrap Toasts
  const toastNameRequired = new bootstrap.Toast(toastNameRequiredEl);
  const toastEmailRequired = new bootstrap.Toast(toastEmailRequiredEl);
  const toastEmailInvalid = new bootstrap.Toast(toastEmailInvalidEl);
  const toastSuccess = new bootstrap.Toast(toastSuccessEl);

  // Simple email validation regex
  function isValidEmail(email) {
    // Basic RFC 5322 compliant email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous validation states
    usernameInput.classList.remove("is-invalid", "is-valid");
    emailInput.classList.remove("is-invalid", "is-valid");

    // Validate name
    if (!usernameInput.value.trim()) {
      usernameInput.classList.add("is-invalid");
      toastNameRequired.show();
      return; // Stop further validation
    } else {
      usernameInput.classList.add("is-valid");
    }

    // Validate email presence
    if (!emailInput.value.trim()) {
      emailInput.classList.add("is-invalid");
      toastEmailRequired.show();
      return; // Stop further validation
    } else {
      emailInput.classList.remove("is-invalid");
    }

    // Validate email format
    if (!isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add("is-invalid");
      toastEmailInvalid.show();
      return; // Stop further validation
    } else {
      emailInput.classList.add("is-valid");
    }

    // If all validations passed
    toastSuccess.show();
    form.reset();

    // Reset validation classes after success
    usernameInput.classList.remove("is-valid");
    emailInput.classList.remove("is-valid");
  });
});
