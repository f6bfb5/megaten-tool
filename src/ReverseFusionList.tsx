// *TODO:
// [v] evolution?
// [v] special fusion
// [v] element fusion
// [v] normal fusion
// [ ] curse fusion

import { createSignal, For, Show, onMount } from 'solid-js'

import getSortedDemonData from './getSortedDemonData'
import getTranslateName from './getTranslateName'
import isDemonUnlocks from './isDemonUnlocks'
import isDemonEvolutions from './isDemonEvolutions'

import fusionTableData from "./assets/smt3/fusion-chart.json"
import specialFusionData from "./assets/smt3/special-recipes.json"
import elementTableData from "./assets/smt3/element-chart.json"

import "./ReverseFusionList.css"

// sort demons by lvl
const sortedDemonData = getSortedDemonData('lvl', 'asc')

const [targetDemonName, setTargetDemonName] = createSignal("")
const [targetDemonRace, setTargetDemonRace] = createSignal("")

function getLvlRange() {
  const sameRaceDemon = sortedDemonData
    .filter((demonData: [string, any]) => demonData[1]['race'] === targetDemonRace())

  const lvlRange = []

  const targetDemonIndex = sameRaceDemon.findIndex((demonData: [string, any]) => demonData[0] === targetDemonName())
  // (target demon lvl-1)*2
  // - must lower than this lvl value
  // - and higher than the lower level demon one
  // - or zero
  // lowerLvl < range < targetLvl
  const lowerLvl = (targetDemonIndex !== 0)
    ? (sameRaceDemon[targetDemonIndex - 1][1]['lvl'] - 1) * 2
    : 0
  const targetLvl = (sameRaceDemon[targetDemonIndex][1]['lvl'] - 1) * 2
  lvlRange.push(lowerLvl, targetLvl)
  return lvlRange
}

function getRacePairs() {
  // find all race pairs from table
  const maxIterations = Math.max(...fusionTableData['table'].map(row => row.length))
  const racePairs = []
  for (let i = 0; i < maxIterations; i++) {
    for (let j = 0; j < fusionTableData['table'].length; j++) {
      if (targetDemonRace() === fusionTableData['table'][j][i]) {
        racePairs.push([
          fusionTableData['races'][j],
          fusionTableData['races'][i]
        ])
      }
    }
  }
  return racePairs
}

function getSpecialList() {
  const specialData = Object.fromEntries(
    Object.entries(specialFusionData)
      .filter((fusionData) => fusionData[1].length)
      .map(([key, valueArray]) => [
        key,
        valueArray.map(str => str.split(' x '))
      ])
  )
  return specialData[targetDemonName()]
  // const specialList = []
}

