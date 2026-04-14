// script.js

document.documentElement.classList.add("js-ready");

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you soon.");
        this.reset();
    });
}

// Navigation: glass bar strengthens on scroll
function updateNav() {
    const nav = document.querySelector("nav");
    if (!nav) return;
    nav.classList.toggle("nav-scrolled", window.scrollY > 48);
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// Mobile hamburger toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.classList.toggle("is-open");
        navLinks.classList.toggle("is-open", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);
        navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            navToggle.classList.remove("is-open");
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open menu");
        }
    });
}

// Scroll-triggered section reveals
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (prefersReducedMotion) {
        revealEls.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealEls.forEach((el) => observer.observe(el));
}

initReveal();
