const header = document.querySelector('[data-header]')
const menuButton = document.querySelector('[data-menu-button]')
const nav = document.querySelector('[data-nav]')
const reelDialog = document.querySelector('[data-reel-dialog]')
const form = document.querySelector('[data-booking-form]')
const formStatus = document.querySelector('[data-form-status]')

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24)
updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(isOpen))
  menuButton.querySelector('.sr-only').textContent = isOpen ? 'Close navigation' : 'Open navigation'
})

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open')
    menuButton.setAttribute('aria-expanded', 'false')
  })
})

document.querySelectorAll('[data-open-reel]').forEach(button => {
  button.addEventListener('click', () => {
    reelDialog.showModal()
    document.body.classList.add('dialog-open')
  })
})

document.querySelectorAll('[data-close-reel]').forEach(button => {
  button.addEventListener('click', () => {
    reelDialog.close()
    document.body.classList.remove('dialog-open')
  })
})

reelDialog.addEventListener('click', event => {
  if (event.target === reelDialog) {
    reelDialog.close()
    document.body.classList.remove('dialog-open')
  }
})

form.addEventListener('submit', event => {
  event.preventDefault()
  if (!form.reportValidity()) return
  formStatus.textContent = 'Prototype only. Connect this form to email or a CRM before launch.'
})

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element))
