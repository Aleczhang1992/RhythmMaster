import Animation from '../base/animation'
import { fourRoadPositionCreate, getScale} from '../base/roadPosition'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/o.png'
const ENEMY_WIDTH   = 100
const ENEMY_HEIGHT  = 100

const __ = {
  speed: Symbol('speed')
}
let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {

  constructor() {
    super(ENEMY_IMG_SRC, 0, 0)
    this.roadIndex=0
    this.initExplosionAnimation()
    
  }

  init(speed) {
    //生成音块位置

    let roadIndex = Math.floor(Math.random() * 4)
    this.roadIndex = roadIndex
    this.x = fourRoadPositionCreate(0,roadIndex).x
    this.y = fourRoadPositionCreate(0,roadIndex).y
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
    const obj = fourRoadPositionCreate(this.roadIndex, this[__.speed],this.x,this.y)
    this.x = obj.x
    this.y = obj.y
    // 对象回收
    let scale = getScale(this.y)
    !this.originWidth && (this.originWidth = ENEMY_WIDTH)
    this.width = this.originWidth * scale

    !this.originHeight && (this.originHeight = ENEMY_HEIGHT)
    this.height = this.originHeight * scale

    if (this.y > window.innerHeight)
      databus.removeEnemey(this)
  }
}
