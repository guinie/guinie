const path = require('path')

const getAndroidApkPath = (target = 'debug') => {
  return path.resolve(`./android/app/build/outputs/apk/${target}/app-${target}.apk`)
}

module.exports = {
  getAndroidApkPath,
}
