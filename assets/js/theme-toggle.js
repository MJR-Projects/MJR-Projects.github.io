document.addEventListener("DOMContentLoaded", function() {
  // Paths to your icons (make sure they're in assets/img/)
  const darkIcon = "/assets/img/DarkMode.png";
  const lightIcon = "/assets/img/LightMode.png";

  // Create the button
  const btn = document.createElement("img");
  btn.id = "theme-toggle";
  btn.src = darkIcon; // Default to dark mode icon
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

  // Fade transitions for the whole page
  const style = document.createElement("style");
  style.textContent = `
    body, body * {
      transition: background-color 0.4s ease, color 0.4s ease !important;
    }
  `;
  document.head.appendChild(style);

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon; // Show light icon when in dark mode
  }

  // Toggle on click
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", dark ? "dark" : "light");
    btn.src = dark ? lightIcon : darkIcon;
  });

  // Respect system preference if nothing saved
  if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
    btn.src = lightIcon;
  }
});
