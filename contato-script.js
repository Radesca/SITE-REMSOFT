document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector(".header")
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50)
    })
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
  }

  // Form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const message = document.getElementById("message").value
      const privacy = document.getElementById("privacy").checked

      if (!name || !email || !phone || !message || !privacy) {
        showFormMessage("Por favor, preencha todos os campos obrigatórios.", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showFormMessage("Por favor, insira um endereço de e-mail válido.", "error")
        return
      }

      // Phone validation (simple Brazilian format)
      const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/
      if (!phoneRegex.test(phone)) {
        showFormMessage("Por favor, insira um número de telefone válido.", "error")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector("button[type='submit']")
      const originalBtnText = submitBtn.innerHTML

      submitBtn.disabled = true
      submitBtn.innerHTML = "<span>Enviando...</span>"

      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset()

        // Show success message
        showFormMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")

        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = originalBtnText
      }, 2000)
    })
  }

  // Function to show form messages
  function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create message element
    const messageElement = document.createElement("div")
    messageElement.className = `form-message ${type}`
    messageElement.textContent = message

    // Add message to form
    contactForm.appendChild(messageElement)

    // Auto remove after 5 seconds
    setTimeout(() => {
      messageElement.classList.add("fade-out")
      setTimeout(() => {
        messageElement.remove()
      }, 500)
    }, 5000)
  }

  // Phone input mask
  const phoneInput = document.getElementById("phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")

      if (value.length > 0) {
        // Format as (XX) XXXXX-XXXX
        if (value.length <= 2) {
          value = `(${value}`
        } else if (value.length <= 7) {
          value = `(${value.substring(0, 2)}) ${value.substring(2)}`
        } else if (value.length <= 11) {
          value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`
        } else {
          value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`
        }
      }

      e.target.value = value
    })
  }

  // Tilt effect for contact cards
  const contactCards = document.querySelectorAll(".contact-card")
  contactCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const { width, height } = rect
      const rotateX = ((y - height / 2) / (height / 2)) * -5
      const rotateY = ((x - width / 2) / (width / 2)) * 5
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
      this.style.transition = "transform 0.1s ease-out"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      this.style.transition = "transform 0.3s ease-out"
    })
  })

  // Map points animation
  const mapPoints = document.querySelectorAll(".map-point")
  mapPoints.forEach((point, index) => {
    // Stagger animation start
    setTimeout(() => {
      const pulse = point.querySelector(".map-point-pulse")
      if (pulse) {
        pulse.style.animationDelay = `${index * 0.5}s`
      }
    }, 100)
  })

  // Intersection Observer for fade-in animations
  const animatedElements = document.querySelectorAll(
    ".section-header, .contact-card, .contact-form-container, .map-container, .hero-content-page > *",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((el) => {
    el.classList.add("fade-in-element")
    observer.observe(el)
  })

  // Update current year in footer
  const currentYearSpan = document.getElementById("currentYear")
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  // Magnetic Effect for specified items
  const magneticItems = document.querySelectorAll(".magnetic-item")
  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      this.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px) scale(1.03)`
      this.style.transition = "transform 0.1s ease-out"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0,0) scale(1)"
      this.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return; // Don't prevent default for empty hash
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  })

  // Error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      console.warn(`Failed to load image: ${this.src}`)
      // Optionally set a fallback image
      // this.src = '/path/to/fallback-image.jpg'
    })
  })
})
