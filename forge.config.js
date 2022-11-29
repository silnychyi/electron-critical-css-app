const path = require('path')

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "assets", "icon", "critical-css")
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Illia Silnychyi',
          homepage: 'https://silnychyi.com',
          icon: path.join(__dirname, "assets", "icon", "critical-css")
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    }
  ],
};
