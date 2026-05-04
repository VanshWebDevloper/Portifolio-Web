document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const navLinks = document.querySelectorAll("[data-nav]");
  const currentPage = body.dataset.page;

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(`${currentPage}.html`)) {
      link.classList.add("active");
    }
  });

  const revealEls = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));

  const skillBars = document.querySelectorAll("[data-progress]");
  skillBars.forEach((bar) => {
    const value = bar.getAttribute("data-progress");
    if (value) bar.style.width = value + "%";
  });

  const projectCards = document.querySelectorAll("[data-project]");
  const filterButtons = document.querySelectorAll("[data-filter]");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        card.style.display = show ? "block" : "none";
      });
    });
  });

  const modal = document.querySelector(".modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalDesc = document.querySelector("#modal-desc");
  const closeModalBtn = document.querySelector("[data-close-modal]");

  function openModal(title, desc) {
    if (!modal) return;
    modal.style.display = "flex";
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.title || "Project", btn.dataset.desc || "Project details here.");
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
});