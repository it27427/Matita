const getDatePickerTitle = (elem) => {
  // From the label or the aria-label
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
  });
}
