import numeral from 'numeral'
import { getUnixTime } from 'date-fns'
import { calculateReward, victimCheck, crimeSorter } from './utils.js'

export function filterList(filter, items) {
  let filteredList = [...items]

  if (!filter.showVictim) {
    const matches = filteredList.filter((item) => {
      const description = crimeSorter(item.description)
      return !victimCheck([...item.subjects, ...description])
    })

    filteredList = matches
  }

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
  if (filter.search !== '' && filter.search !== null) {
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

  return filteredList
}

export function orderList(order, items) {
  const orderedList = [...items]
  if (order === 'recently_published') {
    orderedList.sort(function (a, b) {
      const unixA = getUnixTime(new Date(a.publication))
      const unixB = getUnixTime(new Date(b.publication))
      return unixA < unixB ? 1 : -1
    })
  } else if (order === 'oldest_published') {
    orderedList.sort(function (a, b) {
      const unixA = getUnixTime(new Date(a.publication))
      const unixB = getUnixTime(new Date(b.publication))
      return unixA < unixB ? -1 : 1
    })
  } else if (order === 'recently_updated') {
    orderedList.sort(function (a, b) {
      const unixA = getUnixTime(new Date(a.modified))
      const unixB = getUnixTime(new Date(b.modified))
      return unixA < unixB ? 1 : -1
    })
  } else if (order === 'largest_reward') {
    orderedList.sort(function (a, b) {
      const nameA = a.reward_text
        ? numeral(calculateReward(a.reward_text).split(' ')[0])._value
        : 0
      const nameB = b.reward_text
        ? numeral(calculateReward(b.reward_text).split(' ')[0])._value
        : 0

      // largest numbers first
      return nameA < nameB ? 1 : -1
    })
  }

  return orderedList
}
