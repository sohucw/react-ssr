import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import { createStoreMap } from './store'

// 防止mobx在服务端渲染会出现的循环数据变化问题
useStaticRendering(true)

export default (stores, routerContext, url) => {
  return (
    <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}

export { createStoreMap }
