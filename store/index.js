import { crimeSorter, cyberCheck } from '~/assets/js/utils.js'

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
    state.currentPage += payload
  },
  setTotal: (state, payload) => {
    state.total = payload
  },
}

export const actions = {
  async getCurrentListings({ state, commit, dispatch }) {
    // if (state.listing.length) return
    try {
      // filter the query to main offenders
      const listing = await fetch(`${siteURL}?page=${state.currentPage}`).then(
        (res) => res.json()
      )
      commit('updatePage', listing.page)

      if (!state.total) commit('setTotal', listing.total)

      // filter out victims
      commit('updateListings', listing.items)
    } catch (err) {
      console.log(err)
    }
  },

  async fetchAllListings({ commit }) {
    if (process.env.NODE_ENV !== 'production') {
      const result = await fetch(`http://localhost:3000/wanted.json`).then(
        (res) => res.json()
      )

      return new Promise((resolve) => {
        commit('updateListings', result)
        console.log('major query complete')
        resolve(result)
      })
    } else {
      let arrResult = []

      let filtered = null
      let result = []
      let page = 1
      let started = false
      let toContinue = true

      while (toContinue) {
        if (started === false || result.items.length === 20) {
          result = await fetch(`${siteURL}?page=${page}`).then((res) =>
            res.json()
          )

          started = true
          page++

          // no victims
          filtered = await result.items.filter((person) => {
            const crimeList = crimeSorter(person.description)
            // const criminalList = !victimCheck([...person.subjects, ...crimeList])

            return cyberCheck([...person.subjects, ...crimeList])
          })

          console.log('loaded page', result.items.length)
          commit('updatePage', 1)
        } else if (result.items.length < 20) {
          toContinue = false
        }
        arrResult = arrResult.concat(filtered)
      }
      return new Promise((resolve) => {
        commit('updateListings', arrResult)
        console.log('major query complete')
        resolve(arrResult)
      })
    }
  },
}
