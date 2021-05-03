const { Device } = require('selenium-webdriver/lib/input')

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

const wheelScroll = (origin, deltaX, deltaY) => ({
  type: 'scroll',
  origin,
  x: 0,
  y: 0,
  deltaX: Math.floor(deltaX),
  deltaY: Math.floor(deltaY),
})

const wheelPause = duration => ({
  type: 'pause',
  duration,
})

const scroll = async (driver, element, deltaX, deltaY) => {
  const Wheel = new Device('wheel', 'Default wheel')
  const action = wheelScroll(element, -deltaX, -deltaY)
  return driver.actions()
    .insert(Wheel, action)
    .perform()
}

const defineSafeScrollMethod = (getStartPointFromRect, getEndPointFromRect) => async (driver, element) => {
  const scrollRect = await getScrollRect(driver, element)

  const startPoint = getStartPointFromRect(scrollRect)
  const endPoint = getEndPointFromRect(scrollRect)

  const offsetX = endPoint.x - startPoint.x
  const offsetY = endPoint.y - startPoint.y

  return scroll(driver, element, offsetX, offsetY)
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
