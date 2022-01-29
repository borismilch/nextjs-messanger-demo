import { makeAutoObservable } from 'mobx'
import {ISlide} from '@/models/.'

class SliderStore {

  slides: ISlide[] = []
  currentSlideImage: number = 0
  isLoaded: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  setSlides (slides: ISlide[], idx: number) {
    this.slides = slides,
    this.currentSlideImage = idx
  }

  incrementSlide () {
    this.currentSlideImage++
  }

  decrementSlide () {
    this.currentSlideImage--
  }

  clearData () {
    this.currentSlideImage = 0
    this.slides = []
    this.isLoaded = false
  }

  loadImages () {
    this.isLoaded = true
  }


}


export default new SliderStore()