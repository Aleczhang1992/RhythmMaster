export const fourRoadPositionCreate = (y=0,index=0,aa)=>{
  const roadNums = 4
  const startScale = 0.4;
  const endScale = 0.9;
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const allChangeScale = endScale - startScale

  const scale = startScale + (y / screenHeight) * allChangeScale
  const oneRoadWidth = (screenWidth * scale) / roadNums
  // console.log(aa)
 
  return {
    x: screenWidth * (1 - scale) / 2 + index * oneRoadWidth,
    y: -20,
    skewX: -8,
    scaleX: scale,
    scaleY: scale,
    alpha: 0
  }
   
}
 
export const fourRoadPosition = fourRoadPositionCreate()
