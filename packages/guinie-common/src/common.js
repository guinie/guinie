const map = f => arr => arr.map((item, i) => f(item, i, arr))
const pipeSync = (...fns) => initialValue => fns.reduce((acc, fn) => fn(acc), initialValue)
const pipe = (...fns) => initialValue => fns.reduce((acc, fn) => acc.then(val => fn(val)), Promise.resolve(initialValue))
const sequence = pipe

const applyContext = (...sequences) => driverContext => {
  return sequences.map(seq => seq(driverContext))
}

const compose = (...sequences) => driverContext => params => {
  const parameterizedSequences = pipeSync(
    map(seq => seq(driverContext)),
    map(seq => seq(params)),
  )(sequences)
  return pipe(...parameterizedSequences)
}

module.exports = {
  map,
  pipeSync,
  pipe,
  sequence,
  applyContext,
  compose,
}
