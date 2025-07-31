document.addEventListener("DOMContentLoaded", () => {
  // Referência ao script principal
  // Assume que o script.js já foi carregado e suas funções estão disponíveis

  // Navegação suave para as seções de produtos com destaque na navegação
  const productNavItems = document.querySelectorAll(".product-nav-item");
  const productSections = document.querySelectorAll(".product-detail-section");
  
  // Função para destacar o item de navegação ativo com base no scroll
  function highlightActiveNavItem() {
    const scrollPosition = window.scrollY + 200; // Offset para melhor detecção
    
    productSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove classe ativa de todos os itens
        productNavItems.forEach(item => item.classList.remove("active"));
        
        // Adiciona classe ativa ao item correspondente
        const activeNavItem = document.querySelector(`.product-nav-item[href="#${sectionId}"]`);
        if (activeNavItem) {
          activeNavItem.classList.add("active");
        }
      }
    });
  }

  // Adiciona evento de scroll para destacar o item de navegação ativo
  window.addEventListener("scroll", highlightActiveNavItem);
  
  // Navegação suave para as seções de produtos
  productNavItems.forEach((item) => {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const header = document.querySelector(".header");
      const productsNav = document.querySelector(".products-nav-section");
      
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const navHeight = productsNav ? productsNav.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight - navHeight + 20;
        
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        
        // Atualiza a URL sem recarregar a página
        history.pushState(null, null, targetId);
        
        // Atualiza a classe ativa
        productNavItems.forEach(navItem => navItem.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Funcionalidade para os botões de play nos vídeos
  const playButtons = document.querySelectorAll(".play-button");
  
  playButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const productImage = this.closest(".product-detail-image");
      const productTitle = productImage.closest(".product-detail-content").querySelector(".product-detail-title").textContent;
      
      // Implementação do modal de vídeo
      const modal = document.createElement("div");
      modal.className = "video-modal";
      modal.innerHTML = `
        <div class="video-modal-content">
          <button class="close-modal">&times;</button>
          <h3>${productTitle} - Demonstração</h3>
          <div class="video-container">
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Exibe o modal com animação
      setTimeout(() => {
        modal.classList.add("active");
      }, 10);
      
      // Fechar modal
      modal.querySelector(".close-modal").addEventListener("click", function() {
        modal.classList.remove("active");
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      });
    });
  });

  // Efeito de parallax suave nas imagens dos produtos
  const productImages = document.querySelectorAll(".product-detail-image");
  
  window.addEventListener("scroll", () => {
    productImages.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const scrollPosition = window.pageYOffset;
        const imagePosition = image.offsetTop;
        const windowHeight = window.innerHeight;
        const parallaxValue = (scrollPosition - imagePosition + windowHeight) * 0.05;
        
        // Aplica transformação apenas na imagem interna, não no container
        const img = image.querySelector("img");
        if (img) {
          img.style.transform = `translateY(${parallaxValue}px)`;
        }
      }
    });
  });

  // Inicializa o destaque da navegação no carregamento da página
  highlightActiveNavItem();
  
  // Verifica se há um hash na URL e rola para a seção correspondente
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        const header = document.querySelector(".header");
        const productsNav = document.querySelector(".products-nav-section");
        const headerHeight = header ? header.offsetHeight : 0;
        const navHeight = productsNav ? productsNav.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight - navHeight + 20;
        
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }, 300);
    }
  }

  // Adiciona efeito de hover magnético aos botões da página de produtos
  const magneticItems = document.querySelectorAll(".magnetic-item");
  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px) scale(1.03)`;
      this.style.transition = "transform 0.1s ease-out";
    });
    item.addEventListener("mouseleave", function() {
      this.style.transform = "translate(0,0) scale(1)";
      this.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
  });
  
  // Atualiza o ano atual no rodapé
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Adiciona classe scrolled ao header quando a página é rolada
  window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Inicializa o header com a classe scrolled se a página já estiver rolada
  if (window.scrollY > 50) {
    document.querySelector(".header").classList.add("scrolled");
  }
  
  // Funcionalidade para o menu mobile
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function() {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }
  
  // Fecha o menu mobile quando um link é clicado
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      if (mobileMenuToggle && mobileMenuToggle.classList.contains("active")) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  });
  
  // Adiciona animações aos elementos de background
  function animateBackgroundElements() {
    // Animação para os elementos de código
    document.querySelectorAll(".code-element").forEach((element, index) => {
      element.style.animation = `float ${5 + index}s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Animação para os círculos de circuito
    document.querySelectorAll(".circuit-circle").forEach((element, index) => {
      element.style.animation = `float ${7 + index * 2}s ease-in-out infinite ${index * 0.7}s`;
    });
    
    // Animação para as linhas 3D
    document.querySelectorAll(".line-3d").forEach((element, index) => {
      element.style.animation = `line-pulse ${4 + index}s ease-in-out infinite ${index * 0.3}s`;
    });
  }
  
  // Inicializa as animações de background
  animateBackgroundElements();
});