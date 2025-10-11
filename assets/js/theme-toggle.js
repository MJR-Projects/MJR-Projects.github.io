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
    right: "1.8rem",
    width: "52px",
    height: "52px",
    cursor: "pointer",
    zIndex: "10001",
    borderRadius: "50%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease, opacity 0.3s ease"
  });
  document.body.appendChild(btn);

  // === PAGE FADE TRANSITION ===
  const style = document.createElement("style");
  style.textContent = `
    body, body *:not(img):not(svg) {
      transition: background-color 0.4s ease, color 0.4s ease !important;
    }

    /* Logo hover spin animation */
    #site-logo {
      transition: transform 0.6s ease, opacity 0.3s ease;
      display: block;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  // === DARK MODE LOGIC ===
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon;
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", dark ? "dark" : "light");
    btn.src = dark ? lightIcon : darkIcon;
    updateLogo();
  });

  if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon;
  }

  // === LOGO SETUP ===
  const logo = document.createElement("img");
  logo.id = "site-logo";
  logo.src = "/assets/img/LightLogo.png"; // default
  logo.alt = "Site Logo";

  logo.addEventListener("click", () => {
    window.location.href = "https://m
