document.addEventListener("DOMContentLoaded", function() {
  // === DARK MODE BUTTON ===
  const darkIcon = "/assets/img/DarkMode.png";
  const lightIcon = "/assets/img/LightMode.png";

  // Wait until main content is loaded
  setTimeout(() => {

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

    // === LOGO SETUP ===
    const logo = document.createElement("img");
    logo.id = "site-logo";
    logo.src = "/assets/img/LightLogo.png"; // default
    logo.alt = "Site Logo";

    logo.addEventListener("click", () => {
      window.location.href = "https://mjr-projects.github.io/";
    });

    Object.assign(logo.style, {
      position: "fixed",
      top: "0.25rem",
      left: "2.2rem",
      width: "96px",
      height: "96px",
      cursor: "pointer",
      zIndex: "10002", // higher than button
      display: "block",
      transformOrigin: "center center"
    });
    document.body.appendChild(logo);

    // === FADE TRANSITIONS ===
    const style = document.createElement("style");
    style.textContent = `
      body, body *:not(img):not(svg) {
        transition: background-color 0.4s ease, color 0.4s ease !important;
      }
    `;
    document.head.appendChild(style);

    // === DARK MODE LOGIC ===
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      btn.src = lightIcon;
      logo.src = "/assets/img/DarkLogo.png";
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", dark ? "dark" : "light");
      btn.src = dark ? lightIcon : darkIcon;
      logo.src = dark ? "/assets/img/DarkLogo.png" : "/assets/img/LightLogo.png";
    });

    if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode");
      btn.src = lightIcon;
      logo.src = "/assets/img/DarkLogo.png";
    }

    // === LOGO SPIN (cool exponential) ===
    let spinning = false;
    logo.addEventListener("mouseenter", () => {
      if (spinning) return;
      spinning = true;

      let start = null;
      const duration = 2000; // 2s spin
      const totalRotation = 360;

      function animate(timestamp) {
        if (!start) start = timestamp;
        let elapsed = timestamp - start;
        let t = Math.min(elapsed / duration, 1);

        // Exponential ease in/out
        const eased = t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

        logo.style.transform = `rotate(${totalRotation * eased}deg)`;

        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          logo.style.transform = "rotate(0deg)";
          spinning = false;
        }
      }

      requestAnimationFrame(animate);
    });

    // === DYNAMIC LOGO RESIZE BASED ON NAVBAR ===
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      function resizeLogo() {
        const navbarHeight = navbar.offsetHeight;
        logo.style.height = Math.round(navbarHeight * 1) + "px"; // 100% of navbar
        logo.style.width = "auto";
      }
      resizeLogo();
      window.addEventListener("resize", resizeLogo);
      window.addEventListener("scroll", resizeLogo);
    }

  }, 100); // Delay to ensure Jekyll layout is ready
});
