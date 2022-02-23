import numeral from 'numeral'
import { getUnixTime } from 'date-fns'
import { calculateReward } from './utils.js'

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
      return unixA < unixB ? 1 : -1
    })
  } else if (order === 'reward_text') {
    orderedList.sort(function (a, b) {
      const nameA = a[order]
        ? numeral(calculateReward(a[order]).split(' ')[0])._value
        : 0
      const nameB = b[order]
        ? numeral(calculateReward(b[order]).split(' ')[0])._value
        : 0

      // largest numbers first
      return nameA < nameB ? 1 : -1
    })
  }

  return orderedList
}
