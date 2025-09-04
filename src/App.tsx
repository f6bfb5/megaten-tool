// *TODO:
// Toolbar.tsx
// ReverseFusionList.tsx

import { Switch, Match } from 'solid-js'
import { DemonDataContextProvider, useDemonDataContext } from './DemonDataContext'
import Pagination from './Pagination'
import Toolbar from './Toolbar'
import DemonTable from './DemonTable'
import FusionTable from './FusionTable'
import MajinTable from './MajinTable'
import ElementTable from './ElementTabls'

import Test from './Test'

function App() {
  const { tab } = useDemonDataContext()

  return (
    <div class="m-auto max-w-7xl flex flex-col items-center">
      <Test />
      <h1>Megaten Tools</h1>
      <Pagination />
      <Switch>
        <Match when={tab() === 0}>
          <DemonDataContextProvider>
            <div class="pb-24 w-full">
              <Toolbar />
              <DemonTable />
            </div>
          </DemonDataContextProvider>
        </Match>
        <Match when={tab() === 1}>
          <FusionTable />
          <div class="mt-2 mb-2" />
          <MajinTable />
          <div class="mt-2 mb-2" />
          <ElementTable />
        </Match>
        <Match when={tab() === 2}>
          <p>All data is taken from <a target="_blank" href="https://github.com/aqiu384/megaten-fusion-tool">aqiu384/megaten-fusion-tool</a></p>
          <p>favicon is from <a target="_blank" href="https://www.favicon.cc/?action=icon&file_id=164067">Jack Frost Favicon</a></p>
        </Match>
      </Switch>
    </div>
  )
}

export default App
