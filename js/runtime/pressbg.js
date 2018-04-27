import Sprite from '../base/sprite'
import { fourRoadPositionCreate} from '../base/roadPosition'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PRESS_BG_IMG_SRC = 'images/pressBg.png'
const PRESS_BG_WIDTH = 72 * (screenWidth/357)
const PRESS_BG_HEIGHT = 80 * (screenHeight / 667)

/**
 * 轨道按下闪光背景
 */

export default class PressBackGround extends Sprite {
  constructor() {
    super(PRESS_BG_IMG_SRC, PRESS_BG_WIDTH, PRESS_BG_HEIGHT)
    this.visible = false
    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false
    // 初始化事件监听
    this.initEvent()
  }
  num = 0
  initPosition(positionIndex=0){
    if(!this.x){
      this.x = fourRoadPositionCreate(positionIndex, 0, 0,screenHeight - this.height - 20).x
      
    }else{
      this.x= this.x
    }
    this.y = screenHeight - this.height - 20
    if(this.num<100){
      this.num++
    }
    
  }
  
  update() {

  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      // if (this.checkIsFingerOnAir(x, y)) {
      //   this.touched = true
      // }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      // if (this.touched)
        

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }).bind(this))
  }

  
}
