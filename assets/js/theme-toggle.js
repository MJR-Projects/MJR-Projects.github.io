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

  // Smooth fade transitions and logo spin CSS injected
  const style = document.createElement("style");
  style.textContent = `
    /* Smooth color/background fades (avoid images/svg flicker) */
    body, body *:not(img):not(svg) {
      transition: background-color 0.4s ease, color 0.4s ease !important;
    }

    /* Logo styles and spin keyframes */
    #site-logo {
      transition: transform 0.6s ease, opacity 0.3s ease;
      transform-origin: center center;
      display: block;
      will-change: transform;
    }

    @keyframes spin-360 {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* on hover play one spin */
    #site-logo:hover {
      animation: spin-360 0.8s linear 1;
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
  logo.src = "/assets/img/LightLogo.png"; // default (light mode)
  logo.alt = "Site Logo";

  // Make it clickable (go home)
  logo.addEventListener("click", () => {
    window.location.href = "https://mjr-projects.github.io/";
  });

  // Style the logo (moved a bit higher and slightly right)
  Object.assign(logo.style, {
    position: "fixed",
    top: "0.6rem",      // moved higher (smaller = higher)
    left: "2.0rem",     // a touch more right than before
    width: "88px",      // slightly bigger
    height: "88px",
    cursor: "pointer",
    zIndex: "9999",
    display: "block",
  });

  document.body.appendChild(logo);

  // Change logo based on theme
  function updateLogo() {
    const dark = document.body.classList.contains("dark-mode");
    logo.src = dark ? "/assets/img/DarkLogo.png" : "/assets/img/LightLogo.png";
  }

  // Update on load
  updateLogo();
});
