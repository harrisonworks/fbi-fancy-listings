import { victimCheck, crimeSorter } from '~/assets/js/utils.js'

const siteURL = 'https://api.fbi.gov/wanted/v1/list'

export const state = () => ({
  listing: [],
  headerInfo: {
    title: null,
    caution: null,
    reward: null,
  },
})

export const mutations = {
  updateListings: (state, listings) => {
    state.listing = listings
  },
  updateHeaderInfo: (state, payload) => {
    state.headerInfo.title = payload.title
    state.headerInfo.caution = payload.caution
    state.headerInfo.reward = payload.reward
  },
}

export const actions = {
  async getListings({ state, commit, dispatch }) {
    if (state.listing.length) return

    try {
      // filter the query to main offenders
      const listing = await fetch(`${siteURL}?person_classification=main`).then(
        (res) => res.json()
      )

      // filter out victims
      const result = await listing.items.filter((person) => {
        const crimeList = crimeSorter(person.description)

        return !victimCheck([...person.subjects, ...crimeList])
      })

      commit('updateListings', result)
    } catch (err) {
      console.log(err)
    }
  },
}
