import { API_SERVER_HOST } from '../../api/todoApi'

const host = API_SERVER_HOST
const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
}) => {
  const handleClickQty = (amount) => {
    changeCart({ email, cino, pno, qty: qty + amount })
  }
  return (
    <li key={cino} className="border-b">
      <div className="flex gap-3 p-3">
        <img
          className="object-cover w-20 h-20 rounded"
          src={`${host}/api/products/view/s_${imageFile}`}
          alt={pname}
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="text-sm font-semibold">{pname}</div>
            <div className="text-xs text-gray-500">{price.toLocaleString()} 원</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 text-sm bg-blue-300 ibm-rounded-md"
                onClick={() => handleClickQty(-1)}
              >
                -
              </button>
              <span className="w-6 text-sm text-center">{qty}</span>
              <button
                className="w-7 h-7 text-sm bg-blue-300 ibm-rounded-md"
                onClick={() => handleClickQty(1)}
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">
                {(qty * price).toLocaleString()} 원
              </span>
              <button
                className="w-7 h-7 text-xs font-bold text-white bg-red-500 ibm-rounded-md"
                onClick={() => handleClickQty(-1 * qty)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
export default CartItemComponent
