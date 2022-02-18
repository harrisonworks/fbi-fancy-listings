import { fetchAllListings } from '~/assets/js/recursiveCall.js'
import * as Filters from '~/assets/js/filters.js'

export const state = () => ({
  listing: [],
  filterList: [],
  filter: {
    pageLimit: 10,
    search: '',
    status: ['all'],
    order: 'createdAt',
    page: 1,
  },
  currentFile: {},
  headerInfo: {
    title: null,
    caution: null,
    reward: null,
    url: null,
  },
  rawSubjectList: {},
})

export const mutations = {
  updateListings(state, payload) {
    state.listing = payload
  },
  setPage(state, payload) {
    state.currentFile = payload
  },
  setfilterListing(state, listings) {
    state.filterList = listings
  },
  updateHeaderInfo(state, payload) {
    state.headerInfo.title = payload.title
    state.headerInfo.caution = payload.caution
    state.headerInfo.reward = payload.reward
    state.headerInfo.url = payload.url
  },
  updatePage(state, payload) {
    const value = Number(payload)
    const maxPage = Math.ceil(state.filterList / state.filter.pageLimit)
    if (value > 0 || value <= maxPage) {
      state.filter.page = value
    }
  },
  setcache(state, payload) {
    state.listing = payload
    state.filterList = payload

    const subjects = payload.map((item) => item.subjects[0])
    const subjectList = new Set([].concat.apply([], subjects))
    state.rawSubjectList = subjectList
  },

  setFilterStatus(state, status) {
    state.filter.status = status
  },
  setFilterSearch(state, search) {
    state.filter.search = search
  },
  setOrder(state, order) {
    state.filter.order = order
  },

  filterList(state) {
    const listing = [...state.listing]
    state.filterList = listing
    state.filterList = Filters.filterList(state.filter, listing)
  },
  orderList(state) {
    // order those that have been filtered
    const filteredList = [...state.filterList]
    state.filterList = Filters.orderList(state.filter.order, filteredList)
  },
}

export const actions = {
  async fetchData({ commit }) {
    const results = await fetchAllListings()
    await commit('updateListings', results)
  },
  async filterOrder({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderList')
  },
  async filterStatus({ commit, dispatch }, status) {
    await commit('setFilterStatus', status)
    dispatch('filterList')
  },
  async filterSearch({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterList')
  },
  async filterList({ commit }) {
    await commit('filterList')
    // await commit('orderList')
  },

  nuxtServerInit({ commit }, context) {
    // only set cache if on homepage
    // else this will run for every page when generated
    // 3.2GB static if this test isn't in place
    if (context.route.path === '/') {
      commit('setcache', context.ssrContext.$cache)
    }
  },
}
