import { fetchAllListings } from '~/assets/js/recursiveCall.js'
import * as Filters from '~/assets/js/filters.js'

export const state = () => ({
  listing: [],
  queryList: [],
  filter: {
    pageLimit: 10,
    search: '',
    status: 'all',
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
})

export const mutations = {
  updateListings(state, payload) {
    state.listing = payload
  },
  setPage(state, payload) {
    state.currentFile = payload
  },
  setQueryListing(state, listings) {
    state.queryList = listings
  },
  updateHeaderInfo(state, payload) {
    state.headerInfo.title = payload.title
    state.headerInfo.caution = payload.caution
    state.headerInfo.reward = payload.reward
    state.headerInfo.url = payload.url
  },
  updatePage(state, payload) {
    state.filter.page = Number(payload)
  },

  setcache(state, payload) {
    console.log('cacheSet')
    state.listing = payload
    state.queryList = payload
  },
  setFilteredLeads(state, leads) {
    state.filteredLeads = leads
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

  filterLeads(state) {
    const leads = [...state.listing]
    state.queryList = leads
    state.queryList = Filters.filterLeads(state.filter, leads)
  },
  orderLeads(state) {
    const leads = [...state.listing]
    state.queryList = Filters.orderLeads(state.filter.order, leads)
  },
}

export const actions = {
  async fetchData({ commit, state }) {
    const results = await fetchAllListings()
    await commit('updateListings', results)
  },
  async filterOrder({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderLeads')
  },
  async filterStatus({ commit, dispatch }, status) {
    await commit('setFilterStatus', status)
    dispatch('filterLeads')
  },
  async filterSearch({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterLeads')
  },
  async filterLeads({ commit }) {
    await commit('filterLeads')
    await commit('orderLeads')
  },

  nuxtServerInit({ commit }, context) {
    // only set cache if on homepage
    // else this will run for ever

    if (context.route.path === '/') {
      // console.log(context.req.session.user)
      commit('setcache', context.ssrContext.$cache)
    }

    // this only tiggers when site is deployed
    // if (context.req) {
    //   //   console.log(context.req.session)
    //   commit('setcache', context.ssrContext.$cache)
    // }
  },
}
