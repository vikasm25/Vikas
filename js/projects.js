// Mobile menu toggle
const menuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Filter functionality for both sections
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.getAttribute("data-section");
    const filter = button.getAttribute("data-filter");

    // Remove active class from all buttons in this section
    document
      .querySelectorAll(`.filter-btn[data-section="${section}"]`)
      .forEach((btn) => {
        btn.classList.remove("active");
      });

    // Add active class to clicked button
    button.classList.add("active");

    // Filter cards
    const grid = document.getElementById(`${section}-grid`);
    const cards = grid.querySelectorAll(".card, .experience-card");

    cards.forEach((card) => {
      if (
        filter === "all" ||
        card.getAttribute("data-category").includes(filter)
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
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
