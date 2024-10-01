export const sel = (e) => document.querySelector(e)
export const selAll = (e) => document.querySelectorAll(e)
export const vh = (percent) => window.innerHeight * (percent / 100)
export const vw = (percent) => window.innerWidth * (percent / 100)
export const mm = gsap.matchMedia()

export const isDomEl = (el) => el instanceof Document || el instanceof Element
export const l = (...e) => console.debug(...e)

export function selector(el) {
  if (isDomEl(el)) return el

  if (typeof el === 'string' && el.charAt(0) !== '.' && el.charAt(0) !== '[' && el.charAt(0) !== '#' && el.length > 1) el = '.' + el

  return document.querySelector(el)
}

// export function debounce(func, time = 100) {
//   let timer = 0
//   return function (event) {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(func, time, event)
//   }
// }
export function debounce(func, timeout = 100) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
export function devMode(mode) {
  if (mode === 0) {
    return
  } else if (mode === 1) {
    let i = 0
    document.querySelectorAll('[data-video-urls]').forEach((el) => {
      el.querySelector('video').remove()
      i++
    })
    console.log('devMode, removed videos:', i)
  } else if (mode === 2) {
    const devRemoveList = []
    // const devRemoveList = [videoHero$, introSec$, aboutSec$]
    devRemoveList.forEach((el) => {
      el.remove()
    })
    console.log('devMode: removing sections')
  }
}

export function removeSplideClasses(el) {
  const splide = selector(el)
  const track = splide.querySelector('.splide__track')
  const list = splide.querySelector('.splide__list')
  const slide = splide.querySelectorAll('.splide__slide')
  splide.classList.remove('splide')
  track.classList.remove('splide__track')
  list.classList.remove('splide__list')
  slide.forEach((slide) => slide.classList.remove('splide__slide'))
}
export function addSplideClasses(el, trackClass = '') {
  let splide = selector(el)
  // const track = splide.children[0]
  // const track = splide.querySelector('.w-dyn-list')
  const track = trackClass === '' ? splide.querySelector('.w-dyn-list') : splide.querySelector(trackClass)

  const list = track.querySelector('.w-dyn-items')
  const slide = list.childNodes

  splide.classList.add('splide')
  track.classList.add('splide__track')
  list.classList.add('splide__list')
  slide.forEach((slide) => slide.classList.add('splide__slide'))
}

export function addStaticSplideClasses(el) {
  let splide = selector(el)
  const track = splide.firstChild
  const list = track.firstChild
  const slide = list.childNodes

  splide.classList.add('splide')
  track.classList.add('splide__track')
  list.classList.add('splide__list')
  slide.forEach((slide) => slide.classList.add('splide__slide'))
}

/*
 * @param {Object} splide - The Splide instance.
 * @param {string} arrowW - The selector or element of the wrapper containing the arrows.
 * @param {string} [_arrow='.arrow'] - The selector for the arrow elements (optional, default is '.arrow').
 */
export function connectSplideArrows(splide, arrowW, _arrow = '.arrow') {
  // if (!splide.length) return console.log('splide not found/mounted', splide)
  const arrowW$ = selector(arrowW)
  const leftArrow$ = arrowW$.querySelector(_arrow + '.is--left')
  const rightArrow$ = arrowW$.querySelector(_arrow + ':not(.is--left)')
  if (!leftArrow$ || !rightArrow$) return console.log('arrows not found', 'left:', leftArrow$, 'right:', rightArrow$, 'in wrapper:', arrowW$, 'slide:', splide)

  arrowW$.style.overflow = 'hidden'

  const pages = Math.ceil(splide.length / splide.options.perPage)

  if (pages > 1) {
    arrowW$.style.maxHeight = 'revert-layer' // to get the initial css value

    leftArrow$.addEventListener('pointerdown', function () {
      splide.go('<')
    })
    rightArrow$.addEventListener('pointerdown', function () {
      splide.go('>')
    })
  } else {
    // keep the dom elements to repopulate in the future
    arrowW$.style.maxHeight = '0px'
  }
}
export function connectSplideBullets(splide, el) {
  // parse bullets inside the container and repopulate
  const pagination$ = selector(el)

  let bulletPressed = false

  if (splide.length > 1) {
    const bullet$ = pagination$.querySelector('.bullet:not(.is--active)')
    let fragment = document.createDocumentFragment()
    for (let i = 0; i < splide.length; i++) {
      let clone$ = bullet$.cloneNode(true)
      clone$.addEventListener('click', (e) => {
        bulletPressed = true
        splide.go(i)
      })
      fragment.appendChild(clone$)
    }
    fragment.firstChild.classList.add('is--active')
    pagination$.replaceChildren(fragment)
  } else {
    pagination$.replaceChildren()
  }
  splide.on('move', function (newIndex, oldIndex) {
    selector(el).querySelector('.is--active').classList.remove('is--active')
    selector(el)
      .querySelector(`.bullet:nth-of-type(${splide.index + 1})`)
      .classList.add('is--active')
  })
}
export function connectSplideCarouselBullets(splide, el) {
  const slider$ = splide.root
  const pagination$ = selector(el)
  pagination$.parentElement.style.overflow = 'hidden'

  let pages = 1
  // parse bullets inside the container and repopulate
  function initSate() {
    pages = Math.ceil(splide.length / splide.options.perPage)

    if (pages > 1) {
      pagination$.parentElement.style.maxHeight = 'revert-layer' // to get the initial css value

      const bullet$ = pagination$.querySelector('.bullet:not(.is--active)')

      let fragment = document.createDocumentFragment()
      for (let i = 0; i < pages; i++) {
        let clone$ = bullet$.cloneNode(true)
        clone$.addEventListener('click', (e) => {
          splide.go('>' + i)
        })
        fragment.appendChild(clone$)
      }
      fragment.firstChild.classList.add('is--active')
      pagination$.replaceChildren(fragment)
    } else {
      // keep the dom elements to repopulate in the future
      pagination$.parentElement.style.maxHeight = '0px'
    }
  }
  function initBullets(newIndex = splide.index) {
    const index = Math.ceil(newIndex / splide.options.perPage)

    pagination$.querySelector('.is--active')?.classList.remove('is--active')
    pagination$.querySelector(`.bullet:nth-of-type(${index + 1})`)?.classList.add('is--active')
  }

  splide.on('mounted resized ', function () {
    initSate()
    splide.go(0)
    // updateBullets()
  })
  splide.on('move ', function (newIndex, oldIndex) {
    if (pages < 2) return
    // const index = splide.Components.Controller.toPage(splide.index) // works but the calculation can be wrong as the bullets are manually added
    initBullets(newIndex)
  })
}

