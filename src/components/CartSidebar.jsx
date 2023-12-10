import { addToCart, removeFromCart } from '@/redux/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CartSidebar() {
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const pathname = usePathname()

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div
      className={
        loading
          ? ''
          : cartItems.length > 0 &&
            (pathname === '/' || pathname.indexOf('/product/') >= 0)
          ? 'fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-gary-700 overflow-scroll'
          : 'hidden'
      }
    >
      {loading ? (
        <div className="py-5 px-2">Loading... </div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2">카트가 비어있습니다.</div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-grey-600">
            <div>주문합계</div>
            <div className="font-bold text-orange-700">{itemsPrice}</div>
            <Link
              href="/cart"
              className="w-full text-center p-1 rounded-2xl border-2"
            >
              주문하기
            </Link>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-2 flex flex-col items-center border-b border-b-gray-600"
            >
              <Link href={`/product/${item.id}`} className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="p-1"
                />
              </Link>

              <select
                value={item.qty}
                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <button
                className="default-button mt-2"
                onClick={() => removeFromCartHandler(item.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}