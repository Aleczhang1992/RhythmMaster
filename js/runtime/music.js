let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio =wx.createInnerAudioContext()
    this.bgmAudio.loop = false
    this.bgmAudio.src = 'http://knowapp.b0.upaiyun.com/ss/bigevent/S9ryne %20-%20命.mp3'
    

    this.shootAudio     = new Audio()
    // this.shootAudio.src = 'audio/S9ryne  - 命.mp3'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    // this.playBgm()
   
  }

  playBgm() {
    this.bgmAudio.play()
  }
  stopBgm(){
    this.bgmAudio.stop()
  }
  pauseBgm() {
    this.bgmAudio.pause()
  }
  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
 
  musicOver(callback){
    this.bgmAudio.onEnded(function(){
      callback()
    })

  }
}
