import { useDispatch, useSelector } from 'react-redux'
import useCustomLogin from '../../hooks/useCustomLogin'
import useCustomCart from '../../hooks/useCustomCart'
import { useEffect, useMemo } from 'react'
import { getCartItemsAsync } from '../../slices/cartSlice'
import CartItemComponent from '../cart/CartItemComponent'

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin()
  const { refreshCart, cartItems, changeCart } = useCustomCart()
  const total = useMemo(() => {
    let total = 0
    for (const item of cartItems) {
      total += item.price * item.qty
    }
    return total
  }, [cartItems])

  useEffect(() => {
    if (isLogin) {
      refreshCart()
    }
  }, [isLogin])

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="flex w-full">
            <div className="m-2"> {loginState.nickname}'s Cart</div>
            <div className="w-5 m-2 font-bold text-center text-white bg-blue-500 ibm-rounded-md">
              {cartItems.length}
            </div>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-right">
              TOTAL: {total}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default CartComponent
