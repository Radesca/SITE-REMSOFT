document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Se o link contém #, é uma âncora na mesma página
      if (href.includes("#")) {
        e.preventDefault()
        const targetId = href.split("#")[1]
        const targetSection = document.querySelector(`#${targetId}`)
        const header = document.querySelector(".header")
        const headerHeight = header ? header.offsetHeight : 0

        if (targetSection) {
          const targetPosition = targetSection.offsetTop - headerHeight
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        } else if (href.includes("index.html#")) {
          // Se é um link para a página principal com âncora, redireciona
          window.location.href = href
        }

        // Fechar menu mobile se estiver aberto
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

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
  }

  // Team Carousel Functionality - VERSÃO CORRIGIDA
  const carousel = document.querySelector(".team-carousel")
  const slides = document.querySelectorAll(".team-slide")
  const prevBtn = document.querySelector(".carousel-prev")
  const nextBtn = document.querySelector(".carousel-next")
  const indicators = document.querySelectorAll(".indicator")

  let currentIndex = 0
  const totalSlides = slides.length
  let autoSlideInterval

  // Função para mover o carrossel - CORRIGIDA
  function moveToSlide(index) {
    console.log(`🎯 Movendo para slide ${index}`)

    // Garantir que o índice está dentro dos limites
    if (index < 0) index = totalSlides - 1
    if (index >= totalSlides) index = 0

    currentIndex = index

    // Remover classe active de todos os slides
    slides.forEach((slide, i) => {
      slide.classList.remove("active")
      if (i === currentIndex) {
        slide.classList.add("active")
      }
    })

    // Atualizar indicadores
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentIndex)
    })

    console.log(`✅ Slide ${currentIndex} ativo`)
  }

  function showSlide(index) {
    moveToSlide(index)
  }

  function nextSlide() {
    console.log(`➡️ Próximo slide: ${currentIndex} -> ${currentIndex + 1}`)
    moveToSlide(currentIndex + 1)
  }

  function prevSlide() {
    console.log(`⬅️ Slide anterior: ${currentIndex} -> ${currentIndex - 1}`)
    moveToSlide(currentIndex - 1)
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval)
    autoSlideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
    console.log("🔄 Auto-slide iniciado")
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval)
      console.log("⏸️ Auto-slide pausado")
    }
  }

  // Initialize carousel if elements exist
  if (carousel && slides.length > 0) {
    console.log(`✅ Carrossel encontrado com ${slides.length} slides`)

    // Set up event listeners
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("🖱️ Botão próximo clicado")
        nextSlide()
        stopAutoSlide()
        startAutoSlide() // Restart auto-slide after manual interaction
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("🖱️ Botão anterior clicado")
        prevSlide()
        stopAutoSlide()
        startAutoSlide() // Restart auto-slide after manual interaction
      })
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(`🖱️ Indicador ${index} clicado`)
        showSlide(index)
        stopAutoSlide()
        startAutoSlide() // Restart auto-slide after manual interaction
      })
    })

    // Pause auto-slide on hover
    carousel.addEventListener("mouseenter", stopAutoSlide)
    carousel.addEventListener("mouseleave", startAutoSlide)

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
        stopAutoSlide()
        startAutoSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
        stopAutoSlide()
        startAutoSlide()
      }
    })

    // Touch/swipe support for mobile
    let startX = 0
    let endX = 0

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    carousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      const diff = startX - endX

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          nextSlide() // Swipe left - next slide
        } else {
          prevSlide() // Swipe right - previous slide
        }
        stopAutoSlide()
        startAutoSlide()
      }
    })

    // Inicializar carrossel
    moveToSlide(0)
    startAutoSlide()
  } else {
    console.log("❌ Carrossel não encontrado ou sem slides")
  }

  // Interactive World Map Functionality
  const mapMarkers = document.querySelectorAll(".marker-group")
  const mapTooltip = createMapTooltip()

  function createMapTooltip() {
    const tooltip = document.createElement("div")
    tooltip.className = "map-tooltip"
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(28, 28, 28, 0.95);
      color: #f5f5f5;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-family: 'Raleway', sans-serif;
      border: 1px solid rgba(124, 121, 248, 0.3);
      backdrop-filter: blur(10px);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1000;
      max-width: 200px;
    `
    document.body.appendChild(tooltip)
    return tooltip
  }

  // Map marker interactions
  mapMarkers.forEach((marker) => {
    const location = marker.getAttribute("data-location")
    const projects = marker.getAttribute("data-projects")

    marker.addEventListener("mouseenter", (e) => {
      mapTooltip.innerHTML = `
        <strong>${location}</strong><br>
        <span style="color: #7c79f8;">${projects} projetos realizados</span>
      `
      mapTooltip.style.opacity = "1"
      updateTooltipPosition(e)
    })

    marker.addEventListener("mousemove", updateTooltipPosition)

    marker.addEventListener("mouseleave", () => {
      mapTooltip.style.opacity = "0"
    })

    marker.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(1.3)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)

      // Show detailed info (could expand to show modal)
      console.log(`Clicked on ${location} - ${projects} projects`)
    })
  })

  function updateTooltipPosition(e) {
    const x = e.clientX + 10
    const y = e.clientY - 10
    mapTooltip.style.left = x + "px"
    mapTooltip.style.top = y + "px"
  }

  // Animate continents on scroll
  const continents = document.querySelectorAll(".continent")
  const continentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = "continentPulse 6s ease-in-out infinite"
            entry.target.style.animationDelay = `${index * 0.5}s`
          }, index * 200)
        }
      })
    },
    { threshold: 0.3 },
  )

  continents.forEach((continent) => {
    continentObserver.observe(continent)
  })

  // Animate connection lines
  const connectionLines = document.querySelectorAll(".connection-line")
  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = "connectionFlow 3s linear infinite"
            entry.target.style.animationDelay = `${index * 0.3}s`
          }, index * 100)
        }
      })
    },
    { threshold: 0.3 },
  )

  connectionLines.forEach((line) => {
    lineObserver.observe(line)
  })

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
      this.style.transition = "transform 0.1s ease-out"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      this.style.transition = "transform 0.3s ease-out"
    })
  })

  // Update current year in footer
  const currentYearSpan = document.getElementById("currentYear")
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  // Intersection Observer for fade-in animations
  const animatedElements = document.querySelectorAll(
    ".section-header, .company-intro, .team-image-card, .value-card, .stat-detailed-item, .cta-content, .hero-content-page > *, .leader-card, .world-map-container, .global-stats, .project-timeline",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")

          // Animar contadores de estatísticas
          if (
            entry.target.classList.contains("stat-detailed-item") ||
            entry.target.classList.contains("global-stats")
          ) {
            const statNumbers = entry.target.querySelectorAll(".stat-number")
            statNumbers.forEach((statNumberEl) => {
              if (!statNumberEl.dataset.animated) {
                animateCounter(statNumberEl)
                statNumberEl.dataset.animated = "true"
              }
            })
          }

          // Animar marcadores do mapa
          if (entry.target.classList.contains("world-map-container")) {
            const markers = entry.target.querySelectorAll(".marker-group")
            markers.forEach((marker, index) => {
              setTimeout(() => {
                marker.style.animation = "markerPulse 2s ease-in-out infinite"
                marker.style.animationDelay = `${index * 0.2}s`
              }, index * 100)
            })

            // Animate info cards
            const infoCards = entry.target.querySelectorAll(".info-card")
            infoCards.forEach((card, index) => {
              setTimeout(
                () => {
                  card.style.animation = "floatUp 1s ease-out forwards"
                  card.style.animationDelay = `${index * 0.3}s`
                },
                500 + index * 200,
              )
            })
          }

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

  // Stats Counter Animation
  function animateCounter(element) {
    const target = Number.parseInt(element.dataset.target)
    const isTime = element.textContent.includes("/7")
    const isPercentage = element.textContent.includes("%")
    const isPlus = element.textContent.includes("+")

    // Ajuste a duração da animação com base no valor alvo
    // Valores maiores terão uma animação mais rápida por unidade
    const duration = target > 100 ? 3000 : 2000

    let current = 0
    const stepTime = 16
    const increment = target / (duration / stepTime)

    function update() {
      current += increment
      if (current < target) {
        let suffix = ""
        if (isTime) suffix = "/7"
        else if (isPercentage) suffix = "%"
        else if (isPlus) suffix = "+"

        element.textContent = Math.floor(current) + suffix
        requestAnimationFrame(update)
      } else {
        let suffix = ""
        if (isTime) suffix = "/7"
        else if (isPercentage) suffix = "%"
        else if (isPlus) suffix = "+"

        element.textContent = target + suffix
      }
    }
    update()
  }

  // Enhanced Background Animation Control
  function createParticleEffect() {
    const heroSection = document.querySelector(".hero-section-page")
    if (!heroSection) return

    // Create floating particles for extra tech feel
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement("div")
      particle.className = "tech-particle"
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(124, 121, 248, 0.4);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: particleFloat ${20 + Math.random() * 10}s infinite linear;
        z-index: 0;
        pointer-events: none;
      `
      heroSection.querySelector(".hero-background-elements").appendChild(particle)
    }

    // Add particle animation keyframes if not exists
    if (!document.querySelector("#particle-styles")) {
      const style = document.createElement("style")
      style.id = "particle-styles"
      style.textContent = `
        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) translateX(0px) scale(0); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
            transform: scale(1); 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) scale(0); 
            opacity: 0; 
          }
        }
      `
      document.head.appendChild(style)
    }
  }

  // Initialize particle effect
  createParticleEffect()

  // Performance optimization: Pause animations when not visible
  const sectionsWithAnimations = document.querySelectorAll("section")
  if (sectionsWithAnimations.length > 0) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animatedElements = entry.target.querySelectorAll(
            ".circuit-circle, .animated-arrow, .line-3d, .code-element, .bg-shape, .floating-particles",
          )
          if (entry.isIntersecting) {
            animatedElements.forEach((el) => {
              el.style.animationPlayState = "running"
            })
          } else {
            animatedElements.forEach((el) => {
              el.style.animationPlayState = "paused"
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionsWithAnimations.forEach((section) => {
      animationObserver.observe(section)
    })
  }

  // World Map Interactive Features
  const worldMapSvg = document.querySelector(".world-map-svg")
  if (worldMapSvg) {
    // Add interactive hover effects to continents
    const continentElements = worldMapSvg.querySelectorAll(".continent")
    continentElements.forEach((continent) => {
      continent.addEventListener("mouseenter", function () {
        this.style.fill = "rgba(124, 121, 248, 0.4)"
        this.style.stroke = "#7c79f8"
        this.style.strokeWidth = "2"
      })

      continent.addEventListener("mouseleave", function () {
        this.style.fill = "rgba(124, 121, 248, 0.2)"
        this.style.stroke = "rgba(124, 121, 248, 0.4)"
        this.style.strokeWidth = "1"
      })
    })

    // Add pulsing effect to data streams
    const dataPoints = worldMapSvg.querySelectorAll(".data-point")
    dataPoints.forEach((point, index) => {
      // Comentado para manter as bolinhas paradas
      // setTimeout(() => {
      //   point.style.animation = `markerGlow 1.5s ease-in-out infinite`
      //   point.style.animationDelay = `${index * 0.5}s`
      // }, 1000)
    })
  }

  // Timeline items animation
  const timelineItems = document.querySelectorAll(".timeline-item")
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = "fadeInFromBottom 0.8s ease-out forwards"
            entry.target.style.opacity = "1"
          }, index * 200)
        }
      })
    },
    { threshold: 0.3 },
  )

  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    timelineObserver.observe(item)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      console.warn(`Failed to load image: ${this.src}`)
      // Optionally set a fallback image
      // this.src = '/path/to/fallback-image.jpg'
    })
  })

  // Lazy loading for images (if needed)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Add dynamic background effects
  function addDynamicEffects() {
    const mapSection = document.querySelector(".global-presence-section")
    if (mapSection) {
      // Create floating data particles
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div")
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #7c79f8, #3533cd);
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: particleFloat ${15 + Math.random() * 10}s infinite linear;
          z-index: 1;
          pointer-events: none;
          box-shadow: 0 0 6px rgba(124, 121, 248, 0.6);
        `
        mapSection.querySelector(".section-background-elements").appendChild(particle)
      }
    }
  }

  // Initialize dynamic effects
  addDynamicEffects()

  // Add keyboard navigation for map
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusedMarker = document.activeElement
      if (focusedMarker && focusedMarker.classList.contains("marker-group")) {
        focusedMarker.style.transform = "scale(1.2)"
        setTimeout(() => {
          focusedMarker.style.transform = "scale(1)"
        }, 300)
      }
    }
  })

  // Make markers focusable for accessibility
  mapMarkers.forEach((marker) => {
    marker.setAttribute("tabindex", "0")
    marker.setAttribute("role", "button")
    marker.setAttribute(
      "aria-label",
      `${marker.getAttribute("data-location")} - ${marker.getAttribute("data-projects")} projetos`,
    )
  })

  // Enhanced Map Marker Interactions
  function setupEnhancedMapInteractions() {
    const mapMarkers = document.querySelectorAll(".marker-group")

    mapMarkers.forEach((marker) => {
      // Adiciona efeito de escala ao passar o mouse
      marker.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.2)"

        // Destaca as linhas de conexão relacionadas
        const markerX = Number.parseFloat(this.querySelector("circle").getAttribute("cx"))
        const markerY = Number.parseFloat(this.querySelector("circle").getAttribute("cy"))

        document.querySelectorAll(".connection-line").forEach((line) => {
          const x1 = Number.parseFloat(line.getAttribute("x1"))
          const y1 = Number.parseFloat(line.getAttribute("y1"))
          const x2 = Number.parseFloat(line.getAttribute("x2"))
          const y2 = Number.parseFloat(line.getAttribute("y2"))

          if (
            (Math.abs(x1 - markerX) < 10 && Math.abs(y1 - markerY) < 10) ||
            (Math.abs(x2 - markerX) < 10 && Math.abs(y2 - markerY) < 10)
          ) {
            line.style.stroke = "var(--secondary-light)"
            line.style.strokeWidth = "2"
            line.style.strokeDasharray = "2, 2"
          }
        })
      })

      marker.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)"

        // Restaura as linhas de conexão
        document.querySelectorAll(".connection-line").forEach((line) => {
          line.style.stroke = "rgba(var(--rgb-secondary-light), 0.4)"
          line.style.strokeWidth = "1"
          line.style.strokeDasharray = "5, 5"
        })
      })

      // Adiciona efeito de clique
      marker.addEventListener("click", function () {
        const location = this.getAttribute("data-location")
        const projects = this.getAttribute("data-projects")

        // Cria um popup com informações detalhadas
        showCountryPopup(location, projects, this)
      })
    })
  }

  // Função para mostrar popup com informações do país
  function showCountryPopup(country, projects, markerElement) {
    // Remove qualquer popup existente
    const existingPopup = document.querySelector(".country-popup")
    if (existingPopup) {
      existingPopup.remove()
    }

    // Obtém a posição do marcador
    const markerCircle = markerElement.querySelector("circle")
    const x = Number.parseFloat(markerCircle.getAttribute("cx"))
    const y = Number.parseFloat(markerCircle.getAttribute("cy"))

    // Cria o elemento popup
    const popup = document.createElement("div")
    popup.className = "country-popup"
    popup.innerHTML = `
      <h3>${country}</h3>
      <p><strong>${projects}</strong> projetos realizados</p>
      <button class="popup-close">×</button>
    `

    // Posiciona o popup
    const mapSvg = document.querySelector(".world-map-svg")
    const svgRect = mapSvg.getBoundingClientRect()
    const mapWrapper = document.querySelector(".world-map-wrapper")

    popup.style.cssText = `
      position: absolute;
      top: ${(y / 500) * svgRect.height}px;
      left: ${(x / 1000) * svgRect.width}px;
      transform: translate(-50%, -120%);
      background: rgba(var(--rgb-neutral-dark), 0.9);
      border: 1px solid var(--secondary-light);
      border-radius: 8px;
      padding: 1rem;
      z-index: 100;
      min-width: 150px;
      text-align: center;
      backdrop-filter: blur(10px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      animation: popupFadeIn 0.3s forwards;
    `

    mapWrapper.appendChild(popup)

    // Adiciona evento para fechar o popup
    popup.querySelector(".popup-close").addEventListener("click", () => {
      popup.remove()
    })

    // Fecha o popup ao clicar fora dele
    document.addEventListener("click", function closePopup(e) {
      if (!popup.contains(e.target) && !markerElement.contains(e.target)) {
        popup.remove()
        document.removeEventListener("click", closePopup)
      }
    })

    // Adiciona estilo para a animação
    const style = document.createElement("style")
    style.textContent = `
      @keyframes popupFadeIn {
        from { opacity: 0; transform: translate(-50%, -100%); }
        to { opacity: 1; transform: translate(-50%, -120%); }
      }
      .country-popup h3 {
        color: var(--secondary-light);
        margin-bottom: 0.5rem;
        font-family: var(--font-primary);
      }
      .country-popup p {
        margin: 0;
        font-family: var(--font-secondary);
      }
      .popup-close {
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        color: var(--neutral-light);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .popup-close:hover {
        background: rgba(var(--rgb-secondary-light), 0.2);
      }
    `
    document.head.appendChild(style)
  }

  // Inicializa as interações aprimoradas do mapa
  setupEnhancedMapInteractions()

  // Continent Cards and Modal Functionality
  function setupContinentCards() {
    const continentCards = document.querySelectorAll(".continent-card")
    const modal = document.getElementById("continent-modal")
    const modalClose = document.querySelector(".modal-close")
    const modalTitle = document.getElementById("modal-continent-title")
    const modalTotalProjects = document.getElementById("modal-total-projects")
    const modalTotalCountries = document.getElementById("modal-total-countries")
    const modalCountriesList = document.getElementById("modal-countries-list")

    // Dados dos continentes e países
    const continentData = {
      "south-america": {
        name: "América do Sul",
        icon: "🌎",
        countries: [
          { name: "Brasil", projects: 193, description: "Nosso maior mercado com presença consolidada" },
          { name: "Colômbia", projects: 2, description: "Expansão estratégica na região andina" },
          { name: "Argentina", projects: 1, description: "Entrada no mercado do cone sul" },
        ],
      },
      "north-america": {
        name: "América do Norte",
        icon: "🌎",
        countries: [
          { name: "Estados Unidos", projects: 1, description: "Mercado estratégico de alta tecnologia" },
          { name: "México", projects: 1, description: "Ponte para o mercado norte-americano" },
        ],
      },
      europe: {
        name: "Europa",
        icon: "🌍",
        countries: [{ name: "Espanha", projects: 1, description: "Porta de entrada para o mercado europeu" }],
      },
      asia: {
        name: "Ásia",
        icon: "🌏",
        countries: [
          { name: "China", projects: 1, description: "Maior mercado tecnológico mundial" },
          { name: "Sri Lanka", projects: 1, description: "Hub estratégico no sul da Ásia" },
        ],
      },
    }

    // Event listeners para os cards dos continentes
    continentCards.forEach((card) => {
      card.addEventListener("click", () => {
        const continent = card.getAttribute("data-continent")
        const data = continentData[continent]

        if (data) {
          showContinentModal(data)
        }
      })

      // Hover effect nos continentes do mapa
      card.addEventListener("mouseenter", () => {
        const continent = card.getAttribute("data-continent")
        const continentPath = document.querySelector(`.continent-${continent}`)
        if (continentPath) {
          continentPath.style.fill = "rgba(var(--rgb-secondary-light), 0.4)"
          continentPath.style.stroke = "var(--secondary-light)"
          continentPath.style.strokeWidth = "2"
        }
      })

      card.addEventListener("mouseleave", () => {
        const continent = card.getAttribute("data-continent")
        const continentPath = document.querySelector(`.continent-${continent}`)
        if (continentPath) {
          continentPath.style.fill = "rgba(var(--rgb-secondary-light), 0.2)"
          continentPath.style.stroke = "rgba(var(--rgb-secondary-light), 0.4)"
          continentPath.style.strokeWidth = "1"
        }
      })
    })

    // Função para mostrar o modal do continente
    function showContinentModal(data) {
      modalTitle.textContent = data.name

      // Calcular totais
      const totalProjects = data.countries.reduce((sum, country) => sum + country.projects, 0)
      const totalCountries = data.countries.length

      modalTotalProjects.textContent = totalProjects
      modalTotalCountries.textContent = totalCountries

      // Limpar e popular lista de países
      modalCountriesList.innerHTML = ""

      data.countries.forEach((country) => {
        const countryItem = document.createElement("div")
        countryItem.className = "country-item"
        countryItem.innerHTML = `
        <div class="country-info">
          <h4>${country.name}</h4>
          <p>${country.description}</p>
        </div>
        <div class="country-projects">
          <span class="project-number">${country.projects}</span>
          <span class="project-label">${country.projects === 1 ? "projeto" : "projetos"}</span>
        </div>
      `
        modalCountriesList.appendChild(countryItem)
      })

      // Mostrar modal
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }

    // Fechar modal
    function closeModal() {
      modal.classList.remove("active")
      document.body.style.overflow = "auto"
    }

    modalClose.addEventListener("click", closeModal)

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })

    // Fechar modal com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal()
      }
    })

    // Hover effect nos continentes do SVG
    const continentPaths = document.querySelectorAll(".continent")
    continentPaths.forEach((path) => {
      path.addEventListener("click", () => {
        const continentClass = Array.from(path.classList).find(
          (cls) => cls.startsWith("continent-") && cls !== "continent",
        )
        if (continentClass) {
          const continent = continentClass.replace("continent-", "")
          const data = continentData[continent]
          if (data) {
            showContinentModal(data)
          }
        }
      })
    })
  }

  // Inicializar funcionalidade dos cards de continentes
  setupContinentCards()
})
