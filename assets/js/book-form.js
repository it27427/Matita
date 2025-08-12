/*========================================================================================
  File: book-form.js
  Description:
  - Validates all fields in the booking form (full name, email, phone, terms checkbox)
  - Displays separate Bootstrap 5 toasts for each specific error
  - Shows a success toast if all validations pass
  - Prevents form submission on validation errors
========================================================================================*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#book-form");

  // Create toast instances (Bootstrap)
  const toastFullName = new bootstrap.Toast(
    document.querySelector("#toastFullName"),
    { delay: 3000 }
  );
  const toastEmailRequired = new bootstrap.Toast(
    document.querySelector("#toastEmailRequired"),
    { delay: 3000 }
  );
  const toastEmailInvalid = new bootstrap.Toast(
    document.querySelector("#toastEmailInvalid"),
    { delay: 3000 }
  );
  const toastPhoneNumber = new bootstrap.Toast(
    document.querySelector("#toastPhoneNumber"),
    { delay: 3000 }
  );
  const toastTerms = new bootstrap.Toast(
    document.querySelector("#toastTerms"),
    { delay: 3000 }
  );
  const toastSuccess = new bootstrap.Toast(
    document.querySelector("#toastSuccess"),
    { delay: 3000 }
  );

  /**
   * Check if email format is valid
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Check if phone number is valid (exactly 11 digits)
   * @param {string} phone
   * @returns {boolean}
   */
  function isValidPhone(phone) {
    return /^\d{11}$/.test(phone);
  }

  // Form submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default submission

    // Get form values
    const fullName = document.querySelector("#full-name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phoneNumber = document.querySelector("#phone-number").value.trim();
    const termsAccepted = document.querySelector("#disclaimer-check").checked;

    // Validate fields in order
    if (!fullName) {
      toastFullName.show();
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

    if (!phoneNumber || !isValidPhone(phoneNumber)) {
      toastPhoneNumber.show();
      return;
    }

    if (!termsAccepted) {
      toastTerms.show();
      return;
    }

    // ✅ All validations passed
    toastSuccess.show();
    form.reset();
  });
});
