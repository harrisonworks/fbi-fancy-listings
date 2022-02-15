import axios from 'axios'
const siteURL = 'https://api.fbi.gov/wanted/v1/list'

async function fetchAllListings() {
  // first get the total results
  // query just to get total
  const totalItems = await axios(`${siteURL}`).then((res) => {
    return Math.ceil(res.data.total / 20)
  })

  const requestList = []
  for (let page = 1; page <= totalItems; page++) {
    await new Promise((resolve) => {
      requestList.push(request(page))
      resolve()
    })
  }

  // console.log(requestList.length)
  return Promise.all([...requestList]).then((results) => {
    console.log('promises complete')
    // flattens all results
    return [].concat.apply([], results)
  })
}

async function request(page) {
  const response = await axios.get(`${siteURL}?page=${page}`)
  return response.data.items
}

export { fetchAllListings }
