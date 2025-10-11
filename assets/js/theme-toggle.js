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
    right: "1.8rem", // slightly more right
    width: "52px",
    height: "52px",
    cursor: "pointer",
    zIndex: "10001",
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

    /* Logo hover spin animation */
    #site-logo {
      transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.3s ease;
      transform-origin: center center;
      display: block;
      will-change: transform;
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

  // Style logo (higher and bigger)
  Object.assign(logo.style, {
    position: "fixed",
    top: "0.25rem", // slightly higher
    left: "2.2rem", // slightly right
    width: "96px",   // slightly bigger
    height: "96px",
    cursor: "pointer",
    zIndex: "10000",
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

  // === COOL EXPONENTIAL SPIN ON HOVER ===
  let spinning = false;

  function spinLogo() {
    if (spinning) return;
    spinning = true;

    let start = null;
    const duration = 2000; // 2 seconds
    const totalRotation = 360;

    function animate(timestamp) {
      if (!start) start = timestamp;
      let elapsed = timestamp - start;
      let t = Math.min(elapsed / duration, 1); // 0 → 1

      // Exponential easing: slow → very fast → slow
      const eased = t < 0.5
        ? 4 * t * t * t            // accelerate
        : 1 - Math.pow(-2 * t + 2, 3) / 2; // decelerate

      logo.style.transform = `rotate(${totalRotation * eased}deg)`;

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        logo.style.transform = "rotate(0deg)"; // reset
        spinning = false;
      }
    }

    requestAnimationFrame(animate);
  }

  logo.addEventListener("mouseenter", spinLogo);
});
