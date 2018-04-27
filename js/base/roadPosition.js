const roadNums = 4
const startScale = 0.4;
const endScale = 0.9;
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const allChangeScale = endScale - startScale //倍数变化了多少
const allChangeScale2 = screenHeight / 375

export const getScale = (y = 0) => {
  return startScale + (y / screenHeight) * allChangeScale
}
export const fourRoadPositionCreate = (index=0, speed=1, x=0,y=0)=>{

  let scale = getScale(y)
  const oneRoadWidth = (screenWidth * scale) / roadNums
  return {
    x: screenWidth * (1 - scale) / 2 + index * oneRoadWidth,
    y: allChangeScale2*speed+y,
    scaleX: scale,
    scaleY: scale,
    skewX: -8,
    alpha: 0
  }
   
}
 
export const fourRoadPosition = fourRoadPositionCreate()
