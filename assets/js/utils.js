function victimCheck(keywords) {
  const victimPhrases = ['Missing', 'ViCAP', 'Victims', 'Victim']

  // compare subjects with keywords
  const subjects = victimPhrases.filter((s) =>
    keywords.some((str) => str.includes(s))
  )

  // if there are any partial matches these will have contents in them
  if (subjects.length !== 0) {
    return true
  } else {
    return false
  }
}

function cyberCheck(keywords) {
  const phrases = ['Cyber', 'Computer']

  // compare subjects with keywords
  const subjects = phrases.filter((s) =>
    keywords.some((str) => str.includes(s))
  )

  // if there are any partial matches these will have contents in them
  if (subjects.length !== 0) {
    return true
  } else {
    return false
  }
}

function crimeSorter(string) {
  // takes string of info and turns it into an array
  return string.split(';').join(',').split(':').join(',').split(',')
}

function calculateReward(data) {
  if (data.reward_text) {
    const regex =
      /\$[\d,]*(\.\d{2})?(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)?|([\d]+(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)?(\sdollar\w*|\scent\w*)(\sand\s[\d]*\scent\w*)?)|(one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|fifty|sixty|seventy|eighty|ninety)+(\shundred\w*|\sthousand\w*|\smillion\w*|\sbillion\w*|\strillion\w*)*(\sdollars)/g
    const found = data.reward_text.match(regex)
    if (!found) {
      return 'reward not specified'
    } else {
      // correct that one record that is a sentence
      // this is bad needs to be fixed
      if (found[0].includes('one')) {
        // console.log(found[0])
        return '$1,000,000 REWARD'
      }

      if (found[0].includes('million')) {
        const millionIndex = found[0].indexOf('million')
        const editedFound = found[0]
          .substring(0, millionIndex - 1)
          .concat(',000,000')
        return `${editedFound} REWARD`
      }

      return `${found[0]} REWARD`
    }
  } else {
    return false
  }
}

export { victimCheck, cyberCheck, crimeSorter, calculateReward }
