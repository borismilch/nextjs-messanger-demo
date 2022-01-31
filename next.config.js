const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ['static.xx.fbcdn.net', "firebasestorage.googleapis.com", "scontent.fiev20-1.fna.fbcdn.net", "lh3.googleusercontent.com", "s.gravatar.com", "www.pngfind.com", "upload.wikimedia.org"]
  }
})
