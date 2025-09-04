import { For } from 'solid-js'
import getTranslateName from './getTranslateName'

import elementTableData from "./assets/smt3/element-chart.json"

const maxIterations = Math.max(...elementTableData['pairs'].map(row => row.length))

const ElementTableHeader = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <For each={elementTableData['elems']}>{header =>
          <th class="outline outline-1 outline-white"
            classList={{
              'text-red-400': getTranslateName(header) === 'フレイミーズ',
              'text-blue-400': getTranslateName(header) === 'アクアンズ',
              'text-yellow-400': getTranslateName(header) === 'アーシーズ',
              'text-green-400': getTranslateName(header) === 'エアロス',
            }}>
            {getTranslateName(header).substring(0, 2)}
          </th>
        }</For>
        <For each={elementTableData['races']}>{header =>
          <th class="outline outline-1 outline-white"
            classList={{
              'text-red-400': getTranslateName(header) === 'フレイミーズ',
              'text-blue-400': getTranslateName(header) === 'アクアンズ',
              'text-yellow-400': getTranslateName(header) === 'アーシーズ',
              'text-green-400': getTranslateName(header) === 'エアロス',
            }}>
            {getTranslateName(header).substring(0, 2)}
          </th>
        }</For>
        <th></th>
      </tr>
    </thead>
  )
}

const ElementTableBody = () => {
  return (
    <tbody>
      <For each={new Array(maxIterations)}>{(_, i) =>
        <tr>
          <td class="outline outline-1 outline-white"
            classList={{
              'text-red-400': getTranslateName(elementTableData['elems'][i()]) === 'フレイミーズ',
              'text-blue-400': getTranslateName(elementTableData['elems'][i()]) === 'アクアンズ',
              'text-yellow-400': getTranslateName(elementTableData['elems'][i()]) === 'アーシーズ',
              'text-green-400': getTranslateName(elementTableData['elems'][i()]) === 'エアロス',
            }}>
            {getTranslateName(elementTableData['elems'][i()]).substring(0, 2)}
          </td>
          {/* 御魂合成 */}
          <For each={elementTableData['pairs']}>{(_, j) =>
            <td class="hover:text-purple-400 hover:bg-white-300">
              {getTranslateName(elementTableData['pairs'][j()][i()])
                ? getTranslateName(elementTableData['pairs'][j()][i()]).substring(0, 2)
                : j() >= i() ? '－' : ''}
            </td>
          }</For>
          {/* 精霊合成 */}
          <For each={elementTableData['table']}>{(_, _j) =>
            <td class="hover:text-purple-400 hover:bg-white-300"
            classList={{
              'text-blue-400': _[i()] > 0,
              'text-red-400': _[i()] < 0,
            }}>
              {_[i()] > 0 ? '▲' : '▼'}
            </td>
          }</For>
          <td class="outline outline-1 outline-white"
            classList={{
              'text-red-400': getTranslateName(elementTableData['elems'][i()]) === 'フレイミーズ',
              'text-blue-400': getTranslateName(elementTableData['elems'][i()]) === 'アクアンズ',
              'text-yellow-400': getTranslateName(elementTableData['elems'][i()]) === 'アーシーズ',
              'text-green-400': getTranslateName(elementTableData['elems'][i()]) === 'エアロス',
            }}>
            {getTranslateName(elementTableData['elems'][i()]).substring(0, 2)}
          </td>
        </tr>
      }</For>
    </tbody>
  )
}

const ElementTable = () => {
  return <>
    <table class="text-center break-keep outline outline-1 outline-white fusiontable">
      <ElementTableHeader />
      <ElementTableBody />
      <ElementTableHeader />
    </table>
  </>
}

export default ElementTable