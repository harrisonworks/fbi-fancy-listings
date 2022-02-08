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
      const listing = await fetch(`${siteURL}`).then((res) => res.json())
      // console.log(posts)
      // posts = posts
      //   .filter((el) => el.status === 'publish')
      //   .map(({ id, slug, title, excerpt, date, tags, content, acf }) => ({
      //     id,
      //     slug,
      //     title,
      //     excerpt,
      //     date,
      //     tags,
      //     content,
      //     acf,
      //   }))

      commit('updateListings', listing)
    } catch (err) {
      console.log(err)
    }
  },
}
