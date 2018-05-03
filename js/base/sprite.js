/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width=  0, height = 0, x = 0, y = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  changeSrc(imgSrc){
    this.img.src = imgSrc
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if ( !this.visible || !sp.visible )
      return false
    if (spX < this.x || spX > this.x + this.width)
    {
      return false
    }
    if(spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height)
    {
      let spYUp = sp.y + sp.height/6;
      let spYMiddle = sp.y + sp.height/2;
      let spYDown = sp.y + sp.height*5/6;
      let yCenter = this.y + this.height / 2;
      if(yCenter >= sp.y
              && yCenter <= sp.y + sp.height/3 )
      {
        return 1;
      }
      if(yCenter > sp.y + sp.height/3
              && yCenter < sp.y + sp.height*2/3 )
      {
        return 2;
      }
      if(yCenter >= sp.y + sp.height*2/3
              && yCenter <= sp.y + sp.height )
      {
        return 3;
      }

    }
    // return !!(   spX >= this.x
    //           && spX <= this.x + this.width
    //           && spY >= this.y
    //           && spY <= this.y + this.height  )
  }
}
