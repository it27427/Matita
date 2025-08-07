document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");

  const packagesSelect = document.getElementById("packages");
  const checkIn = document.getElementById("check-in");
  const checkOut = document.getElementById("check-out");
  const adults = document.getElementById("adult-guests");
  const children = document.getElementById("children-guests");
  const submitBtn = document.querySelector(
    ".booking-form button[type='submit']"
  );

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

    if (!selectedPackage || selectedPackage === "") {
      formElements.forEach((el) => (el.style.display = "none"));
      submitBtn.style.display = "none";
      return;
    }

    formElements.forEach((el) => (el.style.display = "block"));
    submitBtn.style.display = "inline-block";

    // Check-out logic
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

    const packageType = packagesSelect.value;
    const checkInVal = checkIn.value.trim();
    const checkOutVal = checkOut.value.trim();
    const adultVal = adults.value;
    const childrenVal = children.value;

    const errors = [];

    if (!packageType) {
      errors.push("Please select a package.");
    }
    if (!checkInVal) {
      errors.push("Check-in date is required.");
    }
    if (packageType === "Night" && !checkOutVal) {
      errors.push("Check-out date is required for Night package.");
    }
    if (!adultVal) {
      errors.push("Please select number of adults.");
    }
    if (!childrenVal) {
      errors.push("Please select number of children.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n")); // Optional: convert to Bootstrap toast
      return;
    }

    // ✅ Show Bootstrap Toast
    const toastEl = document.getElementById("formSuccessToast");
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    // ✅ Reset form
    form.reset();

    // ✅ Hide fields again after reset
    formElements.forEach((el) => (el.style.display = "none"));
    submitBtn.style.display = "none";
  });
});
