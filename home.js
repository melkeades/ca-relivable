import {
  addSplideClasses,
  connectSplideArrows,
  connectSplideBullets,
  connectSplideCarouselBullets,
  mm,
  onDomReady,
  sel,
  selAll,
  splideAutoWidth,
  vh,
} from './utils'
import '@splidejs/splide/css'
import Splide from '@splidejs/splide'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import videojs from 'video.js'
import 'video.js/dist/video-js.css'
// import 'videojs-xr'
import 'videojs-vr'
import 'videojs-contrib-quality-levels'
import hlsQualitySelector from 'videojs-hls-quality-selector'

selAll('video').forEach((el) => {
  // el.pause()
})
export default function Home() {
  gsap.registerPlugin(ScrollTrigger)

  const navBtnLo$ = sel('.navbar__learn-btn-w')

  mm.add('(min-width: 991px)', () => {
    if (navBtnLo$) {
      const navbarTl = gsap.to(navBtnLo$, {
        // gridTemplateColumns: 'auto 1fr',
        width: 'auto',
        opacity: 1,
        // yPercent: 10,
        ease: 'linear',
        paused: true,
      })
      ScrollTrigger.create({
        trigger: 'body',
        start: vh(100) + ' top',
        onToggle({ direction }) {
          // to reverse the easing
          gsap.to(navbarTl, { duration: 1.5, progress: direction === 1 ? 1 : 0, ease: 'expo.out' })
        },
      })
    }
  })

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
        const _button$ = item.querySelector('.button')
        _button$.replaceWith(_button$.cloneNode(true))
        const button$ = item.querySelector('.button')
        const modal$ = item.querySelector('.mod-w')

        const video = item.querySelector('video')
        const videoUrl = item.querySelector('source').src

        const player = videojs(video, {
          controls: true,
          sources: [
            {
              src: videoUrl,
              type: 'application/x-mpegURL',
            },
          ],
        })

        // videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector)
        player.ready(() => {
          player.controls(true)
          player.vr({ projection: '360' })
          player.hlsQualitySelector({
            displayCurrentQuality: true,
          })
          // player.xr()
          // const qualityLevels = player.qualityLevels()
        })

        const _modalX$ = modal$.querySelector('.mod__x-w')
        _modalX$.replaceWith(_modalX$.cloneNode(true))
        const modalX$ = modal$.querySelector('.mod__x-w')

        div.appendChild(modal$)
        const modalTl = gsap.timeline({
          defaults: {
            duration: 0.8,
            ease: 'none',
          },
          paused: true,
        })
        modalTl.set(modal$, { display: 'block' }, 0).fromTo(modal$, { autoAlpha: 0 }, { autoAlpha: 1 }, 0)

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
      // console.log('section$', section$)
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
      // const currentIndex = nav.index
      // activeSlide$ = nav.Components.Slides.get()[currentIndex].slide
      // log('activeSlide$', activeSlide$)
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