export function splideAutoWidth(splide) {
  // if not enough logos it will center them and stop the slider
  const Components = splide.Components
  // to remove duplicates for inactive/small slider
  splide.on('overflow', function (isOverflow) {
    splide.go(0) // Reset the carousel position

    splide.options = {
      focus: isOverflow ? 'center' : '',
      drag: isOverflow ? 'free' : false,
      clones: isOverflow ? undefined : 0, // Toggle clones
    }
  })
  let sliderOverflow = true
  let sliderReady = false
  // to center inactive/small slider
  splide.on('resized', function () {
    var isOverflow = Components.Layout.isOverflow()
    sliderOverflow = isOverflow
    var list = Components.Elements.list
    var lastSlide = Components.Slides.getAt(splide.length - 1)

    if (lastSlide) {
      // Toggles `justify-content: center`
      list.style.justifyContent = isOverflow ? 'flex-start' : 'center'

      // Remove the last margin
      if (!isOverflow) {
        lastSlide.slide.style.marginRight = ''
      }
    }
    if (sliderReady) {
      splideInit()
    }
  })
  splide.on('mounted', splideInit)
  function splideInit() {
    sliderReady = true
    if (!sliderOverflow) {
      splide.Components.AutoScroll.pause()
    } else if (sliderOverflow && splide.Components.AutoScroll.isPaused()) {
      // } else if (sliderOverflow && splide.Components.AutoScroll?.isPaused()) {
      splide.Components.AutoScroll.play()
    }
  }
}

export function onDomReady(run) {
  if (document.readyState !== 'loading') {
    run()
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      run()
    })
  }
}

// Add an observer that checks if a class exists. If it does remove the observer and call a function
export function addObserver(element, className, callback) {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        observer.disconnect()
        callback()
      }
    })
  })
  observer.observe(element, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

// run a callback on change with the delay, if another change occurs before the delay, the timer resets
export function initObserver(element$, timeout = 100, observerName = 'default', callback) {
  if (element$?.observer?.[observerName]) return
  let timerId = 0

  const observer = new MutationObserver(function (mutations) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      // console.log(observerName, element$)
      callback()
      // observer.disconnect()
    }, timeout)
  })

  observer.observe(element$, { childList: true, attributes: true })
  element$.observer = element$.observer || {}
  element$.observer[observerName] = observer
}

