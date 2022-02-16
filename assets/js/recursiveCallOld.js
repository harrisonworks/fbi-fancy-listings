import axios from 'axios'
const siteURL = 'https://api.fbi.gov/wanted/v1/list'

async function fetchAllListings() {
  if (process.env.NODE_ENV !== 'production') {
    const result = await fetch(`http://localhost:3000/wanted.json`).then(
      (res) => res.json()
    )
    return new Promise((resolve) => {
      resolve(result)
    })
  } else {
    let arrResult = []
    let result = []
    let page = 45
    let started = false
    let toContinue = true

    while (toContinue) {
      if (started === false || result.data.items.length === 20) {
        result = await axios.get(`${siteURL}?page=${page}`).then((response) => {
          // handle success
          console.log(response.data.total)
          return response
        })
        // console.log(result.data)

        console.log('page complete: ', page)

        started = true
        page++
      } else if (result.data.items.length < 20) {
        toContinue = false
      }
      arrResult = arrResult.concat(result.data.items)
    }
    return new Promise((resolve) => {
      console.log('major query complete', arrResult.length)
      resolve(arrResult)
    })
  }
}

export { fetchAllListings }