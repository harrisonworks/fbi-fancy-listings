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
}

export const actions = {
  async fetchAllListings({ commit }) {
    const results = await fetchAllListings()
    console.log(results.length)
    commit('updateListings', results)
  },
}
