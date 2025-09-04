// *TODO:
// [v] check all
// [v] evolution

import { For, Show, Switch, Match, onMount } from 'solid-js'
import { useDemonDataContext } from './DemonDataContext'
import ReverseFusionList from './ReverseFusionList'
import getTranslateName from './getTranslateName'
import getSortedDemonData from './getSortedDemonData'
import isDemonUnlocks from './isDemonUnlocks'
import isDemonEvolutions from './isDemonEvolutions'

const { smt3DemonData, setSmt3DemonData, accessor, setAccessor, sortByOrder, setSortByOrder, check, setCheck, moveCheckedBelow } = useDemonDataContext()

const cellClass = "p-1 h-[32px] line-height-[32px] grow text-center border border-gray border-solid"

let dialogRef: { showModal: (arg0: any, arg1: any) => void; close: () => any }

const openDialog = (key: any, value: any) => {
  dialogRef?.showModal(key, value)
}

// ==== Header ====

function handleHeaderClick(acc: string) {
  if (acc !== accessor()) {
    setAccessor(acc)
    setSortByOrder('asc')
  } else {
    if (sortByOrder() === 'asc') setSortByOrder('desc')
    else setSortByOrder('asc')
  }
  setSmt3DemonData([...getSortedDemonData(accessor(), sortByOrder())])
}

