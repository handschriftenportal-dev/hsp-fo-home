const path = require('path')
const express = require('express')
const httpProxy = require('http-proxy')

const host = 'localhost'
const port = 8080
const wordpressEndpoint = 'http://handtest.handschriftenportal.de/'
const root = path.join(__dirname, '../dist')
const app = express()
const proxy = httpProxy.createProxyServer()

app.use(express.static(root))

app.get(
  ['/api/wordpress/wp-json/*', '/api/wordpress/wp-content/*'],
  function (req, res) {
    req.url = req.url.replace('/api/wordpress', '')
    proxy.web(req, res, {
      target: wordpressEndpoint,
      changeOrigin: true,
    })
  }
)

app.get('/*', function (req, res) {
  res.sendFile(path.join(root, 'index.html'))
})

app.listen(port, host, function () {
  console.log(`server listening on port ${port}`)
})
