document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (!href.startsWith("#")) return // Allow normal navigation for non-anchor links
      
      e.preventDefault()
      const targetSection = document.querySelector(href)
      const header = document.querySelector(".header")
      const headerHeight = header ? header.offsetHeight : 0

      if (targetSection) {
        const targetPosition = targetSection.offsetTop - headerHeight
        window.scrollTo({ top: targetPosition, behavior: "smooth" })

        const navMenu = document.querySelector(".nav-menu")
        const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          if (mobileMenuToggle) mobileMenuToggle.classList.remove("active")
        }
      }
    })
  })

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

  // Tilt Effect for service cards
  const tiltItems = document.querySelectorAll(".tilt-item")
  tiltItems.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const { width, height } = rect
      const rotateX = ((y - height / 2) / (height / 2)) * -7
      const rotateY = ((x - width / 2) / (width / 2)) * 7
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    })
    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    })
  })

  // Function to initialize a carousel
  function initCarousel(carouselSelector, trackSelector, prevBtnSelector, nextBtnSelector, indicatorsSelector, config) {
    const carouselWrapper = document.querySelector(carouselSelector)
    if (!carouselWrapper) return

    const track = carouselWrapper.querySelector(trackSelector)
    const prevBtn = document.querySelector(prevBtnSelector) // Mudança aqui - busca global
    const nextBtn = document.querySelector(nextBtnSelector) // Mudança aqui - busca global
    const indicatorsContainer = carouselWrapper.querySelector(indicatorsSelector)

    if (!track) return
    const items = Array.from(track.children)
    if (items.length === 0) return

    let currentIndex = 0
    let itemsPerView = typeof config.itemsPerView === "function" ? config.itemsPerView() : config.itemsPerView

    function getItemWidth() {
      if (items.length === 0) return 0
      const itemRect = items[0].getBoundingClientRect()
      const gap = config.gap || 0
      return itemRect.width + gap
    }

    const calculateTotalSlides = () => {
      return items.length > 0 ? Math.ceil(items.length / itemsPerView) : 0
    }

    let totalSlides = calculateTotalSlides()

    function updateCarouselDimensions() {
      itemsPerView = typeof config.itemsPerView === "function" ? config.itemsPerView() : config.itemsPerView
      totalSlides = calculateTotalSlides()

      // Reset currentIndex if it's out of bounds
      if (currentIndex >= totalSlides) {
        currentIndex = Math.max(0, totalSlides - 1)
      }

      goToSlide(currentIndex)
      updateIndicators()
      updateButtons()
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1))
      const itemWidth = getItemWidth()

      if (itemWidth > 0) {
        const translateX = -(currentIndex * itemWidth * itemsPerView)
        track.style.transform = `translateX(${translateX}px)`
      }

      updateIndicators()
      updateButtons()
    }

    function updateIndicators() {
      if (!indicatorsContainer) return
      indicatorsContainer.innerHTML = ""

      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement("button")
        indicator.classList.add("indicator")
        if (i === currentIndex) indicator.classList.add("active")
        indicator.setAttribute("aria-label", `Ir para slide ${i + 1}`)
        indicator.addEventListener("click", () => goToSlide(i))
        indicatorsContainer.appendChild(indicator)
      }
    }

    function updateButtons() {
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1"
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex >= totalSlides - 1 || totalSlides === 0
        nextBtn.style.opacity = currentIndex >= totalSlides - 1 || totalSlides === 0 ? "0.5" : "1"
      }
    }

    // Event listeners for buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (currentIndex > 0) {
          goToSlide(currentIndex - 1)
        }
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (currentIndex < totalSlides - 1) {
          goToSlide(currentIndex + 1)
        }
      })
    }

    // Initialize carousel
    updateCarouselDimensions()

    // Add resize listener
    window.addEventListener("resize", debounce(updateCarouselDimensions, 200))

    // Return carousel control object
    return {
      goToSlide,
      getCurrentIndex: () => currentIndex,
      getTotalSlides: () => totalSlides,
    }
  }

  // Debounce function
  function debounce(func, delay) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), delay)
    }
  }

  // Carousel Configurations
  const getCasesItemsPerView = () => (window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3)
  const getTestimonialsItemsPerView = () => (window.innerWidth <= 1024 ? 1 : 2)

  // Initialize carousels
  const casesCarousel = initCarousel(
    ".cases-carousel-wrapper",
    ".cases-carousel-track",
    ".cases-prev-btn",
    ".cases-next-btn",
    ".cases-indicators",
    {
      itemsPerView: getCasesItemsPerView,
      gap: 32, // 2rem em pixels
    },
  )

  const testimonialsCarousel = initCarousel(
    ".testimonials-carousel-wrapper",
    ".testimonials-carousel-track",
    ".testimonials-prev-btn",
    ".testimonials-next-btn",
    ".testimonials-indicators",
    {
      itemsPerView: getTestimonialsItemsPerView,
      gap: 32, // 2rem em pixels
    },
  )

  // Update current year in footer
  const currentYearSpan = document.getElementById("currentYear")
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear()

  // Scroll to section helper
  window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    const headerEl = document.querySelector(".header")
    if (section) {
      const headerHeight = headerEl ? headerEl.offsetHeight : 0
      const targetPosition = section.offsetTop - headerHeight
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
  }

  // Intersection Observer for fade-in animations
  const animatedElements = document.querySelectorAll(
    ".section-header, .about-text, .about-image, .service-card, .product-card, .case-card, .testimonial-card, .blog-post-card, .contact-form-container, .contact-info-container, .stat-item, .hero-content > *:not(.hero-logo-image)",
  )
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          if (entry.target.classList.contains("stat-item")) {
            const statNumberEl = entry.target.querySelector(".stat-number")
            if (statNumberEl && !statNumberEl.dataset.animated) {
              animateCounter(statNumberEl)
              statNumberEl.dataset.animated = "true"
            }
          }
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  animatedElements.forEach((el) => {
    el.classList.add("fade-in-element")
    observer.observe(el)
  })

  // Hero logo animation
  const heroLogo = document.querySelector(".hero-logo-image")
  if (heroLogo) {
    heroLogo.classList.add("fade-in-element")
    heroLogo.style.transitionDelay = "0.2s"
    if (!Array.from(animatedElements).includes(heroLogo)) {
      observer.observe(heroLogo)
    }
  }

  // Stats Counter Animation
  function animateCounter(element) {
    const target = Number.parseInt(element.dataset.target)
    const isTime = element.textContent.includes("/7")
    let current = 0
    const duration = 2000
    const stepTime = 16
    const increment = target / (duration / stepTime)

    function update() {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current) + (isTime ? "/7" : element.textContent.includes("%") ? "%" : "+")
        requestAnimationFrame(update)
      } else {
        element.textContent = target + (isTime ? "/7" : element.textContent.includes("%") ? "%" : "+")
      }
    }
    update()
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("form-status")
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      formStatus.textContent = "Enviando mensagem..."
      formStatus.className = ""

      setTimeout(() => {
        if (Math.random() > 0.2) {
          formStatus.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve."
          formStatus.classList.add("success")
          contactForm.reset()
        } else {
          formStatus.textContent = "Ocorreu um erro ao enviar a mensagem. Tente novamente."
          formStatus.classList.add("error")
        }
      }, 1500)
    })
  }

  // Enhanced Background Animation Control
  function createParticleEffect() {
    const heroSection = document.querySelector(".hero-section")
    if (!heroSection) return

    // Create floating particles for extra tech feel
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div")
      particle.className = "tech-particle"
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(124, 121, 248, 0.6);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: particleFloat ${15 + Math.random() * 10}s infinite linear;
        z-index: 0;
      `
      heroSection.appendChild(particle)
    }

    // Add particle animation keyframes
    if (!document.querySelector("#particle-styles")) {
      const style = document.createElement("style")
      style.id = "particle-styles"
      style.textContent = `
        @keyframes particleFloat {
          0% { transform: translateY(100vh) translateX(0px) scale(0); opacity: 0; }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) scale(0); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }

  // Initialize particle effect
  createParticleEffect()

  // Performance optimization: Pause animations when not visible
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animatedElements = entry.target.querySelectorAll(
            ".circuit-circle, .animated-arrow, .line-3d, .code-element",
          )
          if (entry.isIntersecting) {
            animatedElements.forEach((el) => (el.style.animationPlayState = "running"))
          } else {
            animatedElements.forEach((el) => (el.style.animationPlayState = "paused"))
          }
        })
      },
      { threshold: 0.1 },
    )

    heroObserver.observe(heroSection)
  }
})
