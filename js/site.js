try {
  if (localStorage.getItem("site-theme") === "dark") document.documentElement.dataset.theme = "dark";
} catch {}

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector("[data-theme-toggle]");
  if (themeButton) {
    const updateThemeButton = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.title = dark ? "Turn off dark mode" : "Turn on dark mode";
    };
    updateThemeButton();
    themeButton.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      try { localStorage.setItem("site-theme", nextTheme); } catch {}
      updateThemeButton();
    });
  }

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-nav");
  if (!menuButton || !menu) return;

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menu.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.classList.toggle("is-open", open);
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) closeMenu();
  });
});