const ArrowSVG = ({ key }: { key: string }) => {
  return (
    <Show when={key === accessor()}>
      <Show when={sortByOrder() !== 'asc'} fallback={(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute top-[50%] translate-y-[-50%] size-[1em] align-middle">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      )}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="absolute top-[50%] translate-y-[-50%] size-[1em] align-middle">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </Show>
    </Show>
  )
}

const DemonTableHeader = () => {
  return (
    <div class="sticky top-0 bg-[#242424] cursor-pointer">
      <div class="flex items-end justify-start">
        <div class={cellClass + " basis-1/4 flex"}
          onClick={() => handleHeaderClick('name')}>
          <div>
            <input
              type="checkbox"
              class=""
              checked={Object.values(check()).every(value => value)}
              onClick={(e) => {
                e.stopPropagation()
                if (Object.values(check()).every(value => value)) {
                  // set all false
                  setCheck(Object.entries(check()).reduce((acc: Record<string, boolean>, [key, _]) => {
                    acc[key] = false
                    return acc
                  }, {}))
                } else {
                  // set all true
                  setCheck(Object.entries(check()).reduce((acc: Record<string, boolean>, [key, _]) => {
                    acc[key] = true
                    return acc
                  }, {}))
                }
              }} />
          </div>
          <div class="grow">
            <span>悪魔</span>
            <ArrowSVG key="name" />
          </div>
        </div>
        <div class={cellClass + " basis-1/8"}
          onClick={() => handleHeaderClick('race')}>
          <span>種族</span>
          <ArrowSVG key="race" />
        </div>
        <div class={cellClass + " basis-1/8"}
          onClick={() => handleHeaderClick('lvl')}>
          <span>Lv</span>
          <ArrowSVG key="lvl" />
        </div>
        <For each={['物', '火', '氷', '電', '衝', '破', '呪', '魔', '神', '精']}>{((resist, i) =>
          <div class={cellClass}
            onClick={() => handleHeaderClick(`resists${i()}`)}>
            <span>{resist}</span>
            <ArrowSVG key={`resists${i()}`} />
          </div>
        )}
        </For>
      </div>
    </div>
  )
}

// ==== Body ====

// 1st row
const DemonNameCell = ({ key }: { key: string }) => {
  return (
    <div
      class={cellClass + " basis-1/4 hover:bg-[#242424]"}
      classList={{
        'bg-gradient-to-r from-gray-600 to-black-900': isDemonUnlocks(key),
        'bg-gradient-to-r from-yellow-600 to-black-900': isDemonEvolutions(key),
      }}
    >
      <label for={key} class="flex gap-2 items-center cursor-pointer">
        <input
          id={key}
          type="checkbox"
          checked={check()[key]}
          onChange={(e) => {
            setCheck(prev => ({
              ...prev,
              [key]: e.target.checked
            }))
          }}
        />
        <img
          class="h-[32px] rounded-md outline outline-1 outline-gray"
          src={`/smt3-image/${getTranslateName(key)}.jpg`}
        />
        <span>{getTranslateName(key)}</span>
      </label>
    </div>
  )
}

const DemonResistsCell = ({ resist }: { resist: 's' | 'r' | 'w' | 'n' | 'd' | '-' }) => {
  return (
    /* s=strong, r=reflect, w=weak, n=noeffect, d=吸 */
    <div class={cellClass + " font-bold"}
      classList={{
        'text-rose-400': resist === 'w',
        '': resist === 's',
        'text-blue-400': resist === 'r',
        'text-yellow-400': resist === 'n',
        'text-green-400': resist === 'd',
      }
      }>
      <Switch fallback={<>－</>}>
        <Match when={resist === 's'}>
          強
        </Match>
        <Match when={resist === 'r'}>
          反
        </Match>
        <Match when={resist === 'w'}>
          弱
        </Match>
        <Match when={resist === 'n'}>
          無
        </Match>
        <Match when={resist === 'd'}>
          吸
        </Match>
        <Match when={resist === '-'}>
          －
        </Match>
      </Switch>
    </div>
  )
}

interface DemonStatus {
  race: string;
  lvl: number;
  resists: ("s" | "r" | "w" | "n" | "d" | "-")[]
}

const DemonStatusRow = ({ key, value }: { key: string, value: DemonStatus }) => {
  return (
    <div class="flex items-center">
      <DemonNameCell key={key} />
      <div class={cellClass + " basis-1/8"}>
        {getTranslateName(value["race"])}
      </div>
      <div class={cellClass + " basis-1/8"}>
        {value["lvl"]}
      </div>

      <For each={value["resists"]}>{(resist =>
        <DemonResistsCell resist={resist} />
      )}
      </For>
    </div>
  )
}

// 2nd row
const ReverseSearchButton = ({ key, value }: { key: string, value: { race: string } }) => {
  return (
    <button
      class="ml-auto break-keep border-t-0 rounded-md bg-[#242424] cursor-pointer"
      onClick={() => openDialog(key, value.race)}>
      逆引き
    </button>
  )
}

interface DemonSkillValue {
  skills: any;
  lvl: number;
  race: string;
}

const DemonSkillRow = ({ key, value }: { key: string, value: DemonSkillValue }) => {
  return (
    <div class="flex items-center mb-1">
      <For each={Object.keys(value["skills"])}>{(skill =>
        <div class="basis-32 text-sm break-keep text-center border-x border-t-0 border-b-1 border-solid border-gray-600 bg-[#242424]"
          classList={{
            'bg-green-900': value["skills"][skill] > value["lvl"]
          }}>
          {getTranslateName(skill)}
        </div>
      )}
      </For>
      <ReverseSearchButton key={key} value={value} />
    </div>
  )
}

const DemonTableBody = () => {
  return (
    <div class="flex flex-col">
      <For each={smt3DemonData()}>{([smt3DemonKey, smt3DemonValue]) =>
        <div classList={{
          'order-last': moveCheckedBelow() && check()[smt3DemonKey],
        }}>
          <DemonStatusRow key={smt3DemonKey} value={{
            race: smt3DemonValue.race,
            lvl: smt3DemonValue.lvl,
            resists: [...smt3DemonValue.resists].map(resist => resist === 's' ? 's' : resist === 'r' ? 'r' : resist === 'w' ? 'w' : resist === 'n' ? 'n' : resist === 'd' ? 'd' : '-'),
          }}
          // key={smt3DemonKey} value={smt3DemonValue}
          />
          <DemonSkillRow key={smt3DemonKey} value={smt3DemonValue} />
        </div>
      }</For>
    </div>
  )
}

// ==== Table ====

const DemonTable = () => {
  onMount(() => {
    setSmt3DemonData([...getSortedDemonData(accessor(), sortByOrder())])
  })

  return (
    <div class="w-full">
      <ReverseFusionList
        onReady={(ref: { showModal: (arg0: any, arg1: any) => void; close: () => any }) => (dialogRef = ref)}
        onClose={() => (dialogRef?.close())} />
      <DemonTableHeader />
      <DemonTableBody />
    </div>
  )
}

export default DemonTable