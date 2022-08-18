import React from 'react'
import RowActionMenu from './RowActionMenu'
import { formatter } from '../../../helpers/helper'
import CoinIcon from '../../../components/CoinIcon'

export default function TableRow({ item }: any) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <CoinIcon id={item.id} />
          <span className='text-lg font-bold'>{item.name}</span>
          <span className='text-gray-400'>{item.symbol}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">{formatter.format(item?.metrics?.market_data?.price_usd)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <RowActionMenu />
      </td>
    </tr>
  )
}
