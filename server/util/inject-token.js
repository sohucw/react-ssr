const axios = require('axios')
const querystring = require('query-string')
const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  console.log('start auth proxy to url:', `${baseUrl}${req.url}`)
  const body = user ? Object.assign({}, req.body, {
    accesstoken: user.accessToken
  }) : req.body
  axios(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: req.method,
    params: req.query,
    data: querystring.stringify(body),
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
