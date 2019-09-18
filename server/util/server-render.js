const Helmet = require('react-helmet').default
const ReactDomServer = require('react-dom/server')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const SheetsRegistry = require('react-jss').SheetsRegistry
const asyncBootstrapper = require('react-async-bootstrapper').default

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  const user = req.session.user
  const createApp = bundle.default
  const createStoreMap = bundle.createStoreMap
  const routerContext = {}
  const stores = createStoreMap()

  if (user) {
    stores.appState.user.isLogin = true
    stores.appState.user.info = user
  }

  const sheetsRegistry = new SheetsRegistry()

  const app = createApp(stores, routerContext, req.url)
  return new Promise((resolve, reject) => {
    asyncBootstrapper(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const appString = ReactDomServer.renderToString(app)
      const helmet = Helmet.rewind()
      const html = ejs.render(template, {
        meta: helmet.meta.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString(),
        title: helmet.title.toString(),
        appString,
        initalState: serialize(getStoreState(stores)),
        materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}