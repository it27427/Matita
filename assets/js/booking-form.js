document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");

  const packagesSelect = document.querySelector("#packages");
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const adults = document.querySelector("#adult-guests");

  const submitBtn = form.querySelector("button[type='submit']");
  const formElements = document.querySelectorAll(
    ".form-info:not(:first-child)"
  );
  const checkOutField = checkOut.closest(".form-info");

  // Hide all fields except packages initially
  formElements.forEach((el) => (el.style.display = "none"));
  submitBtn.style.display = "none";

  // Handle package selection
  packagesSelect.addEventListener("change", () => {
    const selectedPackage = packagesSelect.value;

    if (!selectedPackage || selectedPackage === "Select Package") {
      formElements.forEach((el) => (el.style.display = "none"));
      submitBtn.style.display = "none";
      return;
    }

    formElements.forEach((el) => (el.style.display = "block"));
    submitBtn.style.display = "inline-block";

    if (selectedPackage === "Day" || selectedPackage === "Evening") {
      checkOutField.style.display = "none";
      checkOut.value = "";
    } else {
      checkOutField.style.display = "block";
    }
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    const selectedPackage = packagesSelect.value;
    const checkInVal = checkIn.value.trim();
    const checkOutVal = checkOut.value.trim();
    const adultVal = adults.value.trim();

    // Validation
    if (!checkInVal) {
      new bootstrap.Toast(document.querySelector("#toastCheckIn")).show();
      return;
    }

    if (selectedPackage === "Night" && !checkOutVal) {
      new bootstrap.Toast(document.querySelector("#toastCheckOut")).show();
      return;
    }

    if (!adultVal || parseInt(adultVal) <= 0) {
      new bootstrap.Toast(document.querySelector("#toastAdults")).show();
      return;
    }

    // ✅ Show success toast and then redirect
    new bootstrap.Toast(document.querySelector("#toastSuccess")).show();

    // Wait for 2 seconds before redirecting
    setTimeout(() => {
      window.location.href = "available-rooms.html";
    }, 2000);
  });
});
