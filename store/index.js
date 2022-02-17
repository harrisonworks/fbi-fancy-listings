import { fetchAllListings } from '~/assets/js/recursiveCall.js'

export const state = () => ({
  listing: [],
  queryList: [],
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
})

export const mutations = {
  updateListings: (state, listings) => {
    state.listing = listings
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
    console.log('cacheSet')
    state.listing = payload
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
    // else this will run for ever

    if (context.route.path === '/') {
      // console.log(context.req.session.user)
      commit('setcache', context.ssrContext.$cache)
    }
    // this only tiggers when site is deployed
    if (context.req) {
      commit('setcache', context.ssrContext.$cache)
    }
  },
}
