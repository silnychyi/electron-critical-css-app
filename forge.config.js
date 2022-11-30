const path = require('path')

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "assets", "icon", "critical-css")
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: path.join(__dirname, "assets", "icon", "critical-css.png")
      }
    }
  ],
};
