'use client'
import CheckoutWizard from '@/components/CheckoutWizard'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function PlaceOrderScreen() {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  } = useSelector((state) => state.cart)
  const router = useRouter()

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')
    }
  }, [paymentMethod, router])

  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl font-bold">Place Order</h1>
      {loading ? (
        <div>Loading</div>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <Link className="bg-red-200 p-2 rounded-md" href="/">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">주문자 정보 및 주소</h2>
              <div>
                이름 : {shippingAddress.fullName}, 
                주소 : {shippingAddress.address},
                도시 : {shippingAddress.city}, 
                우편번호 : {shippingAddress.postalCode},
                국가 : {shippingAddress.country}
              </div>
              <div>
                <Link
                  className="default-button inline-block mt-2"
                  href="/shipping"
                >
                  편집
                </Link>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">결제방식</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link
                  className="default-button inline-block mt-2"
                  href="/payment"
                >
                  편집
                </Link>
              </div>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">주문 목록</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">상품</th>
                    <th className="    p-5 text-right">수량</th>
                    <th className="  p-5 text-right">가격</th>
                    <th className="p-5 text-right">총합</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                            className="p-1"
                          ></Image>
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="default-button inline-block mt-2" href="/cart">
                  편집
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">주문 목록</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>상품가격</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>세금</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>배송료</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>총합</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => alert('Not implemented')}
                    className="primary-button w-full"
                  >
                    주문하러가기
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}