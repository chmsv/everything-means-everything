// Function for removing the loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader')
  loader.classList.add('load-finish')
})

// Custom Cursor
const cursorCustomOuter = document.querySelector('.cursor__custom--outer')
const cursorCustomInner = document.querySelector('.cursor__custom--inner')
const footerLinks = document.querySelectorAll('.social-list__link')
const menuItemHovers = document.querySelectorAll('.menu__item--hover')

document.body.addEventListener('mousemove', onMouseMove)
for (let i = 0; i < menuItemHovers.length; i++) {
  menuItemHovers[i].addEventListener('mouseenter', onMouseHover)
  menuItemHovers[i].addEventListener('mouseleave', onMouseHoverOut)
}

for (let i = 0; i < footerLinks.length; i++) {
  footerLinks[i].addEventListener('mouseenter', onMouseHover)
  footerLinks[i].addEventListener('mouseleave', onMouseHoverOut)
}

function onMouseMove(e) {
  TweenMax.to(cursorCustomOuter, 0.4, {
    x: e.pageX - 15,
    y: e.pageY - 15,
  })
  TweenMax.to(cursorCustomInner, 0.1, {
    x: e.pageX - 5,
    y: e.pageY - 7,
  })
}

function onMouseHover() {
  TweenMax.to(cursorCustomOuter, 0.3, {
    scale: 2,
  })
}
function onMouseHoverOut() {
  TweenMax.to(cursorCustomOuter, 0.3, {
    scale: 1,
  })
}


// Fade in
const faders = document.querySelectorAll('.carousel')
const sliders = document.querySelectorAll('.slide-in')

const appearOptions = {
  threshold: 0,
  rootMargin: '0px 0px -250px 0px',
}

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    } else {
      entry.target.classList.add('appear')
      appearOnScroll.unobserve(entry.target)
    }
  })
},
appearOptions)

faders.forEach((fader) => {
  appearOnScroll.observe(fader)
})

sliders.forEach((slider) => {
  appearOnScroll.observe(slider)
})