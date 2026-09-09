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

    document
      .querySelectorAll(`.filter-btn[data-section="${section}"]`)
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    const grid = document.getElementById(`${section}-grid`);
    const cards = grid.querySelectorAll(".card, .experience-card");

    cards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";
      card.style.display = filter === "all" || categories.includes(filter) ? "flex" : "none";
    });
  });
});

// Section navigation
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  document.querySelectorAll(".section-nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (window.event?.target) {
    window.event.target.classList.add("active");
  }

  window.scrollTo({
    top: section.offsetTop - 80,
    behavior: "smooth",
  });
}

// Project details modal
const projectCards = document.querySelectorAll("#projects-grid .card");
let lastFocusedElement = null;

if (projectCards.length) {
  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.className = "project-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="project-modal-backdrop" data-modal-close></div>
    <div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button class="project-modal-close" type="button" aria-label="Close project details" data-modal-close>&times;</button>
      <div class="project-modal-image-wrap">
        <img class="project-modal-image" src="" alt="" />
      </div>
      <div class="project-modal-body">
        <div class="project-modal-tags"></div>
        <h2 id="project-modal-title"></h2>
        <p class="project-modal-date"></p>
        <p class="project-modal-description"></p>
        <div class="project-modal-links"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector(".project-modal-image");
  const modalTags = modal.querySelector(".project-modal-tags");
  const modalTitle = modal.querySelector("#project-modal-title");
  const modalDate = modal.querySelector(".project-modal-date");
  const modalDescription = modal.querySelector(".project-modal-description");
  const modalLinks = modal.querySelector(".project-modal-links");
  const modalCloseButton = modal.querySelector(".project-modal-close");

  function openProjectModal(card) {
    const image = card.querySelector(".card-image img");
    const tags = card.querySelector(".card-tags");
    const title = card.querySelector("h3");
    const date = card.querySelector(".card-date");
    const description = Array.from(card.querySelectorAll(".card-content > p")).find(
      (paragraph) => !paragraph.classList.contains("card-date")
    );
    const links = card.querySelector(".card-links");

    modalImage.src = image?.src || "";
    modalImage.alt = image?.alt || title?.textContent.trim() || "Project image";
    modalTitle.textContent = title?.textContent.trim() || "Project details";
    modalDate.textContent = date?.textContent.trim() || "";
    modalDescription.textContent = description?.textContent.trim() || "";

    modalTags.replaceChildren();
    if (tags) {
      Array.from(tags.children).forEach((tag) => modalTags.appendChild(tag.cloneNode(true)));
    }

    modalLinks.replaceChildren();
    if (links && links.children.length) {
      Array.from(links.children).forEach((link) => modalLinks.appendChild(link.cloneNode(true)));
      modalLinks.hidden = false;
    } else {
      modalLinks.hidden = true;
    }

    lastFocusedElement = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalCloseButton.focus();
  }

  function closeProjectModal() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus();
  }

  projectCards.forEach((card) => {
    card.classList.add("project-card");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const title = card.querySelector("h3")?.textContent.trim() || "project";
    card.setAttribute("aria-label", `View details for ${title}`);

    const cardContent = card.querySelector(".card-content");
    if (cardContent && !cardContent.querySelector(".project-open-hint")) {
      const hint = document.createElement("span");
      hint.className = "project-open-hint";
      hint.innerHTML = 'View details <span aria-hidden="true">&#8599;</span>';
      cardContent.appendChild(hint);
    }

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openProjectModal(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeProjectModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectModal();
  });
}
