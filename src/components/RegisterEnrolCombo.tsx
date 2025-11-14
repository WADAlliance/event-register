import RegisterForHackathonButton from '@/components/RegisterForHackathonButton';
import Link from 'next/link';

export default function RegisterEnrolButton() {
    return (
        <div className="flex flex-row gap-2 md:gap-4 items-center justify-center">
        <RegisterForHackathonButton text="1. REGISTER" className="text-xs md:text-base md:!px-6 !px-3"/>
        <span className="text-white text-sm md:text-base">then</span>
        <Link
            href="/Enrollment"
            className="text-xs md:text-base bg-wada-b/60 border-2 border-wada-b text-white font-bold md:px-6 px-3 py-[0.5rem] rounded-full cursor-pointer hover:scale-105 transition duration-200 "
        >
                2. ENROL
            </Link>
        </div>
    );
}
