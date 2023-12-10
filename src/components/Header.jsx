import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Header() {
    const {loading, cartItems} = useSelector(state => state.cart)
    return (
        <header>
            <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-red-800 text-white">
            <Link href="/" className="text-lg font-bold">
                    JBU 쇼핑몰
                </Link>
                <div>
                    <span className="cart-badge">
                    { loading ? '' : cartItems.reduce((a,c) => a+c.qty, 0)}
                    </span>
                    <Link href="/cart">카트</Link>
                </div>
            </nav>
        </header>
    )
}
