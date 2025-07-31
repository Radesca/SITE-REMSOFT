// Blog Script - Versão Aprimorada e Consistente
const BlogData = {
  getPublishedPosts: () => {
    // Simulated data for demonstration purposes
    return [
      {
        title: "Post 1",
        category: "desenvolvimento",
        status: "featured",
        image: "image1.jpg",
        excerpt: "Excerpt 1",
        date: "2023-10-01",
        readingTime: 5,
        views: 1000,
        slug: "post1",
      },
      {
        title: "Post 2",
        category: "design",
        status: "published",
        image: "image2.jpg",
        excerpt: "Excerpt 2",
        date: "2023-09-25",
        readingTime: 3,
        views: 500,
        slug: "post2",
      },
      {
        title: "Post 3",
        category: "tecnologia",
        status: "published",
        image: "image3.jpg",
        excerpt: "Excerpt 3",
        date: "2023-09-20",
        readingTime: 4,
        views: 750,
        slug: "post3",
      },
      // Add more posts as needed
    ]
  },
}

document.addEventListener("DOMContentLoaded", () => {
  // Função para carregar posts do sistema admin
  function loadPostsFromAdmin() {
    const posts = BlogData.getPublishedPosts()

    // Atualizar posts em destaque
    updateFeaturedPosts(posts)

    // Atualizar grid de posts
    updatePostsGrid(posts)

    // Atualizar contadores
    updatePostCounters(posts)
  }

  function updateFeaturedPosts(posts) {
    const featuredPosts = posts.filter((post) => post.status === "featured").slice(0, 3)
    const featuredGrid = document.querySelector(".featured-grid")

    if (featuredPosts.length === 0) return

    const mainFeatured = featuredPosts[0]
    const secondaryPosts = featuredPosts.slice(1, 3)

    featuredGrid.innerHTML = `
    <article class="main-featured tilt-item">
      <img src="${mainFeatured.image}" alt="${mainFeatured.title}" class="featured-image">
      <div class="featured-content">
        <span class="featured-category">${getCategoryDisplayName(mainFeatured.category)}</span>
        <h3 class="featured-title">${mainFeatured.title}</h3>
        <p class="featured-excerpt">${mainFeatured.excerpt}</p>
        <div class="featured-meta">
          <span>📅 ${formatDate(mainFeatured.date)}</span>
          <span>⏱️ ${mainFeatured.readingTime} min de leitura</span>
          <span>👁️ ${mainFeatured.views.toLocaleString()} visualizações</span>
        </div>
        <a href="post.html?slug=${mainFeatured.slug}" class="read-more-featured">
          Ler Artigo Completo
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </article>
    
    <div class="secondary-featured">
      ${secondaryPosts
        .map(
          (post) => `
        <article class="secondary-post tilt-item">
          <img src="${post.image}" alt="${post.title}" class="secondary-image">
          <div class="secondary-content">
            <span class="featured-category">${getCategoryDisplayName(post.category)}</span>
            <h3><a href="post.html?slug=${post.slug}">${post.title}</a></h3>
            <p>${post.excerpt.substring(0, 100)}...</p>
            <div class="featured-meta">
              <span>📅 ${formatDate(post.date)}</span>
              <span>⏱️ ${post.readingTime} min</span>
            </div>
          </div>
        </article>
      `,
        )
        .join("")}
    </div>
  `
  }

  function updatePostsGrid(posts) {
    const postsGrid = document.querySelector("#postsGrid")
    const regularPosts = posts.filter((post) => post.status !== "featured")

    postsGrid.innerHTML = regularPosts
      .map(
        (post) => `
    <article class="post-card tilt-item" data-category="${post.category}">
      <img src="${post.image}" alt="${post.title}" class="post-image">
      <div class="post-content">
        <div class="post-meta">
          <span class="post-category">${getCategoryDisplayName(post.category)}</span>
          <span class="post-date">${formatDate(post.date)}</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-footer">
          <div class="post-stats">
            <span>⏱️ ${post.readingTime} min</span>
            <span>👁️ ${post.views}</span>
          </div>
          <a href="post.html?slug=${post.slug}" class="read-more">
            Ler Mais
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `,
      )
      .join("")
  }

  function getCategoryDisplayName(category) {
    const categories = {
      desenvolvimento: "Desenvolvimento",
      design: "Design",
      tecnologia: "Tecnologia",
      negocios: "Negócios",
      ia: "Inteligência Artificial",
    }
    return categories[category] || category
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  function updatePostCounters(posts) {
    // Atualizar contadores se necessário
    console.log(`Blog carregado com ${posts.length} posts`)
  }

  // Header scroll effect
  const header = document.querySelector(".header")

  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active")
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const spans = mobileMenuToggle.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (mobileMenuToggle.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = "none"
          span.style.opacity = "1"
        }
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove("active")
        navMenu.classList.remove("active")

        const spans = mobileMenuToggle.querySelectorAll("span")
        spans.forEach((span) => {
          span.style.transform = "none"
          span.style.opacity = "1"
        })
      }
    })
  }

  // Filter functionality
  const filterButtons = document.querySelectorAll(".category-btn")
  const postCards = document.querySelectorAll(".post-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filterValue = button.getAttribute("data-filter")

      postCards.forEach((card, index) => {
        const shouldShow = filterValue === "all" || card.getAttribute("data-category") === filterValue

        if (shouldShow) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0) scale(1)"
          }, index * 50)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px) scale(0.95)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })

      // Update results count
      const visibleCards = Array.from(postCards).filter(
        (card) => filterValue === "all" || card.getAttribute("data-category") === filterValue,
      )

      console.log(`Mostrando ${visibleCards.length} artigos para categoria: ${filterValue}`)
    })
  })

  // Enhanced search functionality
  const searchInput = document.querySelector("#searchInput")
  let searchTimeout

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    postCards.forEach((card, index) => {
      const title = card.querySelector(".post-title").textContent.toLowerCase()
      const excerpt = card.querySelector(".post-excerpt").textContent.toLowerCase()
      const category = card.querySelector(".post-category").textContent.toLowerCase()

      const matchesSearch =
        searchTerm === "" || title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)

      if (matchesSearch) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0) scale(1)"
        }, index * 30)
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px) scale(0.95)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })

    // Show/hide "no results" message
    const visibleCards = Array.from(postCards).filter((card) => card.style.display !== "none")

    if (visibleCards.length === 0 && searchTerm !== "") {
      showNoResultsMessage()
    } else {
      hideNoResultsMessage()
    }
  }

  function showNoResultsMessage() {
    let noResultsMsg = document.querySelector(".no-results-message")
    if (!noResultsMsg) {
      noResultsMsg = document.createElement("div")
      noResultsMsg.className = "no-results-message"
      noResultsMsg.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: rgba(245, 245, 245, 0.7);">
          <h3 style="font-family: var(--font-primary); font-size: 2rem; margin-bottom: 1rem; color: var(--secondary-light);">
            NENHUM RESULTADO ENCONTRADO
          </h3>
          <p>Tente usar palavras-chave diferentes ou explore nossas categorias.</p>
        </div>
      `
      document.querySelector("#postsGrid").appendChild(noResultsMsg)
    }
    noResultsMsg.style.display = "block"
  }

  function hideNoResultsMessage() {
    const noResultsMsg = document.querySelector(".no-results-message")
    if (noResultsMsg) {
      noResultsMsg.style.display = "none"
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(performSearch, 300)
    })

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        clearTimeout(searchTimeout)
        performSearch()
      }
    })
  }

  // Newsletter form with enhanced feedback
  const newsletterForm = document.querySelector("#newsletterForm")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector(".newsletter-input")
      const email = emailInput.value
      const submitBtn = this.querySelector(".newsletter-btn")
      const originalText = submitBtn.querySelector("span").textContent

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showNotification("Por favor, insira um e-mail válido.", "error")
        return
      }

      // Simulate form submission
      submitBtn.querySelector("span").textContent = "Enviando..."
      submitBtn.disabled = true
      submitBtn.style.opacity = "0.7"

      setTimeout(() => {
        submitBtn.querySelector("span").textContent = "Inscrito! ✓"
        submitBtn.style.background = "#28a745"
        showNotification("Obrigado! Você foi inscrito com sucesso.", "success")

        setTimeout(() => {
          submitBtn.querySelector("span").textContent = originalText
          submitBtn.disabled = false
          submitBtn.style.opacity = "1"
          submitBtn.style.background = ""
          this.reset()
        }, 3000)
      }, 1500)
    })
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#007bff"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: var(--font-secondary);
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 4000)
  }

  // Enhanced tilt effect for cards
  const tiltItems = document.querySelectorAll(".tilt-item")

  tiltItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
      this.style.transition = "transform 0.5s ease"
    })

    item.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
      this.style.transition = "transform 0.1s ease"
    })
  })

  // Enhanced magnetic effect for buttons
  const magneticItems = document.querySelectorAll(".magnetic-item")

  magneticItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0) scale(1)"
      this.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    })

    item.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`
      this.style.transition = "transform 0.1s ease"
    })
  })

  // Load more functionality with animation
  const loadMoreBtn = document.querySelector("#loadMoreBtn")
  let currentlyVisible = 9
  const totalCards = postCards.length

  if (loadMoreBtn && totalCards > currentlyVisible) {
    // Initially hide extra cards
    postCards.forEach((card, index) => {
      if (index >= currentlyVisible) {
        card.style.display = "none"
      }
    })

    loadMoreBtn.addEventListener("click", () => {
      const hiddenCards = Array.from(postCards).slice(currentlyVisible, currentlyVisible + 3)

      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.display = "block"
          card.style.opacity = "0"
          card.style.transform = "translateY(30px) scale(0.9)"

          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0) scale(1)"
          }, 100)
        }, index * 150)
      })

      currentlyVisible += 3

      if (currentlyVisible >= totalCards) {
        loadMoreBtn.style.opacity = "0"
        loadMoreBtn.style.transform = "scale(0.9)"
        setTimeout(() => {
          loadMoreBtn.style.display = "none"
        }, 300)
      }
    })
  } else if (loadMoreBtn) {
    loadMoreBtn.style.display = "none"
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")

        // Add staggered animation for grid items
        if (entry.target.classList.contains("post-card")) {
          const cards = entry.target.parentElement.querySelectorAll(".post-card")
          const index = Array.from(cards).indexOf(entry.target)
          entry.target.style.animationDelay = `${index * 0.1}s`
        }
      }
    })
  }, observerOptions)

  // Observe all sections and cards for animation
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  postCards.forEach((card) => {
    observer.observe(card)
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Update current year in footer
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Reading progress indicator
  function createReadingProgress() {
    const progressBar = document.createElement("div")
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--secondary-light), var(--primary-color));
      z-index: 9999;
      transition: width 0.3s ease;
    `
    document.body.appendChild(progressBar)

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      progressBar.style.width = scrollPercent + "%"
    })
  }

  createReadingProgress()

  // Performance optimization: Lazy loading for images
  const images = document.querySelectorAll("img[src*='placeholder.svg']")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        setTimeout(() => {
          img.style.opacity = "1"
        }, 100)

        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })

  // Console welcome message
  console.log(`
    🚀 REM SOFT Blog
    ================
    Bem-vindo ao nosso blog!
    
    📧 Contato: contato@remsoft.com.br
    🌐 Site: https://remsoft.com.br
    
    Desenvolvido com ❤️ pela equipe REM SOFT
  `)

  // Carregar posts do admin
  loadPostsFromAdmin()
})
