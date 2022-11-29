const critical = require('critical');

const generateCritical = async (url) => {

    // also available: html, uncritical
    const { css } = await critical.generate({
        strict: false,
        rebase: false,
        minify: true,
        src: url,
        penthouse: {
            timeout: 40000,
            pageLoadSkipTimeout: 30000
        }
    })

    return css
}

module.exports = {
    generateCritical
}