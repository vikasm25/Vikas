// Search and filters shared by the Projects and Publications pages.
const catalogSearch = document.querySelector("[data-catalog-search]");
const catalogSections = [...document.querySelectorAll("[data-catalog-section]")];
const countLabel = document.querySelector("[data-result-count]");
const filterButtons = [...document.querySelectorAll("[data-project-filter]")];
let activeFilter = "all";

function updateCatalog() {
  const query = catalogSearch?.value.trim().replace(/\s+/g, " ").toLocaleLowerCase() || "";
  let total = 0;

  catalogSections.forEach((section) => {
    let visible = 0;
    section.querySelectorAll(".searchable-entry").forEach((entry) => {
      const matchesText = entry.textContent.replace(/\s+/g, " ").toLocaleLowerCase().includes(query);
      const categories = (entry.dataset.category || "").split(" ");
      const matchesCategory = section.id !== "projects" || activeFilter === "all" || categories.includes(activeFilter);
      entry.hidden = !(matchesText && matchesCategory);
      if (!entry.hidden) visible += 1;
    });
    section.querySelector(".empty-state")?.classList.toggle("is-visible", visible === 0);
    total += visible;
  });

  if (countLabel) countLabel.textContent = `${total} ${total === 1 ? "result" : "results"}`;
}

catalogSearch?.addEventListener("input", updateCatalog);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.projectFilter;
    filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    updateCatalog();
  });
});
updateCatalog();

// The Projects page uses one dialog for all project and experience cards.
const dialog = document.querySelector("#detail-dialog");
if (dialog) {
  const closeButton = dialog.querySelector(".dialog-close");
  let opener = null;

  document.querySelectorAll("[data-open-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".searchable-entry");
      const imageSrc = card.dataset.imageSrc;
      const dialogImage = dialog.querySelector(".dialog-image");
      const sourceLinks = card.querySelectorAll(".work-card-bottom a:not([hidden])");
      opener = button;

      dialog.querySelector("#dialog-title").textContent = card.querySelector("h3").textContent;
      dialog.querySelector("#dialog-kind").textContent = card.closest("#projects") ? "Project Details" : "Experience Details";
      dialog.querySelector("#dialog-tag").textContent = card.querySelector(".pill")?.textContent || "";
      dialog.querySelector("#dialog-date").textContent = card.querySelector("time")?.textContent || "";
      dialog.querySelector("#dialog-description").textContent = card.querySelector(".work-detail")?.textContent || "";
      dialog.classList.toggle("no-image", !imageSrc);
      if (imageSrc) {
        dialogImage.src = imageSrc;
        dialogImage.alt = card.dataset.imageAlt || "";
      } else {
        dialogImage.removeAttribute("src");
        dialogImage.alt = "";
      }

      const links = dialog.querySelector("#dialog-links");
      links.replaceChildren();
      sourceLinks.forEach((sourceLink) => {
        const link = sourceLink.cloneNode(true);
        link.className = "button secondary";
        links.appendChild(link);
      });
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    opener?.focus();
  });
}
