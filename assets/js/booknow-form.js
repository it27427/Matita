/*========================================================================================
  File: book-now-form.js
  Description:
  - Validates "Select Date" and "Adult" fields in the booking form one by one
  - Shows one Bootstrap 5 toast error at a time in sequence
  - Shows a success toast when validation passes
  - Redirects to packages.html after success
========================================================================================*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#bookform");

  const toastDate = new bootstrap.Toast(document.querySelector("#toastDate"));
  const toastAdult = new bootstrap.Toast(document.querySelector("#toastAdult"));
  const toastSuccess = new bootstrap.Toast(
    document.querySelector("#toastSuccess")
  );

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.querySelector("#selectdate").value.trim();
    if (!date) {
      toastDate.show();
      return;
    }

    const adult = document.querySelector("#adult").value.trim();
    if (!adult || parseInt(adult, 10) < 1) {
      toastAdult.show();
      return;
    }

    // Both fields valid → show success toast and redirect
    toastSuccess.show();

    setTimeout(() => {
      window.location.href = "packages.html";
    }, 2000);
  });
});
