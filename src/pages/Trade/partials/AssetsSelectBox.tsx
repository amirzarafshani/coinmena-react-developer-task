import { Fragment, useState, useEffect, useMemo, memo } from 'react'
import axios from 'axios';
import { Combobox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'
import { useQuery } from 'react-query';
import CoinIcon from '../../../components/CoinIcon';
import { SelectOptionProps, AssetsSelectBoxProps } from '../../../interfaces'

const getAssets = () => {
  return axios.get(`https://data.messari.io/api/v2/assets?fields=id,name,slug,symbol,metrics/market_data/price_usd&limit=100`)
};

const AssetsSelectBox: React.FC<AssetsSelectBoxProps> = ({ value, onChange }) => {
  const [query, setQuery] = useState('')
  const [assets, setAssets] = useState<SelectOptionProps[]>([])

  const {
    data,
    isLoading,
  } = useQuery(
    'assets-list',
    async () => await getAssets(),
    {
      refetchInterval: 5000
    }
  );

  useEffect(() => {
    if (isLoading) return;

    const selectOptions = data?.data?.data?.filter((item: any) => item.symbol != null).map((item: any) => ({
      value: item.id,
      symbol: item.symbol,
      name: item.name,
      price_usd: item.metrics?.market_data?.price_usd,
    }));

    setAssets(selectOptions)

    // add first coin value
    if (!value) {
      handleSelectCoin(selectOptions[0]);
    } else (
      handleSelectCoin(selectOptions.find((el: SelectOptionProps) => el.value === value.value))
    )
  }, [data]);

  const filteredAssets =
    query === ''
      ? assets
      : assets?.filter((item) =>
        item.symbol
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const handleSelectCoin = (val: any) => {
    onChange(val)
  }

  return (
    <Combobox value={value} onChange={handleSelectCoin}>
      <div className="relative z-20">
        <div className="relative w-32 cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2  sm:text-sm">
          <label htmlFor="query" className="absolute pl-2 pt-1.5">
            {value && value.value && (
              <CoinIcon className='w-6 h-6' id={value.value} />
            )}
          </label>
          <Combobox.Input
            className=" border-none py-2 pr-10 pl-10 text-sm leading-5 text-gray-900 bg-gray-200 focus:ring-0 focus:outline-none"
            displayValue={(item: SelectOptionProps) => item?.symbol}
            onChange={(event) => setQuery(event.target.value)}
            name="query"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredAssets.length === 0 || isLoading ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredAssets.map((asset: any) => (
                <Combobox.Option
                  key={asset.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={asset}
                >
                  {({ selected, active }) => (
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <CoinIcon className='w-6 h-6' id={asset.value} />
                        <span className='text-sm font-bold'>{asset.symbol}</span>
                      </div>
                    </span>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>

  )
}

export default AssetsSelectBox