function getElementList() {
  const elementTableIndex = Object.values(elementTableData['races']).findIndex((race: string) => race === targetDemonRace())
  const elementList: string[][] = []
  // if (elementTableIndex) {
  if (elementTableData['races'][elementTableIndex] !== undefined) {
    const sameRaceDemon = sortedDemonData
      .filter((demonData: [string, any]) => demonData[1]['race'] === targetDemonRace())
    const demonIndex = sameRaceDemon.findIndex((demon: [string, any]) => targetDemonName() === demon[0])
    if (demonIndex === 0 && sameRaceDemon[1]) {
      // console.log(targetDemonName(), sameRaceDemon[1])
      elementTableData['table'][elementTableIndex].forEach(
        (result, index) => {
          if (result === -1) {
            const specialDemonIndex1 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === elementTableData['elems'][index])
            const specialDemonIndex2 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === sameRaceDemon[1][0])
            elementList.push(
              [
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex1][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex1][1]['race'])} Lv.${sortedDemonData[specialDemonIndex1][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex1][0])}`,
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex2][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex2][1]['race'])} Lv.${sortedDemonData[specialDemonIndex2][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex2][0])}`,
              ]
            )
          }
        }
      )
    }
    if (demonIndex === sameRaceDemon.length - 1 && sameRaceDemon[demonIndex - 1]) {
      // console.log(sameRaceDemon[demonIndex - 1], targetDemonName())
      elementTableData['table'][elementTableIndex].forEach(
        (result, index) => {
          if (result === 1) {
            const specialDemonIndex1 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === elementTableData['elems'][index])
            const specialDemonIndex2 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === sameRaceDemon[demonIndex - 1][0])
            elementList.push(
              [
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex1][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex1][1]['race'])} Lv.${sortedDemonData[specialDemonIndex1][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex1][0])}`,
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex2][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex2][1]['race'])} Lv.${sortedDemonData[specialDemonIndex2][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex2][0])}`,
              ]
            )
          }
        }
      )
    }
    if (0 < demonIndex && demonIndex < sameRaceDemon.length - 1) {
      // console.log(sameRaceDemon[demonIndex - 1], targetDemonName(), sameRaceDemon[demonIndex + 1])
      elementTableData['table'][elementTableIndex].forEach(
        (result, index) => {
          if (result === 1) {
            const specialDemonIndex1 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === elementTableData['elems'][index])
            const specialDemonIndex2 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === sameRaceDemon[demonIndex - 1][0])
            elementList.push(
              [
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex1][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex1][1]['race'])} Lv.${sortedDemonData[specialDemonIndex1][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex1][0])}`,
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex2][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex2][1]['race'])} Lv.${sortedDemonData[specialDemonIndex2][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex2][0])}`,
              ]
            )
          }
          if (result === -1) {
            const specialDemonIndex1 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === elementTableData['elems'][index])
            const specialDemonIndex2 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === sameRaceDemon[demonIndex + 1][0])
            elementList.push(
              [
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex1][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex1][1]['race'])} Lv.${sortedDemonData[specialDemonIndex1][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex1][0])}`,
                `${isDemonUnlocks(sortedDemonData[specialDemonIndex2][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex2][1]['race'])} Lv.${sortedDemonData[specialDemonIndex2][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex2][0])}`,
              ]
            )
          }
        }
      )
    }
    return elementList
  }
  return;
  // const maxIterations = Math.max(...elementTableData['elems'].map(row => row.length))
}

function getReverseFusionList() {
  const fusionList: string[][] = []

  if (isDemonEvolutions(targetDemonName())) {
    return fusionList
  }

  const specialList = getSpecialList()
  // TODO: move to getSpecialList()
  if (specialList) {
    specialList.forEach(specialRecipe => {
      const specialDemonName1 = specialRecipe[0]
      const specialDemonName2 = specialRecipe[1]
      const specialDemonIndex1 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === specialDemonName1)
      const specialDemonIndex2 = sortedDemonData.findIndex((demonData: [string, any]) => demonData[0] === specialDemonName2)
      // console.log(specialRecipe, specialDemonName1, specialDemonIndex1, specialDemonName2, specialDemonIndex2, sortedDemonData)

      fusionList.push(
        [
          `${isDemonUnlocks(sortedDemonData[specialDemonIndex1][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex1][1]['race'])} Lv.${sortedDemonData[specialDemonIndex1][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex1][0])}`,
          `${isDemonUnlocks(sortedDemonData[specialDemonIndex2][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[specialDemonIndex2][1]['race'])} Lv.${sortedDemonData[specialDemonIndex2][1]['lvl']} ${getTranslateName(sortedDemonData[specialDemonIndex2][0])}`,
        ]
      )
    })
  }

  const elementList = getElementList()
  console.log(elementList)
  if (elementList) {
    elementList.forEach(elementRecipe => {
      fusionList.push(elementRecipe)
    })
    // fusionList.push([...elementList])
  }

  const lvlRange = getLvlRange()
  if (!lvlRange.length) return fusionList

  const racePairs = getRacePairs()
  // optimize?
  // filter with checked demon
  for (let i = 0; i < racePairs.length; i++) {
    // console.log(racePairs[i])
    for (let j = 0; j < sortedDemonData.length; j++) {
      for (let k = 0; k < sortedDemonData.length; k++) {
        if (sortedDemonData[j][1]['race'] === racePairs[i][0] && sortedDemonData[k][1]['race'] === racePairs[i][1]) {
          const lvlSum = sortedDemonData[j][1]['lvl'] + sortedDemonData[k][1]['lvl']
          if (lvlRange[0] <= lvlSum && lvlSum < lvlRange[1]) {
            fusionList.push(
              [
                `${isDemonUnlocks(sortedDemonData[j][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[j][1]['race'])} Lv.${sortedDemonData[j][1]['lvl']} ${getTranslateName(sortedDemonData[j][0])}`,
                `${isDemonUnlocks(sortedDemonData[k][0]) ? '☆' : ''}${getTranslateName(sortedDemonData[k][1]['race'])} Lv.${sortedDemonData[k][1]['lvl']} ${getTranslateName(sortedDemonData[k][0])}`
              ]
            )
          }
        }
      }
    }
  }

  return fusionList
}

interface OnReadyProps {
  (props: {
    showModal: (key: string, value: any) => void;
    close: () => void;
  }): void;
}

const ReverseFusionList = ({ onReady, onClose }: { onReady: OnReadyProps, onClose: () => void }) => {
  let dialogRef: HTMLDialogElement
  // const [isClosing, setIsClosing] = createSignal(false)
  // skip kv declaration and get list in showModal()?
  // const [key, setKey] = createSignal('')
  // const [value, setValue] = createSignal('')
  const [targetDemonName_d, setTargetDemonName_d] = createSignal("")
  const [result, setResult] = createSignal<string[][]>([])

  onMount(() => {
    if (onReady && dialogRef) {
      onReady({
        showModal: (key: string, value: any) => {
          // setIsClosing(false)
          setTargetDemonName(key)
          setTargetDemonRace(value)
          setResult([...getReverseFusionList()])
          setTargetDemonName_d(getTranslateName(key))
          dialogRef.showModal()
        },
        close: () => {
          // setIsClosing(true)
          // setTimeout(() => {
          //   dialogRef.close()
          //   setIsClosing(false)
          // }, 200)
          dialogRef.close()
        }
      })
    }
  })

  return (
    <dialog
      ref={el => (dialogRef = el)}
      // class={isClosing() ? 'closing' : 'opening'}
      onCancel={(e) => {
        e.preventDefault()
        onClose?.()
      }}
      onClick={() => {
        onClose?.()
      }}
    >
      <div
        class="flex flex-col"
        onClick={(e) => {
          e.stopPropagation()
        }}>
        {/* <p>{key}: {value}</p> */}
        <div class="m-atuo pb-2 text-lg text-center bg-black">{targetDemonName_d()}</div>
        <Show
          when={result().length !== 0}
          fallback={
            <div class="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-[1em]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          }
        >
          <For each={result()}>{(item) => {
            return <div class="grid grid-cols-[1fr_1em_1fr] gap-2 items-center text-center border-0 border-b border-dotted border-gray last:border-b-0">
              <span class="break-keep text-nowrap">
                {item[0]}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-[1em]">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
              <span class="break-keep text-nowrap">
                {item[1]}
              </span>
            </div>
          }
          }</For>
        </Show>
        {/* <p>{result}</p> */}
        {/* <button onClick={() => onClose?.()}>關閉</button> */}
      </div>
    </dialog>
  )
}

export default ReverseFusionList
