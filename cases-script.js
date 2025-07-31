document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Página carregada - Iniciando scripts...");

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.includes("#")) {
        e.preventDefault();
        const targetId = href.split("#")[1];
        const targetSection = document.querySelector(`#${targetId}`);
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 0;

        if (targetSection) {
          const targetPosition = targetSection.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        } else if (href.includes("index.html#")) {
          window.location.href = href;
        }

        const navMenu = document.querySelector(".nav-menu");
        const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          if (mobileMenuToggle) mobileMenuToggle.classList.remove("active");
        }
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
  }

  // Cases Filter Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const caseCards = document.querySelectorAll(".case-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      caseCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hidden");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });
    });
  });

  // Magnetic Effect for specified items
  const magneticItems = document.querySelectorAll(".magnetic-item");
  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px) scale(1.03)`;
      this.style.transition = "transform 0.1s ease-out";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0,0) scale(1)";
      this.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
  });

  // Tilt Effect for case cards
  const tiltItems = document.querySelectorAll(".tilt-item");
  tiltItems.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { width, height } = rect;
      const rotateX = ((y - height / 2) / (height / 2)) * -7;
      const rotateY = ((x - width / 2) / (width / 2)) * 7;
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      this.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });

  // Update current year in footer
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Intersection Observer for fade-in animations
  const animatedElements = document.querySelectorAll(
    ".section-header, .cases-intro, .case-card, .stat-card, .cta-content, .hero-content-page > *, .testimonial-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          if (entry.target.classList.contains("stat-card")) {
            const statNumber = entry.target.querySelector(".stat-number");
            if (statNumber && !statNumber.dataset.animated) {
              animateCounter(statNumber);
              statNumber.dataset.animated = "true";
            }
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in-element");
    observer.observe(el);
  });

  // Stats Counter Animation
  function animateCounter(element) {
    const target = Number.parseInt(element.dataset.target);
    const isPercentage = element.textContent.includes("%");
    const isPlus = element.textContent.includes("+");

    const duration = target > 100 ? 3000 : 2000;
    let current = 0;
    const stepTime = 16;
    const increment = target / (duration / stepTime);

    function update() {
      current += increment;
      if (current < target) {
        let suffix = "";
        if (isPercentage) suffix = "%";
        else if (isPlus) suffix = "+";

        element.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        let suffix = "";
        if (isPercentage) suffix = "%";
        else if (isPlus) suffix = "+";

        element.textContent = target + suffix;
      }
    }
    update();
  }

  // Load More Functionality
  const loadMoreBtn = document.querySelector(".load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      console.log("Loading more cases...");

      loadMoreBtn.innerHTML = `
        <span>Carregando...</span>
        <div class="btn-arrow"></div>
      `;

      setTimeout(() => {
        loadMoreBtn.innerHTML = `
          <span>Carregar Mais Cases</span>
          <div class="btn-arrow"></div>
        `;
      }, 2000);
    });
  }

  // Case Details Modal (placeholder functionality)
  const caseButtons = document.querySelectorAll(".case-btn");
  caseButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const caseCard = button.closest(".case-card");
      const caseTitle = caseCard.querySelector(".case-title").textContent;

      alert(
        `Detalhes do case: ${caseTitle}\n\nEsta funcionalidade seria implementada com um modal completo mostrando mais informações sobre o projeto.`
      );
    });
  });

  // Performance optimization: Pause animations when not visible
  const sectionsWithAnimations = document.querySelectorAll("section");
  if (sectionsWithAnimations.length > 0) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animatedElements = entry.target.querySelectorAll(
            ".circuit-circle, .animated-arrow, .line-3d, .code-element, .bg-shape"
          );
          if (entry.isIntersecting) {
            animatedElements.forEach((el) => {
              el.style.animationPlayState = "running";
            });
          } else {
            animatedElements.forEach((el) => {
              el.style.animationPlayState = "paused";
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsWithAnimations.forEach((section) => {
      animationObserver.observe(section);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      console.warn(`Failed to load image: ${this.src}`);
    });
  });

  // ===== CARROSSEL DE DEPOIMENTOS - VERSÃO CORRIGIDA =====
  console.log("🎠 Iniciando carrossel de depoimentos...");

  // Selecionar elementos do carrossel
  const track = document.querySelector(".testimonials-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const allDots = document.querySelectorAll(".dot");

  console.log("Elementos encontrados:", {
    track: !!track,
    slides: slides.length,
    nextButton: !!nextButton,
    prevButton: !!prevButton,
    dots: allDots.length,
  });

  if (!track || slides.length === 0) {
    console.error("❌ Elementos do carrossel não encontrados!");
    return;
  }

  // Variáveis do carrossel
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval = null;

  console.log(`📊 Carrossel configurado com ${totalSlides} slides`);

  // Função para mover o carrossel
  function moveToSlide(index) {
    console.log(`🎯 Movendo para slide ${index}`);

    // Garantir que o índice está dentro dos limites
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;

    // Mover o track - cada slide ocupa 33.333% da largura
    const translateX = -currentIndex * 33.333;
    track.style.transform = `translateX(${translateX}%)`;

    console.log(`📐 Transform aplicado: translateX(${translateX}%)`);

    // Atualizar dots
    allDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    console.log(`✅ Slide ${currentIndex} ativo`);
  }

  // Função para próximo slide
  function nextSlide() {
    console.log("➡️ Próximo slide");
    moveToSlide(currentIndex + 1);
  }

  // Função para slide anterior
  function prevSlide() {
    console.log("⬅️ Slide anterior");
    moveToSlide(currentIndex - 1);
  }

  // Função para iniciar auto-play
  function startAutoPlay() {
    console.log("▶️ Iniciando auto-play (5 segundos)");
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    autoPlayInterval = setInterval(() => {
      console.log("⏰ Auto-play: próximo slide");
      nextSlide();
    }, 5000); // 5 segundos
  }

  // Função para parar auto-play
  function stopAutoPlay() {
    console.log("⏸️ Parando auto-play");
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Event listeners para botões
  if (nextButton) {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("🖱️ Clique no botão NEXT");
      nextSlide();
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000); // Reinicia auto-play após 3 segundos
    });
    console.log("✅ Event listener NEXT adicionado");
  }

  if (prevButton) {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("🖱️ Clique no botão PREV");
      prevSlide();
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000); // Reinicia auto-play após 3 segundos
    });
    console.log("✅ Event listener PREV adicionado");
  }

  // Event listeners para dots
  allDots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(`🖱️ Clique no dot ${index}`);
      moveToSlide(index);
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000); // Reinicia auto-play após 3 segundos
    });
  });
  console.log(`✅ Event listeners dos dots adicionados (${allDots.length} dots)`);

  // Pausar auto-play no hover
  const carouselContainer = document.querySelector(".testimonials-carousel");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", () => {
      console.log("🖱️ Mouse sobre carrossel - pausando auto-play");
      stopAutoPlay();
    });

    carouselContainer.addEventListener("mouseleave", () => {
      console.log("🖱️ Mouse saiu do carrossel - retomando auto-play");
      startAutoPlay();
    });
  }

  // Suporte para touch/swipe em dispositivos móveis
  let startX = 0;
  let endX = 0;

  if (carouselContainer) {
    carouselContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // Mínimo de 50px para considerar swipe
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        stopAutoPlay();
        setTimeout(startAutoPlay, 3000);
      }
    });
  }

  // Função para mover o carrossel
function moveToSlide(index) {
  console.log(`🎯 Movendo para slide ${index}`);

  // Garantir que o índice está dentro dos limites
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  currentIndex = index;

  // Mover o track - cada slide ocupa 100% da largura do container
  const translateX = -currentIndex * 100;
  track.style.transform = `translateX(${translateX}%)`;

  console.log(`📐 Transform aplicado: translateX(${translateX}%)`);

  // Atualizar dots
  allDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  console.log(`✅ Slide ${currentIndex} ativo`);
}

  // Inicializar carrossel
  moveToSlide(0);
  startAutoPlay();

  console.log("🎉 Carrossel inicializado com sucesso!");

  // Cleanup quando a página for fechada
  window.addEventListener("beforeunload", () => {
    stopAutoPlay();
  });
});