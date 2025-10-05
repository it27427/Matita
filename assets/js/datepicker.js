const getDatePickerTitle = (elem) => {
  const label = elem.nextElementSibling;
  let titleText = "";
  if (label && label.tagName === "LABEL") {
    titleText = label.textContent;
  } else {
    titleText = elem.getAttribute("aria-label") || "";
  }
  return titleText;
};

// const calendarBtns = document.querySelectorAll(".btn-calendar");

// calendarBtns.forEach((button) => {
//   button.addEventListener("click", () => {
//     document.querySelector(".datepicker").focus();
//   });
// });

const elems = document.querySelectorAll(".datepicker");

for (const elem of elems) {
  const datepicker = new Datepicker(elem, {
    format: "dd/mm/yyyy",
    title: getDatePickerTitle(elem),
    autohide: true,
    clearBtn: true,
  });

  // Force placeholder when no date selected
  elem.addEventListener("changeDate", () => {
    if (!elem.value) {
      elem.placeholder = "Select date";
    }
  });

  // Set placeholder initially
  elem.placeholder = "Select date";
}

// When calendar button is clicked, open the datepicker
document.querySelectorAll(".btn-calendar").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const input = e.currentTarget
      .closest(".form-block")
      .querySelector(".datepicker");
    input.focus();
  });
});
