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
