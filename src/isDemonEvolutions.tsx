import demonEvolutions from './assets/smt3/evolutions.json'

function isDemonUnlocks(demonName: string) {
  return !Object.entries(demonEvolutions)
    .every(evolution => evolution[1].result !== demonName)
}

export default isDemonUnlocks
