import { addSplideClasses, connectSplideArrows, connectSplideBullets, connectSplideCarouselBullets, sel, selAll, splideAutoWidth } from './utils'
import '@splidejs/splide/css'
import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

import { Intersection } from '@splidejs/splide-extension-intersection'
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

    const list$ = sel(`.${name}__nav-slider .w-dyn-items`)
    const item$a = list$.querySelectorAll('.w-dyn-item')
    let div = document.createElement('div')
    div.classList.add(name + '__mod-w')

    item$a.forEach((item, i) => {
      const _modal$ = item.querySelector('.mod-w')

      const modal$ = _modal$.cloneNode(true) // to remove event listeners
      _modal$.remove()
      // modal$.setAttribute('fs-scrolldisable-element', 'when-visible')
      // modal.querySelector('.mod__info').setAttribute('data-modal', '')
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

      item.onclick = () => {
        gsap.to(modalTl, { time: modalTl.duration(), duration: modalTl.duration(), ease: 'power4.out' })
      }
      ;[modalX$].forEach((el) => {
        el.onclick = () => {
          gsap.to(modalTl, { time: 0, duration: modalTl.duration(), ease: 'power4.out', overwrite: true })
        }
      })
    })
    const section$ = sel(`.${name}-sec`)
    section$.appendChild(div)

    addSplideClasses(name + '__nav-slider')
    const nav = new Splide('.' + name + '__nav-slider', {
      // gap: '0',
      // direction: 'ttb',
      // height: '35rem',
      // autoHeight: true,
      // perPage: 1,
      rewind: true,
      pagination: false,
      arrows: false,
      isNavigation: true,
      autoplay: true,
      speed: 1500,
      // easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      breakpoints: {
        478: {
          perPage: 1,
          gap: '0.5rem',
          // autoWidth: true,
        },
      },
    })
    let activeSlide$

    nav.on('active', function (index) {
      activeSlide$ = index.slide
    })
    nav.on('autoplay:playing', function (rate) {
      if (activeSlide$) {
        activeSlide$.style.setProperty('--width', rate * 100 + '%')
      }
    })

    splide.sync(nav)
    splide.mount()
    nav.mount()
    activeSlide$ = nav.Components.Slides.get()[0].slide
  }
  momentInit()

  function testInit() {
    const name = 'testimonials'
    addSplideClasses(name + '__slider')
    const splide = new Splide('.' + name + '__slider', {
      perPage: 1,
      gap: '1rem',
      // autoplay: false,
      // autoHeight: true,
      // type: 'fade',
      // rewind: true,
      type: 'loop',
      pagination: false,
      arrows: false,
      speed: 1500,
      // padding: { right: '20%' },
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    })

    splide.mount()
    connectSplideBullets(splide, '.testimonials__bullets')
    connectSplideArrows(splide, '.testimonials__arrows')
  }
  testInit()
  /*

  function testimonialsInit() {
    const name = 'testimonials'
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

    addSplideClasses(name + '__img-slider')
    const img = new Splide('.' + name + '__img-slider', {
      gap: '1rem',
      // direction: 'ttb',
      // height: '35rem',
      // autoHeight: true,
      // perPage: 1,
      // rewind: true,
      pagination: false,
      arrows: false,
      // isNavigation: true,
      speed: 1500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      breakpoints: {
        478: {
          perPage: 1,
          gap: '0.5rem',
        },
      },
    })
    splide.sync(img)
    splide.mount()
    img.mount()
    connectSplideBullets(splide, '.bullets.is--' + name)
  }
  testimonialsInit()
  function galleryInit() {
    const classPrefix = 'cta'
    addSplideClasses(classPrefix + '__slider')
    const slider = new Splide(sel(`.${classPrefix}__slider`), {
      arrows: false,
      pagination: false,
      gap: '2.5rem',
      type: 'loop',
      autoWidth: true,
      autoScroll: { speed: 0.6, autoStart: false },
      breakpoints: {
        767: {
          gap: '1rem',
        },
      },
    })

    splideAutoWidth(slider)
    slider.mount({ AutoScroll })
  }
  galleryInit()
  */
}
