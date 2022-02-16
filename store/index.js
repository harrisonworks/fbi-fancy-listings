import { fetchAllListings } from '~/assets/js/recursiveCall.js'

export const state = () => ({
  listing: [],
  queryList: [],
  startQuery: false,
  headerInfo: {
    title: null,
    caution: null,
    reward: null,
    url: null,
  },
  currentQuery: {
    pageLimit: 10,
    filter: null,
    page: 1,
  },
  cache: {},
})

export const mutations = {
  updateListings: (state, listings) => {
    state.listing = listings
  },
  startQuery: (state) => {
    state.startQuery = true
    console.log(state.startQuery)
  },
  setQueryListing: (state, listings) => {
    state.queryList = listings
  },
  updateHeaderInfo: (state, payload) => {
    state.headerInfo.title = payload.title
    state.headerInfo.caution = payload.caution
    state.headerInfo.reward = payload.reward
    state.headerInfo.url = payload.url
  },
  updatePage: (state, payload) => {
    state.currentQuery.page = Number(payload)
  },
  setTotal: (state, payload) => {
    state.total = payload
  },
  setcache(state, payload) {
    // if (!payload.uid) {
    console.log('cacheSet')
    state.listing = payload
    // } else {
    //   const itemstore = payload.content.find((item) => item.uid === payload.uid)

    //   state.listing = itemstore
    // }
  },
}

export const actions = {
  async fetchData({ commit, state }) {
    // console.log(state.listing)
    if (state.listing.length) return
    const results = await fetchAllListings()
    await commit('updateListings', results)
  },
  nuxtServerInit({ commit }, context) {
    // only set cache if on homepage
    // else this will run for every route and store the whole cache on all pages
    if (context.route.path === '/') {
      commit('setcache', context.ssrContext.$cache)
    }
  },
}
