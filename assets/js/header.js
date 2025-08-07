document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#main-header");
  let lastScrollY = window.scrollY;

  const isMobile = () => window.innerWidth <= 768;
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  // Define thresholds for desktop and mobile
  const DESKTOP_THRESHOLD = vh * 1.1;
  const MOBILE_THRESHOLD = vh;

  //   Hide header on scroll down, show on scroll up
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    // ✅ Mobile behavior
    if (isMobile()) {
      if (currentScrollY <= MOBILE_THRESHOLD) {
        header.classList.remove("hidden");
      } else {
        if (scrollingUp) {
          header.classList.remove("hidden");
        } else if (scrollingDown) {
          header.classList.add("hidden");
        }
      }
    } else {
      // ✅ Desktop behavior
      if (currentScrollY < vh) {
        header.classList.remove("fixed", "hidden");
      } else if (currentScrollY > DESKTOP_THRESHOLD && scrollingDown) {
        header.classList.add("hidden");
        header.classList.remove("fixed");
      } else if (currentScrollY > DESKTOP_THRESHOLD && scrollingUp) {
        header.classList.remove("hidden");
        header.classList.add("fixed");
      }
    }

    lastScrollY = currentScrollY;
  });
});
