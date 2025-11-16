//import RegisterForHackathonButton from '@/components/RegisterForHackathonButton';
import Link from 'next/link';

export default function RegisterEnrolButton() {
    return (
        <div className="flex font-telegraf flex-row space-y-4 md:gap-4 text-center items-center justify-center">
            <Link href="/enrolment">
                <button className="bg-[#2ca0d9] hover:opacity-90 transition-all duration-300 px-8 py-3 rounded-md shadow-lg hover:shadow-xl cursor-pointer">
                    <span className="text-white text-lg font-extrabold tracking-tight">
                        Enroll
                    </span>
                </button>
            </Link>
        </div>
    );
}
