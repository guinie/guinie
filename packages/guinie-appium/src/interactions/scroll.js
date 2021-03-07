const {
  intersect,
  scaleCenter,
  getCenter,
  getTop,
  getBottom,
  getLeft,
  getRight,
} = require('./utils/rect')

const getPointLeft = rect => {
  const y = getCenter(rect).y
  const x = getLeft(rect)

  return { x, y }
}

const getPointRight = rect => {
  const y = getCenter(rect).y
  const x = getRight(rect)

  return { x, y }
}

const getPointTop = rect => {
  const x = getCenter(rect).x
  const y = getTop(rect)

  return { x, y }
}

const getPointBottom = rect => {
  const x = getCenter(rect).x
  const y = getBottom(rect)

  return { x, y }
}

const getScrollRect = async (driver, element) => {
  const windowRect = await driver.manage().window().getRect()
  const elementRect = await element.getRect()

  const visibleRect = intersect(windowRect, elementRect)
  const scrollRect = scaleCenter(visibleRect, 0.75)

  return scrollRect
}

const scroll = (driver, start, end) => {
  return driver.actions()
    .move(start)
    .press()
    .move(end)
    .release()
    .perform()
}

const defineSafeScrollMethod = (getStartPointFromRect, getEndPointFromRect) => async (driver, element) => {
  const scrollRect = await getScrollRect(driver, element)

  const startPoint = getStartPointFromRect(scrollRect)
  const endPoint = getEndPointFromRect(scrollRect)

  return scroll(driver, startPoint, endPoint)
}

const scrollUp = defineSafeScrollMethod(getPointTop, getPointBottom)
const scrollDown = defineSafeScrollMethod(getPointBottom, getPointTop)
const scrollLeft = defineSafeScrollMethod(getPointLeft, getPointRight)
const scrollRight = defineSafeScrollMethod(getPointRight, getPointLeft)

module.exports = {
  scroll,
  scrollUp,
  scrollDown,
  scrollLeft,
  scrollRight,
}
