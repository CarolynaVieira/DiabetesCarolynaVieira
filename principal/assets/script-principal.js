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

const conditionItems = document.querySelectorAll(".condition-item");

if (conditionItems.length) {
  const setConditionOpen = (item, isOpen) => {
    const button = item.querySelector(".condition-trigger");
    const panel = item.querySelector(".condition-panel");
    const toggle = item.querySelector(".condition-toggle");

    if (!button || !panel) {
      return;
    }

    item.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    panel.setAttribute("aria-hidden", String(!isOpen));
    panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : "0px";

    if (toggle) {
      toggle.textContent = isOpen ? "–" : "+";
    }
  };

  const closeConditionItems = (activeItem) => {
    conditionItems.forEach((item) => {
      if (item !== activeItem) {
        setConditionOpen(item, false);
      }
    });
  };

  conditionItems.forEach((item) => {
    const button = item.querySelector(".condition-trigger");

    if (!button) {
      return;
    }

    setConditionOpen(item, false);

    button.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("is-open");
      closeConditionItems(item);
      setConditionOpen(item, shouldOpen);
    });
  });

  window.addEventListener("resize", () => {
    conditionItems.forEach((item) => {
      if (item.classList.contains("is-open")) {
        setConditionOpen(item, true);
      }
    });
  });
}

const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length) {
  const setFaqOpen = (item, isOpen) => {
    const button = item.querySelector(".faq-question");
    const panel = item.querySelector(".faq-panel");

    if (!button || !panel) {
      return;
    }

    item.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    panel.setAttribute("aria-hidden", String(!isOpen));
    panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : "0px";
  };

  const closeFaqs = (activeItem) => {
    faqItems.forEach((item) => {
      if (item !== activeItem) {
        setFaqOpen(item, false);
      }
    });
  };

  const setupFaqInitialState = () => {
    faqItems.forEach((item) => setFaqOpen(item, false));
  };

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("is-open");
      closeFaqs(item);
      setFaqOpen(item, shouldOpen);
    });
  });

  setupFaqInitialState();

  window.addEventListener("resize", () => {
    faqItems.forEach((item) => {
      if (item.classList.contains("is-open")) {
        setFaqOpen(item, true);
      }
    });
  });
}

const testimonialsTrack = document.querySelector("[data-testimonials-carousel]");
const testimonialsMobile = window.matchMedia("(max-width: 768px)");

if (testimonialsTrack) {
  const testimonialCards = Array.from(testimonialsTrack.querySelectorAll(".testimonial-card"));
  const prevButton = document.querySelector(".testimonials-prev");
  const nextButton = document.querySelector(".testimonials-next");
  const testimonialDots = Array.from(document.querySelectorAll(".testimonials-dot"));
  let activeTestimonial = 0;
  let testimonialScrollFrame = null;

  const setActiveTestimonial = (index) => {
    activeTestimonial = Math.max(0, Math.min(index, testimonialCards.length - 1));

    testimonialDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeTestimonial);
    });

    if (prevButton) {
      prevButton.disabled = activeTestimonial === 0;
    }

    if (nextButton) {
      nextButton.disabled = activeTestimonial === testimonialCards.length - 1;
    }
  };

  const scrollToTestimonial = (index) => {
    const card = testimonialCards[index];

    if (!card) {
      return;
    }

    const trackRect = testimonialsTrack.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const centeredLeft =
      testimonialsTrack.scrollLeft +
      cardRect.left -
      trackRect.left -
      (testimonialsTrack.clientWidth - cardRect.width) / 2;

    testimonialsTrack.scrollTo({
      left: centeredLeft,
      behavior: testimonialsMobile.matches ? "smooth" : "auto",
    });

    setActiveTestimonial(index);
  };

  const updateActiveTestimonial = () => {
    const trackRect = testimonialsTrack.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    const nearestIndex = testimonialCards.reduce((closestIndex, card, index) => {
      const cardRect = card.getBoundingClientRect();
      const currentDistance = Math.abs(cardRect.left + cardRect.width / 2 - trackCenter);
      const closestCard = testimonialCards[closestIndex];
      const closestRect = closestCard.getBoundingClientRect();
      const closestDistance = Math.abs(closestRect.left + closestRect.width / 2 - trackCenter);

      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);

    setActiveTestimonial(nearestIndex);
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      scrollToTestimonial(activeTestimonial - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      scrollToTestimonial(activeTestimonial + 1);
    });
  }

  testimonialsTrack.addEventListener("scroll", () => {
    if (testimonialScrollFrame) {
      cancelAnimationFrame(testimonialScrollFrame);
    }

    testimonialScrollFrame = requestAnimationFrame(updateActiveTestimonial);
  });

  setActiveTestimonial(0);

  window.addEventListener("resize", () => {
    scrollToTestimonial(activeTestimonial);
  });
}

const revealElements = document.querySelectorAll(".fade-in, .visual-reveal");

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

const floatingWhatsapp = document.querySelector(".floating-whatsapp");
const heroPrimaryCta = document.querySelector(".hero-actions .btn-primary");

if (floatingWhatsapp && heroPrimaryCta) {
  const toggleFloatingWhatsapp = (isHeroCtaVisible) => {
    floatingWhatsapp.classList.toggle("is-muted", isHeroCtaVisible);
  };

  if ("IntersectionObserver" in window) {
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        toggleFloatingWhatsapp(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      }
    );

    ctaObserver.observe(heroPrimaryCta);
  } else {
    toggleFloatingWhatsapp(true);
  }
}
