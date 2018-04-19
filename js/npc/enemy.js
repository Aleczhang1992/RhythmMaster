import Animation from '../base/animation'
import {fourRoadPosition} from '../base/roadPosition'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/o.png'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.roadIndex=0
    this.initExplosionAnimation()
  }

  init(speed) {
    //生成音块位置
   
    let roadIndex = Math.floor(Math.random() * 4)
    this.roadIndex = roadIndex
    this.x = fourRoadPosition[roadIndex].start.x
    this.y = fourRoadPosition[roadIndex].start.y
    this[__.speed] = speed

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/sg'
    const EXPLO_FRAME_COUNT = 3

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.y += this[__.speed]
    if(this.roadIndex==0){
      this.x -= 0.25
    } else if (this.roadIndex == 1) {
      this.x -= 0.1
    }else if (this.roadIndex == 2) {
      this.x += 0.1
    } else if (this.roadIndex == 3){
      this.x += 0.25
    }
    // 对象回收
    
    if (this.y > window.innerHeight)
      databus.removeEnemey(this)
  }
}
