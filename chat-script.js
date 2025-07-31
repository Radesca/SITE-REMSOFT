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

  // Chat functionality
  const chatMessages = document.getElementById("chatMessages")
  const chatInput = document.getElementById("chatInput")
  const sendMessageBtn = document.getElementById("sendMessageBtn")
  const suggestedQuestions = document.querySelectorAll(".question-btn")

  // Function to add a message to the chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`

    const messageHTML = `
      ${
        !isUser
          ? `<div class="message-avatar">
        <img src="/placeholder.svg?height=40&width=40&text=IA" alt="IA Avatar">
      </div>`
          : ""
      }
      <div class="message-content">
        <div class="message-text">
          <p>${text}</p>
        </div>
        <div class="message-time">Agora</div>
      </div>
      ${
        isUser
          ? `<div class="message-avatar">
        <img src="/placeholder.svg?height=40&width=40&text=Você" alt="User Avatar">
      </div>`
          : ""
      }
    `

    messageDiv.innerHTML = messageHTML
    chatMessages.appendChild(messageDiv)

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight

    // If it's a user message, simulate bot response
    if (isUser) {
      simulateBotResponse(text)
    }
  }

  // Function to simulate bot typing and response
  function simulateBotResponse(userMessage) {
    // Show typing indicator
    const typingDiv = document.createElement("div")
    typingDiv.className = "message bot-message"
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <img src="/placeholder.svg?height=40&width=40&text=IA" alt="IA Avatar">
      </div>
      <div class="message-content">
        <div class="message-text">
          <p class="typing">Digitando</p>
        </div>
      </div>
    `
    chatMessages.appendChild(typingDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Simulate thinking time
    setTimeout(() => {
      // Remove typing indicator
      chatMessages.removeChild(typingDiv)

      // Add bot response based on user message
      let botResponse = ""

      // Simple response logic based on keywords
      const lowerCaseMessage = userMessage.toLowerCase()

      if (lowerCaseMessage.includes("serviço") || lowerCaseMessage.includes("oferecem")) {
        botResponse =
          "Oferecemos diversos serviços de desenvolvimento de software, incluindo sistemas web, aplicativos mobile, integrações de sistemas, consultoria em TI e muito mais. Qual serviço específico você gostaria de conhecer melhor?"
      } else if (
        lowerCaseMessage.includes("preço") ||
        lowerCaseMessage.includes("custo") ||
        lowerCaseMessage.includes("valor") ||
        lowerCaseMessage.includes("quanto")
      ) {
        botResponse =
          "Os preços variam de acordo com a complexidade e escopo do projeto. Podemos preparar um orçamento personalizado para você. Poderia me contar um pouco mais sobre o que você precisa?"
      } else if (lowerCaseMessage.includes("prazo") || lowerCaseMessage.includes("tempo")) {
        botResponse =
          "O prazo de desenvolvimento depende da complexidade do projeto. Geralmente, um aplicativo simples pode levar de 2 a 3 meses, enquanto sistemas mais complexos podem levar 6 meses ou mais. Qual tipo de projeto você tem em mente?"
      } else if (lowerCaseMessage.includes("processo") || lowerCaseMessage.includes("como funciona")) {
        botResponse =
          "Nosso processo de desenvolvimento segue metodologias ágeis e inclui as seguintes etapas: 1) Levantamento de requisitos, 2) Planejamento, 3) Design, 4) Desenvolvimento, 5) Testes, 6) Implantação e 7) Suporte contínuo. Gostaria de saber mais sobre alguma etapa específica?"
      } else if (
        lowerCaseMessage.includes("contato") ||
        lowerCaseMessage.includes("falar") ||
        lowerCaseMessage.includes("humano")
      ) {
        botResponse =
          "Você pode entrar em contato com nossa equipe através do formulário na seção de contato do site, pelo e-mail contato@remsoft.com.br ou pelo telefone (00) 12345-6789. Deseja que eu direcione você para a página de contato?"
      } else if (lowerCaseMessage.includes("aplicativo") || lowerCaseMessage.includes("app")) {
        botResponse =
          "Desenvolvemos aplicativos para iOS e Android utilizando tecnologias modernas como React Native e Flutter. Nossos apps são responsivos, performáticos e com excelente experiência do usuário. Você já tem alguma ideia de aplicativo em mente?"
      } else if (lowerCaseMessage.includes("site") || lowerCaseMessage.includes("website")) {
        botResponse =
          "Criamos websites modernos, responsivos e otimizados para SEO. Utilizamos as melhores tecnologias do mercado como React, Next.js e WordPress. Você precisa de um site institucional ou e-commerce?"
      } else if (
        lowerCaseMessage.includes("obrigado") ||
        lowerCaseMessage.includes("obrigada") ||
        lowerCaseMessage.includes("valeu")
      ) {
        botResponse =
          "Estou sempre à disposição! Se precisar de mais alguma informação, é só perguntar. Tenha um ótimo dia!"
      } else {
        botResponse =
          "Obrigado pelo seu contato! Para que eu possa ajudar melhor, poderia me dar mais detalhes sobre o que você está procurando? Estou aqui para esclarecer dúvidas sobre nossos serviços, processos de desenvolvimento ou para ajudar com um orçamento inicial."
      }

      // Add the response to the chat
      addMessage(botResponse)

      // Add new suggested questions based on the conversation
      addSuggestedQuestions()
    }, 1500) // Simulate typing delay
  }

  // Function to add suggested questions based on conversation context
  function addSuggestedQuestions() {
    // Remove existing suggested questions
    const existingSuggestions = document.querySelector(".suggested-questions")
    if (existingSuggestions) {
      chatMessages.removeChild(existingSuggestions)
    }

    // Create new suggested questions
    const suggestionsDiv = document.createElement("div")
    suggestionsDiv.className = "suggested-questions"

    // Randomize some questions to show
    const allQuestions = [
      "Qual o prazo médio de desenvolvimento?",
      "Como funciona o processo de orçamento?",
      "Vocês desenvolvem aplicativos?",
      "Quais tecnologias vocês utilizam?",
      "Posso ver alguns exemplos de projetos?",
      "Vocês oferecem suporte após a entrega?",
      "Como garantem a qualidade do código?",
      "Vocês trabalham com metodologias ágeis?",
    ]

    // Shuffle and pick 3 questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 3)

    selected.forEach((question) => {
      const btn = document.createElement("button")
      btn.className = "question-btn"
      btn.textContent = question
      btn.addEventListener("click", () => {
        addMessage(question, true)
      })
      suggestionsDiv.appendChild(btn)
    })

    chatMessages.appendChild(suggestionsDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Send message when button is clicked
  if (sendMessageBtn) {
    sendMessageBtn.addEventListener("click", () => {
      const message = chatInput.value.trim()
      if (message) {
        addMessage(message, true)
        chatInput.value = ""
      }
    })
  }

  // Send message when Enter key is pressed
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const message = chatInput.value.trim()
        if (message) {
          addMessage(message, true)
          chatInput.value = ""
        }
      }
    })
  }

  // Handle suggested questions
  suggestedQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const question = btn.textContent
      addMessage(question, true)
    })
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

  // Tilt Effect for cards
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
    ".section-header, .chat-intro, .chat-container, .benefit-card, .cta-content, .hero-content-page > *",
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

  // Performance optimization: Pause animations when not visible
  const sectionsWithAnimations = document.querySelectorAll("section")
  if (sectionsWithAnimations.length > 0) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animatedElements = entry.target.querySelectorAll(
            ".circuit-circle, .animated-arrow, .line-3d, .code-element, .bg-shape",
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
})
