import { For } from 'solid-js'
import getTranslateName from './getTranslateName'

import fusionTableData from "./assets/smt3/fusion-chart.json"

import "./FusionTable.css"

const maxIterations = Math.max(...fusionTableData['table'].map(row => row.length))

const FusionTableHeader = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <For each={fusionTableData['races']}>{header =>
          <th class="outline outline-1 outline-white">
            {getTranslateName(header).substring(0, 2)}
          </th>
        }</For>
        <th></th>
      </tr>
    </thead>
  )
}

const FusionTableBody = () => {
  return (
    <tbody>
      <For each={new Array(maxIterations)}>{(_, i) =>
        <tr>
          <td class="outline outline-1 outline-white">
            {getTranslateName(fusionTableData['races'][i()]).substring(0, 2)}
          </td>
          <For each={fusionTableData['table']}>{(_, j) =>
            <td class="hover:text-purple-400 hover:bg-white-300"
              classList={{
                'text-red-400': getTranslateName(fusionTableData['table'][j()][i()]) === 'フレイミーズ',
                'text-blue-400': getTranslateName(fusionTableData['table'][j()][i()]) === 'アクアンズ',
                'text-yellow-400': getTranslateName(fusionTableData['table'][j()][i()]) === 'アーシーズ',
                'text-green-400': getTranslateName(fusionTableData['table'][j()][i()]) === 'エアロス',
                'text-slate-500': getTranslateName(fusionTableData['table'][j()][i()]) === '妖魔'
                  || getTranslateName(fusionTableData['table'][j()][i()]) === '妖精'
                  || getTranslateName(fusionTableData['table'][j()][i()]) === '夜魔'
                  || getTranslateName(fusionTableData['table'][j()][i()]) === '魔王'
              }}
            >
              {getTranslateName(fusionTableData['table'][j()][i()])
                ? getTranslateName(fusionTableData['table'][j()][i()]).substring(0, 2)
                : j() >= i() ? '－' : ''}
            </td>
          }</For>
          <td class="outline outline-1 outline-white">
            {getTranslateName(fusionTableData['races'][i()]).substring(0, 2)}
          </td>
        </tr>
      }</For>
    </tbody>
  )
}

const FusionTable = () => {
  return <>
    <table class="text-center break-keep outline outline-1 outline-white fusiontable">
      <FusionTableHeader />
      <FusionTableBody />
      <FusionTableHeader />
    </table>
  </>
}

export default FusionTable