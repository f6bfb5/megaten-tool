import { For } from 'solid-js'

function MajinTable() {
  const majinData = [
    ['Lv.30 マタドール', '妖魔', '1/8〜HALF'],
    ['Lv.37 だいそうじょう', '夜魔', '6/8〜FULL'],
    ['Lv.42 ヘルズエンジェル', '妖精', 'HALF〜7/8'],
    ['Lv.52 ホワイトライダー', '妖魔', 'SILENT'],
    ['Lv.55 レッドライダー', '妖精', 'SILENT'],
    ['Lv.61 ブラックライダー', '夜魔', 'SILENT'],
    ['Lv.63 ペイルライダー', '魔王', 'SILENT'],
    ['Lv.69 マザーハロット', '魔王', 'HALF'],
    ['Lv.77 トランペッター', '魔王', 'FULL']
  ]

  return (
    <div class="p-2 border border-gray border-solid">
      <For each={majinData}>{(data) =>
        <div class="grid grid-flow-col auto-cols-fr hover:bg-[#242424]">
          <div>{data[0]}</div>
          <div class="text-center">{data[1]}</div>
          <div>{data[2]}</div>
        </div>
      }</For>
    </div>
  )
}

export default MajinTable