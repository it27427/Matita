/*========================================================================================
  File: contact-form.js
  Description:
  - Validates each mandatory field in the contact form
  - Checks Terms & Conditions checkbox
  - Shows separate Bootstrap 5 toasts for each specific error
  - Shows a success toast when validation passes
========================================================================================*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact-form");

  // Create toast instances
  const toastUsername = new bootstrap.Toast(
    document.querySelector("#toastUsername")
  );
  const toastEmailRequired = new bootstrap.Toast(
    document.querySelector("#toastEmailRequired")
  );
  const toastEmailInvalid = new bootstrap.Toast(
    document.querySelector("#toastEmailInvalid")
  );
  const toastSubject = new bootstrap.Toast(
    document.querySelector("#toastSubject")
  );
  const toastMessage = new bootstrap.Toast(
    document.querySelector("#toastMessage")
  );
  const toastTerms = new bootstrap.Toast(document.querySelector("#toastTerms"));
  const toastSuccess = new bootstrap.Toast(
    document.querySelector("#toastSuccess")
  );

  // Email validation regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // On form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get field values
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();
    const termsAccepted = document.querySelector("#disclaimer-check").checked;

    // Validate fields one by one
    if (!username) {
      toastUsername.show();
      return;
    }

    if (!email) {
      toastEmailRequired.show();
      return;
    }

    if (!isValidEmail(email)) {
      toastEmailInvalid.show();
      return;
    }

    if (!subject) {
      toastSubject.show();
      return;
    }

    if (!message) {
      toastMessage.show();
      return;
    }

    if (!termsAccepted) {
      toastTerms.show();
      return;
    }

    // ✅ All good → Show success toast
    toastSuccess.show();
    form.reset();
  });
});
