document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const navLinks = document.querySelectorAll("[data-nav]");
  const currentPage = body.dataset.page;

  // --- NEW: Interactive Logo Bounce & 5-Sec Pop-up Integration ---
  const logo = document.getElementById('interactive-logo');
  const logoMark = logo ? logo.querySelector('.brand-mark-custom') : null;
  const popup = document.getElementById('logo-popup');
  let isLogoAnimating = false;

  if (logo && logoMark && popup) {
    logo.addEventListener('click', (e) => {
      e.preventDefault(); // Click par page unexpected jump nahi karega
      
      if (isLogoAnimating) return;
      isLogoAnimating = true;

      // Click hote hi 3D Bounce aur Matrix Shine classes activate ho jayengi
      logoMark.classList.add('shine-active', 'bounce-active');
      popup.classList.add('show');

      // 600ms mein logo physics normal position par settle ho jayegi
      setTimeout(() => {
        logoMark.classList.remove('shine-active', 'bounce-active');
      }, 600);

      // Yeh exact 5 seconds (5000ms) tak bubble pop-up ko hold karke rakhega
      setTimeout(() => {
        popup.classList.remove('show');
        isLogoAnimating = false; // 5 seconds baad click cycle reset ho jayega
      }, 5000);
    });
  }

  // --- Mobile Navigation Toggle ---
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
  }

  // --- Active Link Highlighter ---
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(`${currentPage}.html`)) {
      link.classList.add("active");
    }
  });

  // --- Native Intersection Observer (Fade-up on Scroll) ---
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

  // --- Dynamic Skill Bars Leveling ---
  const skillBars = document.querySelectorAll("[data-progress]");
  skillBars.forEach((bar) => {
    const value = bar.getAttribute("data-progress");
    if (value) bar.style.width = value + "%";
  });

  // --- Portfolio Filtering System ---
  const projectCards = document.querySelectorAll("[data-project]");
  const filterButtons = document.querySelectorAll("[data-filter]");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.add("active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        card.style.display = show ? "block" : "none";
      });
    });
  });

  // --- Portfolio Advanced Modals System ---
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
