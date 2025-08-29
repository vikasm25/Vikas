// Mobile menu toggle
const menuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Section navigation
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    // Update active button
    document.querySelectorAll(".section-nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");

    // Scroll to section
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: "smooth",
    });
  }
}
