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

  // Inject fade + logo animation styles
  const style = document.createElement("style");
  style.textContent = `
    /* Smooth fade for all elements */
    body, body *:not(img):not(svg) {
      transition: background-color 0.4s ease, color 0.4s ease !important;
    }

    /* Logo hover animation */
    #site-logo {
      transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.3s ease;
      transform-origin: center center;
      display: block;
      will-change: transform;
    }

    /* Hover effect: spin + scale + tilt for cool look */
    #site-logo:hover {
      animation: spin-scale 1s linear infinite;
    }

    @keyframes spin-scale {
      0%   { transform: rotate(0deg) scale(1) skew(0deg,0deg); }
      25%  { transform: rotate(90deg) scale(1.1) skew(3deg,-3deg); }
      50%  { transform: rotate(180deg) scale(1) skew(0deg,0deg); }
      75%  { transform: rotate(270deg) scale(1.1) skew(-3deg,3deg); }
      100% { transform: rotate(360deg) scale(1) skew(0deg,0deg); }
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

  // Respect system preference if nothing saved
  if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon;
  }

  // === LOGO SETUP ===
  const logo = document.createElement("img");
  logo.id = "site-logo";
  logo.src = "/assets/img/LightLogo.png"; // default
  logo.alt = "Site Logo";

  // Clickable logo
  logo.addEventListener("click", () => {
    window.location.href = "https://mjr-projects.github.io/";
  });

  // Style logo (higher, slightly bigger)
  Object.assign(logo.style, {
    position: "fixed",
    top: "0.4rem",      // a bit higher
    left: "2rem",       // slightly right
    width: "92px",      // bigger
    height: "92px",
    cursor: "pointer",
    zIndex: "9999",
    display: "block",
  });

  document.body.appendChild(logo);

  // Update logo based on theme
  function updateLogo() {
    const dark = document.body.classList.contains("dark-mode");
    logo.src = dark ? "/assets/img/DarkLogo.png" : "/assets/img/LightLogo.png";
  }

  // Update on load
  updateLogo();
});
