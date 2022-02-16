import path from 'path'
import axios from 'axios'

const siteURL = 'https://api.fbi.gov/wanted/v1/list'

async function fetchAllListings() {
  if (process.env.NODE_ENV !== 'production') {
    const wantedJson = require(path.resolve(__dirname, 'wanted.json'))

    console.log(wantedJson.length)

    return new Promise((resolve) => {
      resolve(wantedJson)
    })
  }
  // first get the total results
  // query just to get total
  const totalItems = await axios(`${siteURL}`).then((res) => {
    // return Math.ceil(res.data.total / 20)
    return 1
  })

  const requestList = []
  for (let page = 1; page <= totalItems; page++) {
    await new Promise((resolve) => {
      requestList.push(request(page))
      resolve()
    })
  }

  console.log(requestList.length)

  // console.log(requestList.length)
  return await Promise.all(requestList).then((results) => {
    // flattens all results
    const flattenedArray = [].concat.apply([], results)
    console.log('promises complete', 'results:', flattenedArray.length)
    return flattenedArray
  })
}

async function request(page) {
  const response = await axios.get(`${siteURL}?page=${page}`)
  return response.data.items
}

export { fetchAllListings }
