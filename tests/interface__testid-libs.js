const test = ({ describe, it, expect }) => (libName, lib) => {
  describe(`${libName}`, () => {
    const libraryExports = [
      `makeTestIdProps`,
      `withTestId`,
    ]

    libraryExports.forEach(libraryExport => {
      it(`exposes ${libraryExport}-function`, () => {
        expect(lib[libraryExport]).toBeDefined()
      })
    })
  })
}

module.exports = {
  test,
}
