import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import LoadingSpinner from '../../../../components/LoadingSpinner'
import TableSort from '../../../../components/TableSort'
import TableRow from '../TableRow'
import { AssetsResp, SortProps } from '../../../../interfaces'
import { comareByNameDESC, compareByNameASC, comareByPriceDESC, comareByPriceASC } from "../../../../helpers/sort"

const fetchData = (page: number) => {
  return axios.get(`https://data.messari.io/api/v2/assets?fields=id,name,slug,symbol,metrics/market_data/price_usd&limit=10&page=${page}`)
};

const AssetsTable: React.FC = () => {
  const [assets, setAssets] = useState<AssetsResp[]>([])
  const [sort, setSort] = useState<SortProps | any>(undefined)
  const { data, isSuccess, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    'assets',
    ({ pageParam = 1 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage
      },
      refetchInterval: 5 * 1000,
    }
  )

  useEffect(() => {
    if (!data?.pages) return;

    let dataItems: (AssetsResp[] | any) = data?.pages?.reduce((acc, page) => {
      return acc.concat(
        page.data.data.reduce((arr: AssetsResp[], asset: AssetsResp) => {
          return [...arr, asset]
        }, [])
      )
    }, [])

    switch (sort?.id) {
      case 'symbol':
        switch (sort?.asc) {
          case true:
            setAssets(dataItems.sort(compareByNameASC))
            break;
          case false:
            setAssets(dataItems.sort(comareByNameDESC))
            break;

          default:
            break;
        }
        break;
      case 'price':
        switch (sort?.asc) {
          case true:
            setAssets(dataItems.sort(comareByPriceASC))
            break;
          case false:
            setAssets(dataItems.sort(comareByPriceDESC))
            break;

          default:
            break;
        }
        break;
      default:
        setAssets(dataItems)
        break;
    }

  }, [data, sort])

  const onSortChange = (sort_: SortProps) => {
    setSort(sort_)
  }

  return (
    <React.Fragment>
      <h1 className='text-xl font-bold mb-5'>Crypto Assets</h1>
      <div className="shadow border-b border-gray-200 sm:rounded-lg bg-white">
        {isFetching && !data?.pages ? <LoadingSpinner /> :
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className="bg-gray-50">
              <tr>
                <th className='text-left px-6 py-4 whitespace-nowrap'>
                  <TableSort label="Asset" id="symbol" onSortChange={onSortChange} value={sort} />
                </th>
                <th className='text-left px-6 py-4 whitespace-nowrap w-1/3'>
                  <TableSort label="Price" id="price" onSortChange={onSortChange} value={sort} />
                </th>
                <th className='text-right px-6 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isSuccess && assets.map((item: any) => (<TableRow key={item.id} item={item} />))
              }
            </tbody>
          </table>}
        {isSuccess && hasNextPage && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md hover:bg-opacity-50 duration-300 shadow-xl mb-5"
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default AssetsTable
