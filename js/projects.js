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

// Shared details modal for Projects + Experience
const detailCards = document.querySelectorAll(
  "#projects-grid .card, #experience-grid .experience-card"
);
let lastFocusedElement = null;

if (detailCards.length) {
  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.className = "project-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="project-modal-backdrop" data-modal-close></div>
    <div class="project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button class="project-modal-close" type="button" aria-label="Close details" data-modal-close>&times;</button>
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

  const modalImageWrap = modal.querySelector(".project-modal-image-wrap");
  const modalImage = modal.querySelector(".project-modal-image");
  const modalTags = modal.querySelector(".project-modal-tags");
  const modalTitle = modal.querySelector("#project-modal-title");
  const modalDate = modal.querySelector(".project-modal-date");
  const modalDescription = modal.querySelector(".project-modal-description");
  const modalLinks = modal.querySelector(".project-modal-links");
  const modalCloseButton = modal.querySelector(".project-modal-close");

  function getCardParts(card) {
    const isExperience = card.classList.contains("experience-card");
    const contentSelector = isExperience
      ? ".experience-card-content"
      : ".card-content";
    const imageSelector = isExperience
      ? ".experience-card-image img"
      : ".card-image img";

    const content = card.querySelector(contentSelector);
    const image = card.querySelector(imageSelector);
    const tags = content?.querySelector(".card-tags");
    const title = content?.querySelector("h3");
    const date = content?.querySelector(".card-date");
    const description = Array.from(content?.querySelectorAll(":scope > p") || []).find(
      (paragraph) => !paragraph.classList.contains("card-date")
    );
    const links = content?.querySelector(".card-links");

    return { content, image, tags, title, date, description, links, isExperience };
  }

  function openDetailsModal(card) {
    const { image, tags, title, date, description, links, isExperience } = getCardParts(card);
    const imageUrl = image?.src || "";

    modalImage.src = imageUrl;
    modalImage.alt = image?.alt || title?.textContent.trim() || "Detail image";
    modalImageWrap.style.backgroundImage = imageUrl
      ? `linear-gradient(rgba(2, 12, 27, 0.58), rgba(2, 12, 27, 0.72)), url("${imageUrl}")`
      : "none";

    modalTitle.textContent = title?.textContent.trim() || "Details";
    modalDate.textContent = date?.textContent.trim() || "";
    modalDescription.textContent = description?.textContent.trim() || "";

    modal.classList.toggle("experience-modal", isExperience);

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

    // Always start a newly opened item at the top of the content panel.
    modal.querySelector(".project-modal-body").scrollTop = 0;

    lastFocusedElement = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalCloseButton.focus();
  }

  function closeDetailsModal() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus();
  }

  detailCards.forEach((card) => {
    const { content, title, isExperience } = getCardParts(card);

    card.classList.add("detail-card");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const titleText = title?.textContent.trim() || (isExperience ? "experience" : "project");
    card.setAttribute("aria-label", `View details for ${titleText}`);

    if (content && !content.querySelector(".detail-open-hint")) {
      const hint = document.createElement("span");
      hint.className = "detail-open-hint";
      hint.innerHTML = 'View details <span aria-hidden="true">&#8599;</span>';
      content.appendChild(hint);
    }

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      openDetailsModal(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetailsModal(card);
      }
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeDetailsModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetailsModal();
  });
}
