'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Download, Eye, X } from 'lucide-react';

interface SessionDetails {
    id: string;
    customer_details: {
        name: string;
        email: string;
    };
    amount_total: number;
    currency: string;
    line_items: Array<{
        id: string;
        description: string;
        amount_total: number;
        quantity: number;
        currency: string;
    }>;
    created: number;
}

function SuccessPageContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams?.get('session_id');
    const [session, setSession] = useState<SessionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (sessionId) {

            fetch(`/api/get-session-details?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    setSession(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching session:', err);
                    setLoading(false);
                });


            fetch('/api/sync-statement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            }).then(res => res.json())
                .then(res => console.log('Sync result:', res))
                .catch(err => console.error('Sync error:', err));
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="bg-green-500/10 p-6 rounded-full inline-block mb-4">
                    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-green-500">Payment Successful!</h1>
                <p className="text-xl text-gray-300">Thank you for your purchase. Your booking has been confirmed.</p>

                {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                        <span className="ml-2">Loading details...</span>
                    </div>
                ) : session ? (
                    <div className="flex flex-col gap-4 mt-8">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 px-6 py-3 rounded-md font-bold text-white hover:bg-white/20 transition-all"
                        >
                            <Eye size={20} />
                            Preview Statement
                        </button>
                    </div>
                ) : null}

                <div className="pt-4">
                    <Link href="/trip-planner" className="inline-block bg-orange-500 px-8 py-3 rounded-md font-bold text-white hover:bg-orange-600 transition-colors">
                        Return to Trip Planner
                    </Link>
                </div>
            </div>

            {showPreview && session && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 print:p-0 print:bg-white">
                    <div className="bg-white text-black w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:rounded-none">
                        <div className="flex justify-between items-center p-6 border-b print:hidden">
                            <h2 className="text-xl font-bold">Statement Preview</h2>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                                >
                                    <Download size={18} />
                                    Download / Print
                                </button>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div id="preview-content" className="p-8 overflow-y-auto print:overflow-visible bg-white">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <p className="text-sm text-gray-500">Official Payment Statement</p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="font-bold">Date:</p>
                                    <p>{new Date(session.created * 1000).toLocaleDateString()}</p>
                                    <div className="mt-4">
                                        <p className="font-bold">Status:</p>
                                        <p className="text-green-600 font-bold uppercase tracking-wide">Paid</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-12">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customer Details</h3>
                                    <p className="text-lg font-bold">{session.customer_details.name}</p>
                                    <p className="text-gray-600">{session.customer_details.email}</p>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Transaction ID</h3>
                                    <p className="text-sm font-mono text-gray-500">{session.id}</p>
                                </div>
                            </div>

                            <table className="w-full mb-12">
                                <thead>
                                    <tr className="border-b-2 border-gray-100 italic">
                                        <th className="text-left py-4 font-bold text-gray-600">Description</th>
                                        <th className="text-center py-4 font-bold text-gray-600">Qty</th>
                                        <th className="text-right py-4 font-bold text-gray-600">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {session.line_items.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-50">
                                            <td className="py-4 font-medium">{item.description}</td>
                                            <td className="text-center py-4">{item.quantity}</td>
                                            <td className="text-right py-4">
                                                {(item.amount_total / 100).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: item.currency.toUpperCase()
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2} className="text-right py-8 font-bold text-xl uppercase tracking-tighter">Total Amount</td>
                                        <td className="text-right py-8 font-black text-2xl text-orange-500">
                                            {(session.amount_total / 100).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: session.currency.toUpperCase()
                                            })}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="mt-12 pt-8 border-t text-center space-y-2">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Thank you for your purchase</p>
                                <p className="text-xs text-gray-400">This is a system generated statement and does not require a physical signature.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #preview-content, #preview-content * {
                        visibility: visible;
                    }
                    .print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <SuccessPageContent />
        </Suspense>
    );
}
