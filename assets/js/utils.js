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

function crimeSorter(string) {
  // takes string of info and turns it into an array
  return string.split(';').join(',').split(':').join(',').split(',')
}

export { victimCheck, crimeSorter }
