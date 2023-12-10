'use client'

import CheckoutWizard from '@/components/CheckoutWizard'
import { saveShippingAddress } from '@/redux/slices/cartSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

export default function ShippingAddressPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.fullName)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    )
    router.push('/payment')
  }

  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold">주문 주소</h1>
        <div className="mb-4">
          <label htmlFor="fullName">성함</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message} </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">주소</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please enter shipping address',
              minLength: {
                value: 3,
                message: 'Address is more than 2 chars',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message} </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city">도시</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message} </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode">우편주소</label>
          <input
            className="w-full"
            id="postalCode"
            autoFocus
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message} </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="country">국가</label>
          <input
            className="w-full"
            id="country"
            autoFocus
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message} </div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="primary-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  )
}