const siteURL = 'https://api.fbi.gov/wanted/v1/list'

export const state = () => ({
  listing: [],
})

export const mutations = {
  updateListings: (state, posts) => {
    state.listing = posts
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

      commit('updateListings', listing)
    } catch (err) {
      console.log(err)
    }
  },
}
