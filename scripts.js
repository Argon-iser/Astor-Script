document.addEventListener("DOMContentLoaded", function () {
  // Custom Cursor
  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Hide cursor when it leaves the window
    document.addEventListener("mouseout", () => {
      cursor.style.display = "none";
    });

    document.addEventListener("mouseover", () => {
      cursor.style.display = "block";
    });

    // Add special effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, .service-card, .price-card"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseover", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursor.style.opacity = "0.8";
      });

      element.addEventListener("mouseout", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.opacity = "1";
      });
    });
  }

  // Mobile Navigation
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("active");

      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      // Burger Animation
      burger.classList.toggle("toggle");
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        burger.classList.remove("toggle");
        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      });
    });
  }

  // Sticky Navigation on Scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 0);
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Pricing Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked button and corresponding content
        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        if (tabId) {
          const tabContent = document.getElementById(tabId);
          if (tabContent) tabContent.classList.add("active");
        }
      });
    });
  }

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (testimonialCards.length > 0) {
    let currentIndex = 0;

    function showTestimonial(index) {
      testimonialCards.forEach((card) => card.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      testimonialCards[index].classList.add("active");
      dots[index].classList.add("active");
      currentIndex = index;
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showTestimonial(index);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + testimonialCards.length) %
          testimonialCards.length;
        showTestimonial(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
      });
    }

    // Auto-rotate testimonials
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      showTestimonial(currentIndex);
    }, 5000);
  }

  // FAQ Accordion - Fixed Version
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");
      const answer = button.nextElementSibling;

      // Toggle active class and answer visibility
      button.classList.toggle("active");
      answer.classList.toggle("show");

      // Rotate icon
      if (icon) {
        icon.style.transform = button.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0deg)";
      }

      // Close other FAQs (optional - remove this if you want multiple open)
      faqQuestions.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
          otherButton.nextElementSibling.classList.remove("show");
          const otherIcon = otherButton.querySelector("i");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });
    });
  });

  // Form Submission
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Here you would typically send the data to your server
      console.log("Form submitted:", data);

      // Show success message
      alert(
        "Thank you for your order! We'll contact you shortly to discuss the details."
      );
      this.reset();
    });
  }

  // Google Forms Integration
  const formContainer = document.getElementById("form-container");

  if (formContainer) {
    // Replace with your actual Google Form embed code
    const googleFormHTML = `             
      <iframe 
        src="GOOGLE_FORM_URL" 
        width="100%" 
        height="700" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0">
        Loading…
      </iframe>
    `;
    formContainer.innerHTML = googleFormHTML;
  }

  // Scroll Reveal Animation
  if (typeof ScrollReveal !== "undefined") {
    const scrollReveal = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 1000,
      delay: 200,
      reset: true,
    });

    scrollReveal.reveal(
      ".service-card, .price-card, .feature-item, .testimonial-card, .faq-item",
      {
        interval: 200,
      }
    );

    scrollReveal.reveal(".hero-content, .about-content, .order-form", {
      origin: "left",
    });

    scrollReveal.reveal(".hero-image, .about-image, .order-image", {
      origin: "right",
    });
  }

  // Pricing section animation
  const priceBadge = document.querySelector(".price-badge");

  if (priceBadge) {
    priceBadge.addEventListener("mouseover", function () {
      this.classList.add("price-pulse");
    });

    priceBadge.addEventListener("mouseout", function () {
      this.classList.remove("price-pulse");
    });
  }
});
