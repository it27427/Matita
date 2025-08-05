let toastTrigger = document.getElementById("subscribe-button");
let toastSubscribe = document.getElementById("subscribeToast");

if (toastTrigger) {
  toastTrigger.addEventListener("click", function () {
    let toast = new bootstrap.Toast(toastSubscribe);

    toast.show();
  });
}
