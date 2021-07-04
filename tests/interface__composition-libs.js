const test = ({ describe, it, expect }) => (libName, lib) => {
  describe(`${libName}`, () => {
    describe(`common utils`, () => {
      it(`exposes all common utils`, () => {
        const commonUtilFunctions = [
          'map',
          'pipeSync',
          'pipe',
          'sequence',
          'applyContext',
          'compose',
        ].forEach(functionName => {
          expect(lib[functionName]).toBeDefined()
        })
      })
    })

    describe(`configure`, () => {
      const config = {}
      const configuredInstance = lib.configure(config)

      it(`returns an object with wrapDriver and context properties`, () => {
        expect(configuredInstance.wrapDriver).toBeDefined()
        expect(configuredInstance.context).toBeDefined()
      })

      describe(`wrapDriver`, () => {
        it(`exposes a wrapDriver function`, () => {
          expect(configuredInstance.wrapDriver).toBeDefined()
        })
      })

      describe(`context`, () => {
        const interactionFunctionNames = [
          'findElement',
          'type',
          'click',
          'scrollUp',
          'scrollDown',
          'scrollLeft',
          'scrollRight',
        ]

        it(`exposes a context object`, () => {
          expect(configuredInstance.context).toBeDefined()
        })

        interactionFunctionNames.forEach(interactionFunctionName => {
          describe(`context.${interactionFunctionName}`, () => {
            it(`is defined`, async () => {
              expect(configuredInstance.context[interactionFunctionName]).toBeDefined()
            })
          })
        })
      })
    })
  })
}

module.exports = {
  test,
}
