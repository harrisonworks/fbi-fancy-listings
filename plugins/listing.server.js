export default async ({ store }) => {
  // only run if the store is not filled
  await store.dispatch('fetchData')
}
