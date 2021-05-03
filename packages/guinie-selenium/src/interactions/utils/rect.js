const intersect = (ra, rb) => {
  const left = Math.max(ra.x, rb.x)
  const right = Math.min(ra.x + ra.width, rb.x + rb.width)
  const top = Math.max(ra.y, rb.y)
  const bottom = Math.min(ra.y + ra.height, rb.y + rb.height)

  if(left < right && top < bottom) {
    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    }
  }
}

const scaleCenter = (ra, scale) => {
  const scaledWidth = ra.width * scale
  const scaledHeight = ra.height * scale
  const diffWidth = ra.width - scaledWidth
  const diffHeight = ra.height - scaledHeight
  const adjustX = diffWidth / 2
  const adjustY = diffHeight / 2

  return {
    x: ra.x + adjustX,
    y: ra.y + adjustY,
    width: scaledWidth,
    height: scaledHeight
  }
}

const getCenter = ra => {
  const centerX = ra.x + (ra.width / 2)
  const centerY = ra.y + (ra.height / 2)

  return {
    x: centerX,
    y: centerY
  }
}

const getTop = ra => ra.y

const getBottom = ra => ra.y + ra.height

const getLeft = ra => ra.x

const getRight = ra => ra.x + ra.width

module.exports = {
  intersect,
  scaleCenter,
  getCenter,
  getTop,
  getBottom,
  getLeft,
  getRight,
}
