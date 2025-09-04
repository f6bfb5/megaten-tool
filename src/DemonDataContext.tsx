import { createSignal, createContext, useContext, type JSX } from 'solid-js'
// import raceName from './assets/compendium/race-names.json'
import demonName from './assets/compendium/demon-names.json'
import smt3DemonDataJSON from './assets/smt3/demon-data.json'
// import fusionTableData from "./assets/smt3/fusion-chart.json"

const [smt3DemonData, setSmt3DemonData] = createSignal(Object.entries(smt3DemonDataJSON).filter((kv) => kv[0] in demonName))
// accessor: name, race, lvl, resists0-8
const [accessor, setAccessor] = createSignal('lvl')
// sortByOrder: asc, desc
const [sortByOrder, setSortByOrder] = createSignal('asc')

const keys = smt3DemonData().map(smt3DemonDataKV => smt3DemonDataKV[0])
const keyValuePairs = keys.map(key => [key, false])
const [check, setCheck] = createSignal(Object.fromEntries(keyValuePairs))

const [searchText, setSearchText] = createSignal('')
const [moveCheckedBelow, setMoveCheckedBelow] = createSignal(false)

// const maxIterations = Math.max(...fusionTableData['table'].map(row => row.length))

const [tab, setTab] = createSignal(0)
const updateTab = (index: any) => () => setTab(index)

const demonDataContextValue = {
  smt3DemonData,
  setSmt3DemonData,
  accessor,
  setAccessor,
  sortByOrder,
  setSortByOrder,
  check,
  setCheck,
  searchText,
  setSearchText,
  moveCheckedBelow,
  setMoveCheckedBelow,
  tab,
  updateTab
}

const DemonDataContext = createContext(demonDataContextValue)

const useDemonDataContext = () => useContext(DemonDataContext)

function DemonDataContextProvider(props: { children: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined }) {
  return <DemonDataContext.Provider value={demonDataContextValue}>
    {props.children}
  </DemonDataContext.Provider>
}

export { DemonDataContext, useDemonDataContext, DemonDataContextProvider }
