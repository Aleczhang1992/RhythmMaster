import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let MESSAGE_IMG_SRC = 'images/miss.png'
const MESSAGE_IMG_WIDTH = 150
const MESSAGE_IMG_HEIGHT = 60

/**
 * 击键提示
 */


export default class MessageImage extends Sprite {
  constructor() {
    super(MESSAGE_IMG_SRC, MESSAGE_IMG_WIDTH, MESSAGE_IMG_HEIGHT)
    this.visible = false
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - 230
  }
  update() {

  }


}
