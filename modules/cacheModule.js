import path from 'path'

export default async function (_moduleOptions) {
  // any data you want to share between all requests
  const { fetchAllListings } = require(path.resolve(
    __dirname,
    '../assets/js/recursiveCall.js'
  ))

  const data = [].concat.apply(await fetchAllListings())

  // make the query results available on the vue store
  this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext) => {
    ssrContext.$cache = data
  })

  // before generate is started populate the route array
  // with the listings call
  this.nuxt.hook('generate:before', (nuxtConfig) => {
    const list = data
    const freshRoutes = list.map((el) => {
      return {
        route: `file/${el.uid}`,
        payload: el,
      }
    })
    // populates the routes array for me
    nuxtConfig.options.generate.routes = freshRoutes
  })
}
