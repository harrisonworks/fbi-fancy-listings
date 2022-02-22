import { getUnixTime } from 'date-fns'

export function filterList(filter, items) {
  let filteredList = [...items]
  // Filter status
  if (!filter.status.includes('all')) {
    const matches = filteredList.filter((item) => {
      return filter.status.some((str) => {
        return item.subjects.includes(str)
      })
    })

    filteredList = matches
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toLowerCase()
    for (let i = 0; i < filteredList.length; i++) {
      // just add or operator and search another node as well
      if (
        filteredList[i].title !== null &&
        filteredList[i].title.toLowerCase().includes(searchTerm)
      ) {
        searchList.push(filteredList[i])
      }
    }
    filteredList = searchList
  }

  const list = filteredList.reduce((p, c) => {
    p[c.uid] = c
    return p
  }, {})
  return Object.values(list)

  // return filteredList
}

export function orderList(order, items) {
  const orderedList = [...items]

  if (order === 'createdAt') {
    orderedList.sort(function (a, b) {
      const unixA = getUnixTime(new Date(a.publication))
      const unixB = getUnixTime(new Date(b.publication))
      return unixA < unixB ? -1 : 1
    })
  } else {
    orderedList.sort(function (a, b) {
      const nameA = a[order] ? a[order].toLowerCase() : 'zzz'
      const nameB = b[order] ? b[order].toLowerCase() : 'zzz'
      return nameA < nameB ? -1 : 1
    })
  }

  return orderedList
}
