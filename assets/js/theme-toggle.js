document.addEventListener("DOMContentLoaded", function() {
  // === DARK MODE BUTTON ===
  const darkIcon = "/assets/img/DarkMode.png";
  const lightIcon = "/assets/img/LightMode.png";

  const btn = document.createElement("img");
  btn.id = "theme-toggle";
  btn.src = darkIcon;
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    width: "48px",
    height: "48px",
    cursor: "pointer",
    zIndex: "9999",
    borderRadius: "50%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease, opacity 0.3s ease"
  });
  document.body.appendChild(btn);

  // Fade transitions for page
  const style = document.createElement("style");
  style.textContent = `
    body, body *:not(img):not(svg) {
      transition: background-color 0.4s ease, color 0.4s ease !important;
    }
  `;
  document.head.appendChild(style);

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon;
  }

  // Toggle on click
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", dark ? "dark" : "light");
    btn.src = dark ? lightIcon : darkIcon;
    updateLogo();
  });

  // Respect system preference if no saved theme
  if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon;
  }

  // === LOGO SETUP ===
  const logo = document.createElement("img");
  logo.id = "site-logo";
  logo.src = "/assets/img/LightLogo.png";
  logo.alt = "Site Logo";

  // Clickable logo
  logo.addEventListener("click", () => {
    window.location.href = "https://mjr-projects.github.io/";
  });

  // Logo style
  Object.assign(logo.style, {
    position: "fixed",
    top: "0.3rem",   // higher
    left: "2rem",
    width: "92px",
    height: "92px",
    cursor: "pointer",
    zIndex: "9999",
    display: "block",
    transformOrigin: "center center"
  });

  document.body.appendChild(logo);

  // Update logo based on theme
  function updateLogo() {
    const dark = document.body.classList.contains("dark-mode");
    logo.src = dark ? "/assets/img/DarkLogo.png" : "/assets/img/LightLogo.png";
  }
  updateLogo();

  // === COOL SPIN ANIMATION ===
  let spinning = false;

  function spinLogo() {
    if (spinning) return;
    spinning = true;

    let start = null;
    let duration = 2000; // total time for one full acceleration-deceleration spin
    let totalRotation = 360; // degrees

    function animate(timestamp) {
      if (!start) start = timestamp;
      let elapsed = timestamp - start;
      let t = elapsed / duration; // 0 → 1

      // Exponential easing: slow → fast → slow
      // Using cubic ease-in-out: f(t) = t<sup>3</sup>/(t<sup>3</sup> + (1-t)<sup>3</sup>)
      let eased = t < 0.5
        ? 4 * t * t * t          // accelerating
        : 1 - Math.pow(-2 * t + 2, 3) / 2; // decelerating

      logo.style.transform = `rotate(${totalRotation * eased}deg)`;

      if (elapse
