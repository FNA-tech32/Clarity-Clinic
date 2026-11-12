window.addEventListener("load", () => {
  const page = document.getElementById("page");
  page.classList.remove("opacity-0", "translate-y-4");
  page.classList.add("opacity-100", "translate-y-0");
});

document.querySelectorAll("[data-link]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = e.currentTarget.getAttribute("href");
    const page = document.getElementById("page");

    // خروج ناعم
    page.classList.remove("opacity-100", "translate-y-0");
    page.classList.add("opacity-0", "-translate-y-4");

    // الانتقال بعد الأنيميشن
    setTimeout(() => {
      window.location.href = target;
    }, 400);
  });
});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const logo = document.getElementById("logo");
const menuIcon = document.getElementById("menuIcon");

function openMenu() {
  mobileMenu.classList.remove("-translate-y-full");
  overlay.classList.remove("hidden");
  menuIcon.classList.remove("fa-bars");
  menuIcon.classList.add("fa-xmark", "text-slate-900");
}

function closeMenuFn() {
  mobileMenu.classList.add("-translate-y-full");
  overlay.classList.add("hidden");
  menuIcon.classList.remove("fa-xmark", "text-slate-900");
  menuIcon.classList.add(
    "fa-bars",
    window.scrollY > 80 ? "text-slate-900" : "text-white"
  );
}

menuBtn.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFn);
overlay.addEventListener("click", closeMenuFn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("bg-white/90", "backdrop-blur-lg", "shadow-md");

    navLinks.classList.remove("text-white");
    navLinks.classList.add("text-slate-900");

    menuIcon.classList.remove("text-white");
    menuIcon.classList.add("text-sky-600");
  } else {
    navbar.classList.remove("bg-white/90", "backdrop-blur-lg", "shadow-md");

    navLinks.classList.remove("text-slate-900");
    navLinks.classList.add("text-white");

    menuIcon.classList.remove("text-slate-900");
    menuIcon.classList.add("text-white");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          "opacity-0",
          "translate-y-8",
          "translate-x-[-80px]",
          "translate-x-[80px]"
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".about-text, .about-images")
  .forEach((el) => observer.observe(el));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          "opacity-0",
          "-translate-y-10",
          "-translate-x-16",
          "translate-x-16",
          "translate-y-16"
        );
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

// Heading
document
  .querySelectorAll(".reveal-heading")
  .forEach((el) => revealObserver.observe(el));

// Cards
document
  .querySelectorAll(".reveal-left, .reveal-bottom, .reveal-right")
  .forEach((el) => revealObserver.observe(el));

document
  .querySelectorAll(".reveal-quote")
  .forEach((el) => observer.observe(el));

document
  .querySelectorAll(".reveal-equipment")
  .forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("opacity-0");
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.includes(".html")) {
      e.preventDefault();
      document.body.classList.add("opacity-0");
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    }
  });
});

// ===== Active Nav Link =====
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("[data-nav]").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();

  if (
    linkPage === currentPage ||
    (currentPage === "" && linkPage === "index.html")
  ) {
    link.classList.add(
      "text-sky-500",
      "font-semibold",
      "relative",
      "after:content-['']",
      "after:absolute",
      "after:left-0",
      "after:-bottom-1",
      "after:w-full",
      "after:h-[2px]",
      "after:bg-sky-500",
      "after:rounded-full"
    );
  } else {
    link.classList.add("text-slate-700", "hover:text-sky-400");
  }
});

const revealPricing = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-12");
        revealPricing.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".reveal-bottom")
  .forEach((el) => revealPricing.observe(el));

// ===== Team Reveal Animation =====
const teamObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-8", "scale-95");
        entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
        teamObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

document
  .querySelectorAll(".reveal-team")
  .forEach((card) => teamObserver.observe(card));

// ===== Appointment Modal Logic =====
function setupAppointmentModal() {
  const modal = document.getElementById("appointmentModal");
  if (!modal) return;

  const closeBtns = modal.querySelectorAll("[data-close-modal]");
  const modalForm = document.getElementById("appointmentForm");
  const formSuccess = document.getElementById("appointmentSuccess");

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    if (formSuccess && modalForm) {
      setTimeout(() => {
        formSuccess.classList.add("hidden");
        modalForm.classList.remove("hidden");
        modalForm.reset();
      }, 300);
    }
  };

  document.querySelectorAll('a[href="#"], [data-open-modal]').forEach((btn) => {
    const text = btn.textContent.trim().toLowerCase();
    if (
      text.includes("book") ||
      text.includes("appointment") ||
      btn.hasAttribute("data-open-modal")
    ) {
      btn.addEventListener("click", openModal);
    }
  });

  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalForm && formSuccess) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalForm.classList.add("hidden");
      formSuccess.classList.remove("hidden");
    });
  }
}

document.addEventListener("DOMContentLoaded", setupAppointmentModal);

