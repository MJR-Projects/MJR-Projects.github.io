document.addEventListener("DOMContentLoaded", function() {
  // Create the dark mode button
  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.textContent = "🌙 / ☀️";
  Object.assign(btn.style, {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 1050,           // Above navbar
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    background: "rgba(255,255,255,0.8)",
    border: "none",
    borderRadius: "0.5rem",
    transition: "background 0.3s ease"
  });
  document.body.appendChild(btn);

  // Load dark mode preference from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Toggle dark mode on button click
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  // Apply system preference if no saved theme
  if (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
  }

  // Load dark-mode.css
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/css/dark-mode.css"; // Root path for GitHub Pages
  document.head.appendChild(link);
});
