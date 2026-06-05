/* ================================
   Mobile Navigation Menu
================================ */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuToggle && navMenu) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});


/* ================================
   Smooth Scroll Offset for Fixed Header
================================ */

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      event.preventDefault();

      const targetSection = document.querySelector(targetId);
      const header = document.querySelector(".header");

      if (targetSection && header) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});


/* ================================
   Simple Scroll Reveal Animation
================================ */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ================================
   Show Success or Error Messages
   After PHP Redirect
================================ */

const confirmationMessage = document.getElementById("confirmation-message");
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("success") === "appointment" && confirmationMessage) {
  confirmationMessage.style.display = "block";
  confirmationMessage.textContent = "Your appointment request has been submitted successfully. Please wait for confirmation.";

  confirmationMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

if (urlParams.get("success") === "contact") {
  alert("Thank you! Your message has been sent successfully.");
}

if (urlParams.get("error")) {
  const errorType = urlParams.get("error");

  if (errorType === "missing_fields") {
    alert("Please complete all required appointment fields.");
  } else if (errorType === "appointment_failed") {
    alert("Appointment submission failed. Please try again.");
  } else if (errorType === "contact_missing") {
    alert("Please complete all contact form fields.");
  } else if (errorType === "invalid_email") {
    alert("Please enter a valid email address.");
  } else if (errorType === "contact_failed") {
    alert("Contact message submission failed. Please try again.");
  } else {
    alert("Something went wrong. Please try again.");
  }
}