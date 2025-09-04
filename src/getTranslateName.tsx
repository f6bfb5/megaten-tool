import raceName from './assets/compendium/race-names.json'
import demonName from './assets/compendium/demon-names.json'
import skillName from './assets/compendium/skill-names.json'

function getTranslateName(name: string) {
  if (name in raceName as any) {
    return (raceName as any)[name][0]
  } else if (name in demonName) {
    return (demonName as any)[name][0]
  } else if (name in skillName) {
    return (skillName as any)[name][0]
  }
  else return ''
}

export default getTranslateName