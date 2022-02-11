// import { victimCheck, crimeSorter } from '~/assets/js/utils.js'

const siteURL = 'https://api.fbi.gov/wanted/v1/list'

export const state = () => ({
  listing: [],
  headerInfo: {
    title: null,
    caution: null,
    reward: null,
    url: null,
  },
  currentPage: 1,
  total: null,
})

export const mutations = {
  updateListings: (state, listings) => {
    state.listing = listings
  },

  updateHeaderInfo: (state, payload) => {
    state.headerInfo.title = payload.title
    state.headerInfo.caution = payload.caution
    state.headerInfo.reward = payload.reward
    state.headerInfo.url = payload.url
  },
  updatePage: (state, payload) => {
    state.currentPage = payload
  },
  setTotal: (state, payload) => {
    state.total = payload
  },
}

export const actions = {
  async getListings({ state, commit, dispatch }) {
    // if (state.listing.length) return

    try {
      // filter the query to main offenders
      const listing = await fetch(`${siteURL}?page=${state.currentPage}`).then(
        (res) => res.json()
      )

      commit('updatePage', listing.page)
      if (!state.total) commit('setTotal', listing.total)

      // filter out victims
      // const result = await listing.items.filter((person) => {
      //   const crimeList = crimeSorter(person.description)
      //   return !victimCheck([...person.subjects, ...crimeList])
      // })

      commit('updateListings', listing.items)
    } catch (err) {
      console.log(err)
    }
  },
}
