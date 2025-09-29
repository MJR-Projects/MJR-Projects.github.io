document.addEventListener("DOMContentLoaded", function() {
  // Create the button dynamically
  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.textContent = "🌙 / ☀️";
  Object.assign(btn.style, {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 999,
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    background: "rgba(255,255,255,0.8)",
    border: "none",
    borderRadius: "0.5rem"
  });
  document.body.appendChild(btn);

  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Toggle on click
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  // Use system preference if no saved theme
  if (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
  }

  // Add dark mode styles
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "assets/css/dark-mode.css";
  document.head.appendChild(link);
});
