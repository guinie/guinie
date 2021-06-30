const {
    applyConfigForLinkedDependencies,
} = require('@carimus/metro-symlinked-deps')

// `applyConfigForLinkedDependencies` used for dealing with internal monorepo dependencies (symlinked node_modules packages).
module.exports = applyConfigForLinkedDependencies(
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  },
  {
    projectRoot: __dirname,
    resolveNodeModulesAtRoot: true,
    blacklistLinkedModules: [
      'react-native',
      'react',
    ]
  }
)
