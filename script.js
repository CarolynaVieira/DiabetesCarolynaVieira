const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const menuOverlay = document.querySelector(".mobile-menu-overlay");
const body = document.body;
const mobileBreakpoint = window.matchMedia("(max-width: 980px)");

if (menuToggle && siteNav && menuOverlay) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    siteNav.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  };

  const openMenu = () => {
    menuToggle.classList.add("is-open");
    siteNav.classList.add("is-open");
    menuOverlay.classList.add("is-open");
    body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  menuOverlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
      closeMenu();
    }
  });
}

const revealElements = document.querySelectorAll(".fade-in");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}
