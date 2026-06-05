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

const faqItems = document.querySelectorAll(".faq-item");
const faqDesktop = window.matchMedia("(min-width: 769px)");

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

    if (faqDesktop.matches) {
      setFaqOpen(faqItems[0], true);
    }
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

  if (typeof faqDesktop.addEventListener === "function") {
    faqDesktop.addEventListener("change", setupFaqInitialState);
  } else if (typeof faqDesktop.addListener === "function") {
    faqDesktop.addListener(setupFaqInitialState);
  }

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

    const left = card.offsetLeft - testimonialsTrack.offsetLeft;

    testimonialsTrack.scrollTo({
      left,
      behavior: testimonialsMobile.matches ? "smooth" : "auto",
    });

    setActiveTestimonial(index);
  };

  const updateActiveTestimonial = () => {
    const trackLeft = testimonialsTrack.scrollLeft;
    const nearestIndex = testimonialCards.reduce((closestIndex, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - testimonialsTrack.offsetLeft - trackLeft);
      const closestCard = testimonialCards[closestIndex];
      const closestDistance = Math.abs(closestCard.offsetLeft - testimonialsTrack.offsetLeft - trackLeft);

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
