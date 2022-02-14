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
      } else if (result.items.length < 20) {
        toContinue = false
      }
      arrResult = arrResult.concat(result.items)
    }
    return new Promise((resolve) => {
      console.log('major query complete')
      resolve(arrResult)
    })
  }
}

export { fetchAllListings }
