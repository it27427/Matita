document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".booking-form");
  const packagesSelect = document.querySelector("#packages");
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const adults = document.querySelector("#adult-guests");

  const formBlocks = document.querySelectorAll(".form-block");
  const submitBlock = document.querySelector(".submit-block");
  const checkOutBlock = document.querySelector('[data-block="checkout"]');

  const resetFormVisibility = () => {
    formBlocks.forEach((block) => (block.style.display = "none"));
    submitBlock.classList.remove("col-sm-6", "col-md-4");
    submitBlock.classList.add("col-12");
    submitBlock.style.display = "none";
  };

  // Initial state
  resetFormVisibility();

  packagesSelect.addEventListener("change", () => {
    const selected = packagesSelect.value;
    resetFormVisibility();

    if (!selected || selected === "Select Package") return;

    // Always show
    const checkinBlock = document.querySelector('[data-block="checkin"]');
    const adultsBlock = document.querySelector('[data-block="adults"]');
    const childrenBlock = document.querySelector('[data-block="children"]');
    const othersBlock = document.querySelector('[data-block="others"]');

    checkinBlock.style.display = "block";
    adultsBlock.style.display = "block";
    childrenBlock.style.display = "block";
    othersBlock.style.display = "block";

    if (selected === "Day Long" || selected === "Evening") {
      checkOutBlock.style.display = "none";
      checkOut.value = "";

      // Set submit button in same column style (3 per row)
      submitBlock.classList.remove("col-12");
      submitBlock.classList.add("col-sm-6", "col-md-4");
      submitBlock.style.display = "block";
    }

    if (selected === "Day Long with Evening") {
      checkOutBlock.style.display = "block";

      // Make button full width (new row)
      submitBlock.classList.remove("col-sm-6", "col-md-4");
      submitBlock.classList.add("col-12");
      submitBlock.style.display = "block";
    }
  });

  // Toast helper function
  function showToast(id) {
    const toastEl = document.getElementById(id);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedPackage = packagesSelect.value;
    const checkInVal = checkIn.value.trim();
    const checkOutVal = checkOut.value.trim();
    const adultVal = adults.value.trim();

    if (!checkInVal) {
      showToast("toastCheckIn");
      return;
    }

    if (selectedPackage === "Day Long with Evening" && !checkOutVal) {
      showToast("toastCheckOut");
      return;
    }

    if (!adultVal || parseInt(adultVal) <= 0) {
      showToast("toastAdults");
      return;
    }

    showToast("toastSuccess");

    setTimeout(() => {
      window.location.href = "available-rooms.html";
    }, 2000);
  });
});
