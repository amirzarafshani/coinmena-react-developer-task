import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid'
import { TableSortProps } from '../../interfaces';

const TableSort: React.FC<TableSortProps> = ({ id, label, value, onSortChange }) => {

  const handleSortChange = () => {
    onSortChange({ id, asc: value ? !value.asc : true })
  }

  return (
    <a onClick={handleSortChange} className="select-none cursor-pointer flex items-center gap-2">
      <span>{label}</span>
      {value?.id === id &&
        (value.asc ?
          (
            <SortAscendingIcon className='w-4 h-4' />
          ) :
          (
            <SortDescendingIcon className='w-4 h-4' />
          ))
      }
    </a>
  )
}

export default TableSort;
