import { fetchAllListings } from '~/assets/js/recursiveCall.js'
import * as Filters from '~/assets/js/filters.js'
import { getStatusCategories } from '~/assets/js/utils'

export const state = () => ({
  listing: [],
  filterList: [],
  filter: {
    pageLimit: 25,
    search: '',
    status: ['all'],
    order: 'recently_published',
    group: 'fugitives_only',
    page: 1,
    showVictim: false,
  },
  currentFile: {},
  headerInfo: {
    title: 'FBI Fancy Listing',
    caution: 'FBI Fancy Listing',
    reward: 'FBI Fancy Listing',
    url: 'https://www.fbi.gov/wanted',
  },
  orderList: [
    'recently_published',
    'recently_updated',
    'oldest_published',
    'largest_reward',
  ],
  groupList: ['all', 'fugitives_only', 'victims_only'],
  subjectList: [
    {
      title: 'All',
      subjects: ['all'],
    },
    {
      title: 'Minors',
      subjects: [
        'Crimes Against Children',
        'Parental Kidnapping',
        'ECAP',
        'Endangered Child Alert Program',
        'Parental Kidnapping Victim',
      ],
    },
    {
      title: 'Kidnappings and Missing Persons',
      subjects: ['Kidnappings and Missing Persons'],
    },
    {
      title: 'ViCAP',
      subjects: [
        'ViCAP Missing Persons',
        'ViCAP Unidentified Persons',
        'ViCAP Homicides and Sexual Assaults',
        'VICAP Missing Persons',
      ],
    },
    {
      title: 'Criminal Enterprise Investigations',
      subjects: [
        'Criminal Enterprise Investigations',
        'Criminal Enterprise Investiagtions',
      ],
    },
    {
      title: 'Capitol',
      subjects: ['Capitol'],
    },
    {
      title: 'Ten Most Wanted Fugitives',
      subjects: ['Ten Most Wanted Fugitives'],
    },
    {
      title: 'Indian Country',
      subjects: ['Indian Country'],
    },
    {
      title: 'Terrorism',
      subjects: [
        // 'Seeking Information - Terrorism',
        ' - Terrorism',
        'Domestic Terrorism',
        'Most Wanted Terrorists',
      ],
    },
    {
      title: 'Violent Crime',
      subjects: [
        'Violent Crime - Murders',
        'Additional Violent Crimes',
        'Operation Legend',
      ],
    },
    {
      title: 'Cyber Crimes',
      subjects: ["Cyber's Most Wanted"],
    },
    {
      title: 'Counter Intelegence',
      subjects: ['Counterintelligence'],
    },
    {
      title: 'White Collar Crime',
      subjects: ['White-Collar Crime'],
    },
    {
      title: 'Seeking Information',
      subjects: [
        'law enforcement assistance',
        'Law Enforcement Assistance',
        'Seeking Information',
      ],
    },
    {
      title: 'Known Bank Robbers',
      subjects: ['Known Bank Robbers'],
    },
    {
      title: 'Human Trafficking',
      subjects: ['Human Trafficking'],
    },
    {
      title: 'Misc',
      subjects: [
        'Chloe Combe-Rivas',
        'Michael Reyes',
        'Jesus Aguilar, Jr.',
        'Karen Aguilar',
        'William Martin Vosseler',
        'Vosseler',
        'Mendoza',
      ],
    },
  ],
  rawSubjectList: {},
})

export const mutations = {
  setListings(state, payload) {
    // remove any duplicates in dataset
    const list = payload.reduce((p, c) => {
      p[c.uid] = c
      return p
    }, {})
    state.listing = Object.values(list)
  },
  setfilterListing(state, listings) {
    state.filterList = listings
  },
  setCurrentFile(state, payload) {
    state.currentFile = payload
  },
  updateHeaderInfo(state, payload) {
    state.headerInfo = {
      title: payload.title,
      caution: payload.caution,
      reward: payload.reward,
      url: payload.url,
    }
  },
  setcache(state, payload) {
    state.listing = payload
    state.filterList = payload

    const subjects = payload.map((item) => item.subjects[0])
    const subjectList = new Set([].concat.apply([], subjects))
    state.rawSubjectList = subjectList
  },
  setPage(state, payload) {
    const value = Number(payload)
    const maxPage = Math.ceil(state.filterList / state.filter.pageLimit)
    if (value > 0 || value <= maxPage) {
      state.filter.page = value
    }
  },
  setPageLimit(state, payload) {
    state.filter.pageLimit = Number(payload)
  },
  setFilterStatus(state, status) {
    state.filter.status = status
  },
  setFilterSearch(state, search) {
    state.filter.search = search
  },
  setFilterGroup(state, group) {
    state.filter.group = group
  },
  setFilterOrder(state, order) {
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
    await commit('setListings', results)
  },
  async filterOrder({ commit }, order) {
    await commit('setFilterOrder', order)
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
  async filterGroup({ commit, dispatch }, group) {
    await commit('setFilterGroup', group)
    dispatch('filterList')
  },
  async filterList({ commit }) {
    await commit('filterList')
    // await commit('orderList')
  },
  async defaultHeader({ commit }) {
    await commit('updateHeaderInfo', {
      title: 'FBI Fancy Listing',
      caution: 'FBI Fancy Listing',
      reward: 'FBI Fancy Listing',
      url: 'https://www.fbi.gov/wanted',
    })
  },
  async resetFilter({ commit, dispatch }) {
    // return all to defaults
    await commit('setPage', 1)
    await commit('setFilterStatus', ['all'])
    await commit('setFilterSearch', '')
    await commit('setFilterOrder', 'recently_published')
    await commit('setFilterGroup', 'all')

    dispatch('filterList')
  },
  async queryFilter({ commit, dispatch, state }, query) {
    // return all to defaults
    await commit('setPage', 1)

    const statusFilter = getStatusCategories(state.subjectList, query.status)

    await commit('setFilterStatus', statusFilter)
    await commit('setFilterSearch', query.search)
    await commit('setFilterOrder', query.orderBy)
    await commit('setFilterGroup', query.groupBy)

    dispatch('filterList')
  },
  nuxtServerInit({ commit, dispatch }, context) {
    // only set cache if on homepage
    // else this will run for every page when generated
    // 3.2GB static if this test isn't in place

    if (context.route.path === '/') {
      commit('setcache', context.ssrContext.$cache)
      dispatch('filterList')
    }
  },
}
