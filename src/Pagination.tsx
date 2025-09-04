import { useDemonDataContext } from './DemonDataContext'

const Pagination = () => {
  const { tab, updateTab } = useDemonDataContext()
  return (
    <ul class="p-0 grid grid-flow-col auto-cols-fr text-center list-none gap-4">
      <li
        classList={{
          'bg-blue-600': tab() === 0,
          'bg-gray-800 hover:text-gray-50 hover:bg-gray-700 cursor-pointer': tab() !== 0,
        }}
        class="px-4 py-3 rounded-lg"
        onClick={updateTab(0)}
      >
        List
      </li>
      <li
        classList={{
          'bg-blue-600': tab() === 1,
          'bg-gray-800 hover:text-gray-50 hover:bg-gray-700 cursor-pointer': tab() !== 1,
        }}
        class="px-4 py-3 rounded-lg"
        onClick={updateTab(1)}
      >
        Table
      </li>
      <li
        classList={{
          'bg-blue-600': tab() === 2,
          'bg-gray-800 hover:text-gray-50 hover:bg-gray-700 cursor-pointer': tab() !== 2,
        }}
        class="px-4 py-3 rounded-lg"
        onClick={updateTab(2)}
      >
        About
      </li>
    </ul>
  )
}

export default Pagination