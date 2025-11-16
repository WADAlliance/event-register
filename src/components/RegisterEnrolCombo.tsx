//import RegisterForHackathonButton from '@/components/RegisterForHackathonButton';
import Link from 'next/link';

export default function RegisterEnrolButton() {
    return (
        <div className="flex font-telegraf flex-row space-y-4 md:gap-4 text-center items-center justify-center">
      <button className="bg-wada-g w-[85px] h-11 gap-[10px] flex items-center justify-center rounded-md pt-[15px] pr-5 pb-[15px] pl-5">                                                                                                                                                                                                                                   
        <Link
            href="/enrolment"
            className=" text-base font-extrabold 
                        leading-[14px] tracking-tighter 
                        text-white"
        >
                Enroll
            </Link>
            </button>
        </div>
    );
}
