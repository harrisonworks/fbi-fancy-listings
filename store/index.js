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
    commit('setcache', context.ssrContext.$cache)
  },
}
