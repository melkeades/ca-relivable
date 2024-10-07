import './style.styl'
import { sel } from './utils'
import Home from './home'
// import Home2 from './home2'
// import t1 from './t1'
// import Test from './test.jsx'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

const _dataPage = sel('.page-wrapper') || sel('body')
const dataPage = _dataPage?.getAttribute('data-page')
switch (dataPage) {
  case 'home':
    Home()
    break
  // case 'test':
  //   Home()
  //   break
  // case 'home2':
  //   Home2()
  //   break
  // case 't1':
  //   t1()
  //   break

  // case 'error':
  //   Error()
  //   break
  // case 'form':
  //   Form()
  //   break
  default:
    console.log('unknown data-page:', dataPage)
}
