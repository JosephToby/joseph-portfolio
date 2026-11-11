/* =========================================
   JOSEPH TOBY — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const progressBar = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");
    const typingElement = document.getElementById("typing");

    // MOBILE NAVIGATION
    function closeMenu() {
        navLinks.classList.remove("open");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.setAttribute("aria-label", "Open navigation");
    }

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuBtn.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navItems.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // TYPING ANIMATION
    const roles = [
        "Python Developer",
        "AI & ML Enthusiast",
        "Flutter Developer",
        "Data Analytics Explorer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingElement.textContent = currentRole.substring(
            0,
            characterIndex
        );

        let delay = deleting ? 45 : 85;

        if (!deleting && characterIndex === currentRole.length) {
            deleting = true;
            delay = 1500;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();

    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element, index) => {
        element.style.transitionDelay =
            `${(index % 4) * 100}ms`;

        revealObserver.observe(element);
    });

    // SCROLL EFFECTS
    function handleScroll() {
        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width = `${progress}%`;

        // Header background
        header.classList.toggle("scrolled", scrollTop > 40);

        // Back to top visibility
        backToTop.classList.toggle("show", scrollTop > 500);

        // Active navigation
        updateActiveNavigation();
    }

    // ACTIVE NAVIGATION
    function updateActiveNavigation() {
        const sections = document.querySelectorAll("main section[id]");
        let currentSection = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();

    // BACK TO TOP
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // DYNAMIC COPYRIGHT YEAR
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});