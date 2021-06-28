const withTM = require('next-transpile-modules')(['emailjs-com']);

module.exports = withTM({
    webpack5: false, // you want to keep using Webpack 4
});