// run one callback when class is added and another when it is removed
export function classAddedRemovedObserver(element, className, addedCallback, removedCallback) {
  const element$ = selector(element)

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const classList = mutation.target.classList
        if (classList.contains(className)) {
          addedCallback()
          // console.log('Class ' + className + ' added')
        } else {
          removedCallback()
          // console.log('Class ' + className + ' removed')
        }
      }
    })
  })

  observer.observe(element$, { attributes: true })
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function scrollTriggerInit(distance = 0, elClassName = '', sectionClassName = '', fromToType = '', topMiddleBottom = '', markers = false) {
  const tlType = fromToType === '' ? 'fromTo' : fromToType
  const stPosition = topMiddleBottom === '' ? 'middle' : topMiddleBottom
  // negative distance = front object (faster on scroll), positive distance = back object (slower on scroll/more sticky)
  const tl = gsap.timeline({ defaults: { ease: 'none' } })
  if (tlType === 'fromTo') {
    let fromDistance = -distance,
      toDistance = distance
    // remove the minus sign in a string for fromDistance
    if (typeof distance === 'string' && distance.charAt(0) === '-') fromDistance = distance.substring(1)

    tl.fromTo('.' + elClassName, { y: fromDistance }, { y: toDistance })
  } else if (tlType === 'to') {
    tl.to('.' + elClassName, { y: distance })
    console.log('to')
  } else if (tlType === 'from') {
    console.log('from')
    tl.from('.' + elClassName, { y: distance })
  }

  let start = 'top bottom'
  let end = 'bottom top'
  if (stPosition === 'top') {
    start = 'top top'
  } else if (stPosition === 'bottom') {
    end = 'bottom bottom'
  }

  sectionClassName = sectionClassName || elClassName
  return ScrollTrigger.create({
    animation: tl,
    trigger: '.' + sectionClassName,
    start: start,
    end: end,
    markers: markers,
    scrub: true,
    delay: 0.0,
  })
}

export function addSwiperClasses(slider) {
  const swiper = document.querySelector('.' + slider)
  const list = swiper.children[0]
  const slide = list.childNodes
  swiper.classList.add('swiper')
  list.classList.add('swiper-wrapper')
  slide.forEach((slide) => slide.classList.add('swiper-slide'))
}

export function getSiblings(e) {
  let siblings = []
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild
  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }
  return siblings
}

export function getLineNum(el) {
  const textarea = el
  // console.log('textarea', textarea)

  const parseValue = (v) => (v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0)

  const calculateNumLines = (str) => {
    const textareaStyles = window.getComputedStyle(textarea)
    const font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`
    const paddingLeft = parseValue(textareaStyles.paddingLeft)
    const paddingRight = parseValue(textareaStyles.paddingRight)
    const textareaWidth = textarea.getBoundingClientRect().width - paddingLeft - paddingRight
    // console.log(textareaWidth, font)

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = font

    const words = str.split(' ')
    let lineCount = 0
    let currentLine = ''
    for (let i = 0; i < words.length; i++) {
      const wordWidth = context.measureText(words[i] + ' ').width
      const lineWidth = context.measureText(currentLine).width

      if (lineWidth + wordWidth > textareaWidth) {
        lineCount++
        currentLine = words[i] + ' '
      } else {
        currentLine += words[i] + ' '
      }
    }

    if (currentLine.trim() !== '') {
      lineCount++
    }

    return lineCount
  }
  return calculateNumLines(el.textContent)
  // return el.value.split('\n').length
}

export function wfSliderArrows() {
  const arrows$a = selAll('[slider-arrows]')
  arrows$a.forEach((el) => {
    const providedSelector = el.getAttribute('slider-arrows')
    const placedInside = !providedSelector && providedSelector === ''

    const slider$ = placedInside ? el.closest('.w-slider') : selector(providedSelector)
    // if (slider$.arrowsAttached) return
    // stop if invoked by arrows from within 2nd time, the arrows are connected already
    if (slider$.hasAttribute('arrows-attached') && placedInside) return

    const wfLeftArrow$ = slider$.querySelector('.w-slider-arrow-left')
    const wfRightArrow$ = slider$.querySelector('.w-slider-arrow-right')
    const customLeftArrow$a = slider$.querySelectorAll('.arrow.is--left')
    const customRightArrow$a = slider$.querySelectorAll('.arrow:not(.is--left)')
    customLeftArrow$a.forEach((el) => {
      el.addEventListener('click', function () {
        wfLeftArrow$.click()
      })
    })
    customRightArrow$a.forEach((el) => {
      el.addEventListener('click', function () {
        wfRightArrow$.click()
      })
    })
    // slider$.arrowsAttached = true
    if (placedInside) slider$.setAttribute('arrows-attached', '')
  })
}

export function wfTabs() {
  const customTabs$a = selAll('[tabs-nav]')
  customTabs$a.forEach((customTabs) => {
    const providedSelector = customTabs.getAttribute('tabs-nav')
    const placedInside = !providedSelector && providedSelector === ''
    const tabs$ = placedInside ? customTabs.closest('.w-tabs') : selector(providedSelector)
    // stop if invoked by tabs from within 2nd time, all tabs are connected already
    if (tabs$.hasAttribute('tabs-attached') && placedInside) return

    const customTabs$a = customTabs.querySelectorAll('a')
    customTabs$a.forEach((customTabsTab, i) => {
      customTabsTab.addEventListener('click', function () {
        customTabs.querySelectorAll('.is--active').forEach((el) => el.classList.remove('is--active'))
        customTabsTab.classList.add('is--active')
        const wfTab = tabs$.querySelector('[id$="-data-w-tab-' + i + '"]')
        wfTab.click()
      })
    })
    tabs$.setAttribute('tabs-attached', '')
  })
}
