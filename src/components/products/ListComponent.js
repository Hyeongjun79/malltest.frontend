import { useEffect, useState } from 'react'
import { getList } from '../../api/productsApi'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
import { API_SERVER_HOST } from '../../api/todoApi'
import PageComponent from '../common/PageComponent'
import useCustomLogin from '../../hooks/useCustomLogin'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const host = API_SERVER_HOST
const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
}

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove()
  const { exceptionHandle, moveToLoginReturn } = useCustomLogin()
  const [fetching, setFetching] = useState(false)
  const { isFetching, data, error, isError } = useQuery({
    queryKey: ['products/list', { page, size, refresh }],
    queryFn: () => getList({ page, size }),
    staleTime: 1000 * 60,
  })

  const handleClickPage = (pageParam) => {
    moveToList(pageParam)
  }
  if (isError) {
    console.log(error)
    return moveToLoginReturn()
  }

  const serverData = data || initState

  return (
    <div className="mt-8">
      {isFetching ? <FetchingModal /> : <></>}
      <div className="grid grid-cols-1 gap-px border md:grid-cols-2 xl:grid-cols-4 bg-ibm-hairline border-ibm-hairline">
        {serverData.dtoList.map((product) => (
          <div
            key={product.pno}
            className="p-6 transition-colors cursor-pointer bg-ibm-canvas hover:bg-ibm-surface-1"
            onClick={() => moveToRead(product.pno)}
          >
            <div className="mb-2 ibm-e-14">No. {product.pno}</div>
            <div className="w-full overflow-hidden">
              <img
                alt="product"
                className="m-auto ibm-rounded-md w-60"
                src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
              />
            </div>
            <div className="mb-6 font-light ibm-ct-24 text-ibm-ink">
              {product.pname}
            </div>
            <div className="pt-4 border-t ibm-bsm-14 text-ibm-ink-muted border-ibm-hairline">
              가격: {product.price}
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={handleClickPage}
      ></PageComponent>
    </div>
  )
}
export default ListComponent
