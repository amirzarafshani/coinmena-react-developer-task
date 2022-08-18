import React, { useState, useCallback, useEffect } from 'react'
import AssetsSelectBox from './partials/AssetsSelectBox'
import { SelectorIcon } from '@heroicons/react/solid'
import './style.scss'

const Trade: React.FC = () => {
  const [isSwapped, setIsSwapped] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(undefined);
  const [amount, setAmount] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const handleSelectCoin = (val: any) => {
    setSelectedCoin(val);
    setPrice(val.price_usd)
  }

  const onSwap = useCallback(() => {
    setIsSwapped((state) => !state);
  }, []);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  }

  const handleChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(parseFloat(e.target.value));
  }

  useEffect(() => {
    if (price > 0) {
      if (isSwapped) {
        setAmount(total / price)
      } else {
        setTotal(price * amount)
      }
    }
  }, [amount, total, price])

  const container = () => [
    <div key="amount-container" className={`flex flex-col justify-between bg-gray-50 rounded-2xl px-5 py-4 ${!isSwapped ? '-mb-2.5' : '-mt-2.5'}`}>
      <div className='flex items-center justify-between'>
        <span>
          <input
            type="text"
            inputMode="decimal"
            disabled={isSwapped}
            name="price"
            id="price"
            className="trade-input w-40"
            placeholder="0.0"
            onChange={handleChangeAmount}
            value={amount > 0 ? amount : ''}
          />
        </span>
        <AssetsSelectBox onChange={handleSelectCoin} value={selectedCoin} />
      </div>
    </div>,
    <div key="swap-container" className="w-full flex justify-center -mt-2 -mb-2 z-10">
      <button onClick={onSwap} className="bg-gray-50 hover:bg-gray-100 border-4
       border-white text-black text-center rounded-full h-10 w-10 inline-flex items-center justify-center">
        <SelectorIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
    </div>
    ,
    <div key="total-container" className={`relative shadow-sm z-0 bg-gray-50 rounded-2xl px-5 py-4 ${isSwapped ? '-mb-2.5' : '-mt-2.5'}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input type="text" inputMode="decimal" className="trade-input w-full"
        placeholder="0.0" onChange={handleChangeTotal} value={total > 0 ? total : ''} disabled={!isSwapped} />
    </div>,
  ];

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='bg-white rounded-xl shadow-lg w-96 p-5'>
        <div className="flex flex-col">
          {isSwapped ? container().reverse() : container()}
        </div>
      </div>
    </div>
  )
}

export default Trade