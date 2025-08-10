"use strict";

/**
 * File: assets/js/booking-form.js
 * Booking Form Script
 * Handles:
 * - Dynamic display of form fields based on selected package
 * - Validation of form inputs on submission
 * - Displaying Bootstrap toast notifications for errors and success
 * - Redirecting on successful form submission
 */

document.addEventListener("DOMContentLoaded", () => {
  // Select key form elements
  const form = document.querySelector(".booking-form");
  const packagesSelect = document.querySelector("#packages");
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const adults = document.querySelector("#adult-guests");

  // Form blocks that show/hide dynamically
  const formBlocks = document.querySelectorAll(".form-block");
  // Submit button container block
  const submitBlock = document.querySelector(".submit-block");
  // Check-out date block (only shown for certain packages)
  const checkOutBlock = document.querySelector('[data-block="checkout"]');

  /**
   * Resets the form fields visibility:
   * - Hides all dynamic form blocks
   * - Hides the submit button
   */
  const resetFormVisibility = () => {
    formBlocks.forEach((block) => block.classList.add("d-none"));
    submitBlock.classList.add("d-none");
  };

  // Initialize form with all dynamic parts hidden
  resetFormVisibility();

  /**
   * Event listener for package selection changes
   * Shows/hides relevant fields based on the chosen package
   */
  packagesSelect.addEventListener("change", () => {
    const selected = packagesSelect.value;

    // Reset visibility before applying new rules
    resetFormVisibility();

    // If no valid package selected, exit early
    if (!selected || selected === "Select Package") return;

    // Get references to all form blocks that may be shown
    const checkinBlock = document.querySelector('[data-block="checkin"]');
    const adultsBlock = document.querySelector('[data-block="adults"]');
    const childrenBlock = document.querySelector('[data-block="children"]');
    const othersBlock = document.querySelector('[data-block="others"]');

    // Always show check-in, adults, children, and others blocks
    checkinBlock.classList.remove("d-none");
    adultsBlock.classList.remove("d-none");
    childrenBlock.classList.remove("d-none");
    othersBlock.classList.remove("d-none");

    // For "Day Long" and "Evening" packages:
    // - Hide check-out block
    // - Show submit button
    if (selected === "Day Long" || selected === "Evening") {
      checkOutBlock.classList.add("d-none");
      checkOut.value = ""; // Clear check-out input value
      submitBlock.classList.remove("d-none");
    }

    // For "Stay Night Package":
    // - Show check-out block
    // - Show submit button
    if (selected === "Stay Night Package") {
      checkOutBlock.classList.remove("d-none");
      submitBlock.classList.remove("d-none");
    }
  });

  /**
   * Helper function to show Bootstrap toasts by ID
   * @param {string} id - The ID of the toast element to show
   */
  function showToast(id) {
    const toastEl = document.getElementById(id);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  /**
   * Form submission handler
   * Validates inputs and shows appropriate toast messages
   * Redirects on successful validation
   */
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get trimmed values from inputs
    const selectedPackage = packagesSelect.value;
    const checkInVal = checkIn.value.trim();
    const checkOutVal = checkOut.value.trim();
    const adultVal = adults.value.trim();

    // Validate check-in date is entered
    if (!checkInVal) {
      showToast("toastCheckIn");
      return; // Stop submission
    }

    // Validate check-out date if "Stay Night Package" selected
    if (selectedPackage === "Stay Night Package" && !checkOutVal) {
      showToast("toastCheckOut");
      return;
    }

    // Validate adults field is > 0
    if (!adultVal || parseInt(adultVal) <= 0) {
      showToast("toastAdults");
      return;
    }

    // All validations passed — show success toast
    showToast("toastSuccess");

    // Redirect after a 2 second delay
    setTimeout(() => {
      window.location.href = "available-rooms.html";
    }, 2000);
  });
});
