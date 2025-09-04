import { useDemonDataContext } from './DemonDataContext'

const { smt3DemonData } = useDemonDataContext()

function getSortedDemonData(accessor: string, sortByOrder: string) {
  let sortedData = []
  switch (accessor) {
    case 'name':
      sortedData = smt3DemonData().sort((a_kv: any[], b_kv: any[]) =>
        sortByOrder === 'asc'
          ? a_kv[0].localeCompare(b_kv[0])
          : b_kv[0].localeCompare(a_kv[0])
      )
      break
    case 'race':
      sortedData = smt3DemonData().sort((a_kv: [string, { race: string }], b_kv: [string, { race: string }]) =>
        sortByOrder === 'asc'
          ? a_kv[1][accessor].localeCompare(b_kv[1][accessor])
          : b_kv[1][accessor].localeCompare(a_kv[1][accessor])
      )
      break
    case 'lvl':
      sortedData = smt3DemonData().sort((a_kv: [string, { lvl: number; }], b_kv: [string, { lvl: number; }]) =>
        sortByOrder === 'asc'
          ? a_kv[1][accessor] - b_kv[1][accessor]
          : b_kv[1][accessor] - a_kv[1][accessor]
      )
      break
    default:
      let resistsIndex = Number(accessor.split('resists')[1])
      sortedData = smt3DemonData().sort((a_kv: [string, { resists: string | string[] }], b_kv: [string, { resists: string | string[] }]) =>
        sortByOrder === 'asc'
          ? a_kv[1]['resists'][resistsIndex].localeCompare(b_kv[1]['resists'][resistsIndex])
          : b_kv[1]['resists'][resistsIndex].localeCompare(a_kv[1]['resists'][resistsIndex])
      )
      break
  }
  return sortedData
}

export default getSortedDemonData