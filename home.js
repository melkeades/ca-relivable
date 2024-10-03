import { addSplideClasses, connectSplideArrows, connectSplideBullets, connectSplideCarouselBullets, onDomReady, sel, selAll, splideAutoWidth } from './utils'
import '@splidejs/splide/css'
import Splide from '@splidejs/splide'

import gsap from 'gsap'

selAll('video').forEach((el) => {
  // el.pause()
})

export default function Home() {
  function momentInit() {
    const name = 'moments'

    addSplideClasses(name + '__slider')
    const splide = new Splide('.' + name + '__slider', {
      // perPage: 1,
      // width: '100%',
      autoplay: false,
      // autoHeight: true,
      type: 'fade',
      rewind: true,
      pagination: false,
      arrows: false,
    })

    if (sel('.moments-sec .mod-w')) {
      const list$ = sel(`.${name}__nav-slider .w-dyn-items`)
      const item$a = list$.querySelectorAll('.w-dyn-item')
      let div = document.createElement('div')
      div.classList.add(name + '__mod-w')

      item$a.forEach((item, i) => {
        const button$ = item.querySelector('.button')
        const modal$ = item.querySelector('.mod-w')

        // const videoW = item.querySelector('.mod__video-w')
        const video = item.querySelector('video')
        // const videoStyle = getComputedStyle(video)
        // const backgroundImage = videoStyle.getPropertyValue('background-image')
        // const urlMatch = backgroundImage.match(/url\(["']?([^"']*)["']?\)/)
        // const url = urlMatch ? urlMatch[1] : null

        // const videoUrl = item.querySelector('source').getAttribute('src')
        // const wEmbed = item.querySelector('.w-embed')

        // const canvas = document.createElement('canvas')
        // videoW.appendChild(canvas)

        // const modal$ = _modal$
        // const modal$ = _modal$.cloneNode(true) // to remove event listeners
        // _modal$.remove()
        // modal$.setAttribute('fs-scrolldisable-element', 'when-visible')
        // modal.querySelector('.mod__info').setAttribute('data-modal', '')
        const _modalX$ = modal$.querySelector('.mod__x-w')
        _modalX$.replaceWith(_modalX$.cloneNode(true))
        const modalX$ = modal$.querySelector('.mod__x-w')
        // const modalDim$ = modal$.querySelector('.mod__dim')

        // div.appendChild(modal$)
        div.appendChild(modal$)
        const modalTl = gsap.timeline({
          defaults: {
            duration: 0.8,
            ease: 'none',
          },
          paused: true,
        })
        modalTl.set(modal$, { display: 'block' }, 0).fromTo(modal$, { autoAlpha: 0, '--mod-y': '5rem' }, { autoAlpha: 1, '--mod-y': '0' }, 0)

        button$.onclick = () => {
          gsap.to(modalTl, { time: modalTl.duration(), duration: modalTl.duration(), ease: 'power4.out' })
          video.play()
        }
        ;[modalX$].forEach((el) => {
          el.onclick = () => {
            gsap.to(modalTl, { time: 0, duration: modalTl.duration(), ease: 'power4.out', overwrite: true })
            video.pause()
          }
        })
      })
      const section$ = sel(`.${name}-sec`)
      section$.appendChild(div)
      console.log('section$', section$)
    }

    addSplideClasses(name + '__nav-slider')
    const nav = new Splide('.' + name + '__nav-slider', {
      rewind: true,
      pagination: false,
      arrows: false,
      isNavigation: true,
      autoplay: true,
      speed: 1500,
    })

    splide.sync(nav)
    splide.mount()
    nav.mount()
    let activeSlide$ = nav.Components.Slides.get()[0].slide

    nav.on('active', function (index) {
      activeSlide$ = index.slide
    })
    nav.on('autoplay:playing click', function (rate) {
      if (activeSlide$) {
        activeSlide$.style.setProperty('--width', rate * 100 + '%')
      }
    })
  }
  // setTimeout(() => {
  momentInit()
  // }, 500)

  function testInit() {
    const name = 'testimonials'
    addSplideClasses(name + '__slider')
    const splide = new Splide('.' + name + '__slider', {
      perPage: 1,
      gap: '1rem',
      type: 'loop',
      pagination: false,
      arrows: false,
      speed: 1500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    })

    splide.mount()
    connectSplideBullets(splide, '.testimonials__bullets')
    connectSplideArrows(splide, '.testimonials__arrows')
  }
  testInit()
}
