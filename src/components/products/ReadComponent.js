import { useState, useEffect } from 'react'
import { API_SERVER_HOST } from '../../api/todoApi'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
import { getOne } from '../../api/productsApi'
import useCustomCart from '../../hooks/useCustomCart'
import useCustomLogin from '../../hooks/useCustomLogin'
import { useQuery } from '@tanstack/react-query'

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: [],
}
const host = API_SERVER_HOST

const ReadComponent = ({ pno }) => {
  const { moveToList, moveToModify } = useCustomMove()
  const { changeCart, cartItems } = useCustomCart()
  const { loginState } = useCustomLogin()

  const { isFetching, data } = useQuery({
    queryKey: ['products', pno],
    queryFn: () => getOne(pno),
    staleTime: 1000 * 10,
    retry: 1,
  })

  const handleClickAddCart = () => {
    let qty = 1
    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0]
    if (addedItem) {
      if (
        window.confirm('이미 추가된 상품입니다. 추가하시겠습니까?') === false
      ) {
        return
      }
      qty = addedItem.qty + 1
    }
    changeCart({ email: loginState.email, pno: pno, qty: qty })
  }
  const product = data || initState

  return (
    <div className="mt-8 border border-ibm-hairline bg-ibm-canvas">
      {isFetching ? <FetchingModal /> : <></>}
      <div className="flex flex-col items-center justify-center w-full m-auto">
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="w-1/2 p-4"
            src={`${host}/api/products/view/${imgFile}`}
          />
        ))}
      </div>

      {makeRow('Pno', product.pno)}
      {makeRow('Desc', product.pdesc)}
      {makeRow('Name', product.pname)}
      {makeRow('Price', product.price)}

      <div className="flex justify-end gap-px p-6 border-t bg-ibm-hairline border-ibm-hairline">
        <button
          type="button"
          className="ibm-btn ibm-btn-secondary min-w-[160px]"
          onClick={handleClickAddCart}
        >
          Add Cart
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-secondary min-w-[160px]"
          onClick={() => moveToList()}
        >
          List
        </button>
        <button
          type="button"
          className="ibm-btn ibm-btn-primary min-w-[160px]"
          onClick={() => moveToModify(pno)}
        >
          Modify
        </button>
      </div>
    </div>
  )
}

const makeRow = (title, value) => (
  <div className="flex border-b border-ibm-hairline">
    <div className="w-1/4 px-6 py-5 border-r ibm-e-14 text-ibm-ink-muted bg-ibm-surface-1 border-ibm-hairline">
      {title}
    </div>
    <div className="w-3/4 px-6 py-5 ibm-b-16 text-ibm-ink">{value}</div>
  </div>
)

export default ReadComponent
