import Link from 'next/link';

export default function CartPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h1 className="text-4xl font-bold mb-4 text-red-500">Payment Cancelled</h1>
            <p className="mb-8 text-xl">You cancelled the checkout. No charges were made.</p>
            <Link href="/trip-planner" className="bg-orange-500 px-6 py-3 rounded-md font-bold text-white hover:bg-orange-600">
                Return to Trip Planner
            </Link>
        </div>
    );
}
