// *TODO:
// [ ] check first reverse search
// [ ] filter
// [ ] save

import { useDemonDataContext } from './DemonDataContext'

const Toolbar = () => {
  const { check, moveCheckedBelow, setMoveCheckedBelow } = useDemonDataContext()
  return (
    <div class="p-2 fixed bottom-0 left-[50%] translate-x-[-50%] flex flex-col items-center border-1 border-solid border-gray-600 bg-black">
      <div class="mb-1 flex gap-2 text-nowrap">
        <label for="Move Checked Below">
          <input
            id="Move Checked Below"
            type="checkbox"
            checked={moveCheckedBelow()}
            onChange={(e) => setMoveCheckedBelow(e.target.checked)}
          />
          <span>Move Checked Below</span>
        </label>
        <label for="Checked First Reverse Search">
          <input
            id="Checked First Reverse Search"
            type="checkbox"
            checked={false}
            onChange={(e) => {e.target.checked}}
            disabled
          />
          <span>Checked First Reverse Search</span>
        </label>
      </div>
      <div class="flex text-nowrap">
        <input type="text" placeholder='Search' disabled />
        <p class="m-0 px-2">Remaining: {Object.entries(check()).filter(kv => !kv[1]).length}/{Object.entries(check()).length}({Math.floor((Object.entries(check()).filter(kv => kv[1]).length / Object.entries(check()).length) * 100)}%)</p>
        <button
        onClick={() => { }}>Save</button>
      </div>
    </div>
  )
}

export default Toolbar