import { fetchAllListings } from '~/assets/js/recursiveCall.js'

export const state = () => ({
  listing: [],
  currentQueryList: [],
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
  async fetchAllListings({ commit }) {
    const results = await fetchAllListings()
    commit('updateListings', results)
    // if (process.env.NODE_ENV !== 'production') {
    //   const result = await fetch(`http://localhost:3000/wanted.json`).then(
    //     (res) => res.json()
    //   )
    //   return new Promise((resolve) => {
    //     commit('updateListings', result)
    //     resolve(result)
    //   })
    // } else {
    //   let arrResult = []

    //   // let filtered = null
    //   let result = []
    //   let page = 1
    //   let started = false
    //   let toContinue = true

    //   while (toContinue) {
    //     if (started === false || result.items.length === 20) {
    //       result = await fetch(`${siteURL}?page=${page}`).then((res) =>
    //         res.json()
    //       )

    //       started = true
    //       page++

    //       // DO THE FILTERS ON THE FRONT FOOL
    //       // no victims
    //       // filtered = await result.items.filter((person) => {
    //       //   const crimeList = crimeSorter(person.description)
    //       //   // const criminalList = !victimCheck([...person.subjects, ...crimeList])

    //       //   return cyberCheck([...person.subjects, ...crimeList])
    //       // })

    //       console.log('loaded page', result.items.length)
    //       commit('updatePage', 1)
    //     } else if (result.items.length < 20) {
    //       toContinue = false
    //     }
    //     arrResult = arrResult.concat(result.items)
    //   }
    //   return new Promise((resolve) => {
    //     commit('updateListings', arrResult)
    //     console.log('major query complete')
    //     resolve(arrResult)
    //   })
    // }
  },
}
