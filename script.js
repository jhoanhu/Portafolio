// Estado de la aplicación
let currentLang = "es"
let currentTheme = "light"

// Elementos del DOM
const themeToggle = document.getElementById("themeToggle")
const langToggle = document.getElementById("langToggle")
const projectsBtn = document.getElementById("projectsBtn")
const backBtn = document.getElementById("backBtn")
const mainView = document.getElementById("mainView")
const projectsView = document.getElementById("projectsView")

// Función para cambiar el tema
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark")
    themeToggle.querySelector(".icon").textContent = "☀️"
  } else {
    document.documentElement.removeAttribute("data-theme")
    themeToggle.querySelector(".icon").textContent = "🌙"
  }

  // Guardar preferencia en localStorage
  localStorage.setItem("theme", currentTheme)
}

// Función para cambiar el idioma
function toggleLanguage() {
  currentLang = currentLang === "es" ? "en" : "es"

  // Actualizar el botón
  langToggle.querySelector(".lang-text").textContent = currentLang === "es" ? "EN" : "ES"

  // Actualizar todos los textos con atributos data-lang
  const elements = document.querySelectorAll("[data-es], [data-en]")
  elements.forEach((element) => {
    const text = element.getAttribute(`data-${currentLang}`)
    if (text) {
      element.textContent = text
    }
  })

  // Guardar preferencia en localStorage
  localStorage.setItem("language", currentLang)
}

// Función para mostrar proyectos
function showProjects() {
  mainView.classList.add("hidden")
  projectsView.classList.remove("hidden")

  // Reiniciar animación
  projectsView.style.animation = "none"
  setTimeout(() => {
    projectsView.style.animation = "fadeIn 0.6s ease"
  }, 10)
}

// Función para volver a la vista principal
function showMain() {
  projectsView.classList.add("hidden")
  mainView.classList.remove("hidden")

  // Reiniciar animación
  mainView.style.animation = "none"
  setTimeout(() => {
    mainView.style.animation = "fadeIn 0.6s ease"
  }, 10)
}

// Event Listeners
themeToggle.addEventListener("click", toggleTheme)
langToggle.addEventListener("click", toggleLanguage)
projectsBtn.addEventListener("click", showProjects)
backBtn.addEventListener("click", showMain)

// Cargar preferencias guardadas al iniciar
window.addEventListener("DOMContentLoaded", () => {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    toggleTheme()
  }

  // Cargar idioma guardado
  const savedLang = localStorage.getItem("language")
  if (savedLang && savedLang !== currentLang) {
    toggleLanguage()
  }
})

// Añadir efecto de ripple al hacer click en las tarjetas
document.querySelectorAll(".bento-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    // Solo para tarjetas que no sean botones específicos
    if (this.id !== "projectsBtn" && this.id !== "backBtn") {
      const ripple = document.createElement("div")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.5)"
      ripple.style.width = ripple.style.height = "100px"
      ripple.style.left = e.clientX - this.offsetLeft - 50 + "px"
      ripple.style.top = e.clientY - this.offsetTop - 50 + "px"
      ripple.style.pointerEvents = "none"
      ripple.style.animation = "ripple 0.6s ease-out"

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }
  })
})

// Añadir la animación de ripple en el CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
