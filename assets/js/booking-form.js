/*========================================================================================

* File: assets/js/booking-form.js
* This script handles the booking form functionality, including package selection,
* Datepicker initialization, form validation, and submission handling.
* It also manages the visibility of form blocks based on the selected package.
* Ensure the script runs after the DOM is fully loaded
* and that Bootstrap's JavaScript is included for toasts.
* The script validates the selected package, check-in and check-out dates,
* and the number of adult guests, showing error messages if any fields are invalid.
* Showing a success message upon successful submission.
* Upon successful validation, it displays a success message and can redirect to another page.

\=======================================================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Select form elements
  const form = document.querySelector(".booking-form");
  const packagesSelect = document.querySelector("#packages");
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const adults = document.querySelector("#adult-guests");

  // Initialize datepicker for check-in and check-out
  const formBlocks = document.querySelectorAll(".form-block");
  const submitBlock = document.querySelector(".submit-block");
  const checkOutBlock = document.querySelector('[data-block="checkout"]');

  // Reset form visibility function
  const resetFormVisibility = () => {
    formBlocks.forEach((block) => {
      block.classList.add("d-none");
    });

    submitBlock.classList.remove("col-sm-6", "col-md-4");
    submitBlock.classList.add("col-12");
    submitBlock.classList.add("d-none");
  };

  // Initial state
  resetFormVisibility();

  // Handle package selection change
  packagesSelect.addEventListener("change", () => {
    const selected = packagesSelect.value;
    resetFormVisibility();

    if (!selected || selected === "Select Package") return;

    // Always show these blocks
    const checkinBlock = document.querySelector('[data-block="checkin"]');
    const adultsBlock = document.querySelector('[data-block="adults"]');
    const childrenBlock = document.querySelector('[data-block="children"]');
    const othersBlock = document.querySelector('[data-block="others"]');

    // Show relevant blocks based on selection
    checkinBlock.classList.remove("d-none");
    adultsBlock.classList.remove("d-none");
    childrenBlock.classList.remove("d-none");
    othersBlock.classList.remove("d-none");

    // Handle specific package logic
    if (selected === "Day Long" || selected === "Evening") {
      checkOutBlock.classList.add("d-none");
      checkOut.value = "";

      // Set submit button style to 3 per row
      submitBlock.classList.remove("col-12");
      submitBlock.classList.add("col-sm-6", "col-md-4");
      submitBlock.classList.remove("d-none");
    }

    // Handle "Stay Night Package" package
    if (selected === "Stay Night Package") {
      checkOutBlock.classList.remove("d-none");

      // Make button full width (new row)
      submitBlock.classList.remove("col-sm-6", "col-md-4");
      submitBlock.classList.add("col-12");
      submitBlock.classList.remove("d-none");
    }
  });

  // Toast helper function
  function showToast(id) {
    const toastEl = document.getElementById(id);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Validate inputs
    const selectedPackage = packagesSelect.value;
    const checkInVal = checkIn.value.trim();
    const checkOutVal = checkOut.value.trim();
    const adultVal = adults.value.trim();

    // Check if a package is selected
    if (!checkInVal) {
      showToast("toastCheckIn");
      return;
    }

    // Check if check-out is required
    if (selectedPackage === "Stay Night Package" && !checkOutVal) {
      showToast("toastCheckOut");
      return;
    }

    // Check if adults are specified
    if (!adultVal || parseInt(adultVal) <= 0) {
      showToast("toastAdults");
      return;
    }

    // If all validations pass, show success toast
    showToast("toastSuccess");

    // Optionally, redirect after a delay
    setTimeout(() => {
      window.location.href = "available-rooms.html";
    }, 2000);
  });
});
