
// ========================================
// JOSEPH TOBY - PORTFOLIO JAVASCRIPT
// ========================================


// 1. MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';

    menuBtn.setAttribute("aria-expanded", isOpen);

});


// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.setAttribute("aria-expanded", "false");

    });

});


// 2. TYPING ANIMATION

const typingElement = document.getElementById("typing");

const roles = [
    "Python Developer",
    "Data Science Enthusiast",
    "AI Explorer",
    "Flutter Developer",
    "Data Analyst"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typingEffect() {

    const currentRole = roles[roleIndex];

    typingElement.textContent =
        currentRole.substring(0, characterIndex);

    if (!deleting) {

        characterIndex++;

        if (characterIndex > currentRole.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);
            return;

        }

    } else {

        characterIndex--;

        if (characterIndex < 0) {

            characterIndex = 0;
            deleting = false;

            roleIndex = (roleIndex + 1) % roles.length;

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 45 : 90
    );

}

typingEffect();


// 3. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


// 4. PROJECT FILTERING

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(card => {

            const category = card.dataset.category;

            const matches =
                filter === "all" || category === filter;

            card.classList.toggle("hidden", !matches);

        });

    });

});


// 5. SCROLL PROGRESS BAR

const progressBar =
    document.getElementById("scrollProgress");

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = progress + "%";

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


// 6. BACK TO TOP BUTTON

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}, { passive: true });

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// 7. ACTIVE NAVIGATION ON SCROLL

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks =
    document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navigationLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + currentId
                    );

                });

            }

        });

    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

sections.forEach(section => {

    sectionObserver.observe(section);

});


// 8. AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// 9. PROFILE IMAGE FALLBACK

const profilePhoto = document.querySelector(".profile-photo");

profilePhoto.addEventListener("error", () => {

    profilePhoto.style.display = "none";

    document.getElementById(
        "profileFallback"
    ).style.display = "grid";

});


// 10. PREVENT EMPTY PLACEHOLDER LINKS

document.querySelectorAll('a[href*="YOUR_"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        alert("Please add your actual profile or contact link.");

    });

});
