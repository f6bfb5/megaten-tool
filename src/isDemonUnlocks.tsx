import demonUnlocks from './assets/smt3/demon-unlocks.json'

const demonUnlocksData = demonUnlocks
  .map(demonUnlock => Object.keys(demonUnlock['conditions']))
  .flat()
  .reduce((prev: string[], elem) => {
    const parts = elem.includes(',') ? elem.split(',') : [elem]
    return prev.concat(parts)
  }, [])


function isDemonUnlocks(demonName: string) {
  return demonUnlocksData.includes(demonName)
}

export default isDemonUnlocks
