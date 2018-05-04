
import Enemy from './npc/enemy'//敌方角色
import BackGround from './runtime/background'
import PressBackGround from './runtime/pressbg'
import MessageImage from './runtime/message'

import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'//背景，游戏信息，音乐
import DataBus from './databus'//游戏全局数据类

import { roadPressPosition } from './base/roadPosition'

let ctx = canvas.getContext('2d')//获取了canvas的上下文,adapter中调用生成的上屏画布
let databus = new DataBus()//创建了一个全局数据实例
let pauseImg ='images/pause.png'



const speed = 2//游戏下落速度
/**
 * 游戏主函数
 */
export default class Main {
  
  
  /****
   1.构造方法，实例化时调用
  ****/
  
  constructor() {
    // 维护当前requestAnimationFrame的id,下次重绘时的执行函数
    this.aniId = 0
    this.pressIndex=0
    this.pressY=0
    this.pressKeyAreaHandler = this.pressKeyAreaHandler.bind(this)
    this.hidePressBGHandler = this.hidePressBGHandler.bind(this)
    this.pauseAreaHandler = this.pauseAreaHandler.bind(this)
    this.restart()
  }


  /***
   * 开始游戏方法
   * ****/
  start(){
    databus.gameStart=true
    this.music.playBgm()
    canvas.addEventListener('touchstart', this.pauseAreaHandler)
    canvas.addEventListener('touchstart', this.pressKeyAreaHandler)
    canvas.addEventListener('touchend', this.hidePressBGHandler)
  }
   /***
   * 重置游戏方法
   * ****/
  restart() {
    //重置全局数据
    databus.reset()
    //禁用游戏结束后的触摸事件处理
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    
    //实例游戏内容对象
    this.bg = new BackGround(ctx)
    this.msgImg = new MessageImage(ctx)
    this.pressbg0 = new PressBackGround(ctx)
    this.pressbg1 = new PressBackGround(ctx)
    this.pressbg2= new PressBackGround(ctx)
    this.pressbg3 = new PressBackGround(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()
    
    this.music.musicOver(function () {
      databus.gameOver = true

    })
    //为循环绑定this
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false
    console.log('restart');
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    //不停地刷帧更新位置信息推动所有对象运动，每个对象在每一帧都有新的位置，连起来就是动画
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
  //游戏暂停逻辑
  pauseGame(){
    if (databus.gamePause){
      //恢复
      this.music.playBgm()
      pauseImg = 'images/pause.png'
    }else{
      //暂停游戏
      this.music.pauseBgm()
      pauseImg = 'images/resume.png'

    }

    databus.gamePause = !databus.gamePause

  }
  /**
   *3. 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    let imgList = ['images/o.png', 'images/o-pink.png', 'images/o-red.png', 'images/o-orange.png', 'images/o-blue.png']
    let enemy = databus.pool.getItemByClass('enemy', Enemy)
    console.log('enemy', enemy);
    let generateArr=[50,80,120,30];
     let generateIndex = Math.floor(Math.random() * 3)
     let imgIndex = Math.floor(Math.random() * 5)
    if (databus.frame % generateArr[generateIndex] === 0 ) {
      enemy.changeSrc(imgList[imgIndex])
      enemy.init(speed)
      databus.enemys.push(enemy)
    } 
  }
  /***
   * 4.击中检查
   * **/

  collisionDetection() {
    let that = this
    //击落敌方
    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]


      if (!enemy.isPlaying && enemy.isCollideWith(this['pressbg' + enemy.roadIndex])) {
        var level = enemy.isCollideWith(this['pressbg' + enemy.roadIndex]);
        enemy.playAnimation()
        that.music.playExplosion()
        wx.vibrateShort()
        enemy.visible = false
        if(level == 1)
        {
         this.msgImg.changeSrc('images/good.png')
         
        }
        if(level == 2)
        {
         this.msgImg.changeSrc('images/perfect.png')
         
        }
        if(level == 3)
        {
         this.msgImg.changeSrc('images/fantastic.png')
         
        }                
        this.msgImg.visible = true
          setTimeout(()=>{
            this.msgImg.visible = false
          },1000)        
        databus.score += 1
        break
      } else if (enemy.y > 600 && enemy.visible){
          this.msgImg.changeSrc('images/miss.png')
          this.msgImg.visible=true
          setTimeout(()=>{
            this.msgImg.visible = false
          },1000)
      }
    }

  }
  pauseAreaHandler(e){
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let pauseArea = this.gameinfo.pauseArea
    console.log("this.gameinfo", this.gameinfo)
    if (x >= pauseArea.startX
      && x <= pauseArea.endX
      && y >= pauseArea.startY
      && y <= pauseArea.endY)
      this.pauseGame()
  }
  /***
   * 5.游戏结束后的触摸事件处理逻辑
   * ***/ 
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let area = this.gameinfo.btnArea
    //点击在按钮上，则重新开始
    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY){
        if(databus.gameover){
          console.log("xxx")
          this.restart()
        }else{
          this.start()
        }
      }
      

    
  }


  pressBgGenerate() {    
    this.pressbg0.initPosition(0)
    this.pressbg1.initPosition(1)
    this.pressbg2.initPosition(2)
    this.pressbg3.initPosition(3)

  }
  hidePressBGHandler(e) {
    e.preventDefault()
    console.log(">>>>>")
    if (this.pressY >= window.innerHeight - 120) {
      this['pressbg' + this.pressIndex].visible = false
      // this.msgImg.visible = false
      
    }


  }  
  /***
   * 按键点击判断
   * ****/
  pressKeyAreaHandler(e) {

    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    // console.log("xxxx", x,y)
    this.pressY = y
    if (y >= window.innerHeight - 120){
      this.pressIndex=Math.floor((x-30)/85);
      this['pressbg' + this.pressIndex].visible = true
    }
    // setTimeout( (e) => {
    //   if (this.pressY >= window.innerHeight - 120) {
    //     this['pressbg' + this.pressIndex].visible = false
    //     // this.msgImg.visible = false
      
    //   }
    // }, 100);
    console.log("pressKeyAreaHandler", e);
    // var event = e;
     setTimeout(() => {

      console.log("setTimeout", this);
      console.log("e", e);

      this.hidePressBGHandler(e)}, 100);    
  }

  /**
   * 6.canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)    
    if (!databus.gameOver && databus.gameStart){
      //游戏进行中展示
      
      this.gameinfo.renderGameScore(ctx, databus.score)
      this.gameinfo.renderPause(ctx, pauseImg)
      
    }
    if (!databus.gameStart){
      //游戏开始界面
      this.bg.changeSrc('images/bg.png')
      this.gameinfo.renderGameStart(ctx)
    } else if (!databus.gameOver){
      this.bg.changeSrc('images/BG_02.png')
      this.msgImg.drawToCanvas(ctx)
      //drawToCanvas在基础元素中封装的绘制到画布的方法
      this.pressbg0.drawToCanvas(ctx)
      this.pressbg1.drawToCanvas(ctx)
      this.pressbg2.drawToCanvas(ctx)
      this.pressbg3.drawToCanvas(ctx)
      databus.bullets
        .concat(databus.enemys)
        .forEach((item) => {
          item.drawToCanvas(ctx)
        })
      databus.animations.forEach((ani) => {
        if (ani.isPlaying) {
          ani.aniRender(ctx)
        }
      })
    }


    // 游戏结束停止帧循环
    if (databus.gameOver) {
       canvas.removeEventListener(
        'touchstart',
        this.pauseAreaHandler
      )
      this.bg.changeSrc('images/bg.png')
      this.gameinfo.renderGameOver(ctx, databus.score)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
    if (!databus.gameStart){
      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  /**
   * 7.游戏逻辑更新主函数
   * ***/ 
  update() {
    //游戏结束
    if (databus.gameOver || databus.gamePause)
      return;
    
    this.bg.update()
    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update()
      })
    //生成敌机
    this.enemyGenerate()
    this.pressBgGenerate()
    //碰撞检测
    this.collisionDetection()
    
  }

  /**
   * 8.实现游戏帧循环
   * ***/ 
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
