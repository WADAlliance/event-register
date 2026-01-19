import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react";
import { BsCalendarWeek } from "react-icons/bs";

const EventsPopup: React.FC = ({ }) => {
    const [isClosed, setIsClosed] = useState<boolean>(true);
    const [eventsPopupSize, setEventsPopupSize] = useState({ width: '400px', height: '600px' });
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const iframeSrc = "https://luma.com/embed/calendar/cal-mMv09Bxp5nlgaCw/events";
    const [isMobile, setIsMobile] = useState<boolean>(false);


    useEffect(() => {
        setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);


        const updateDimensions = () => {
            if (window.innerWidth <= 420) {
                setEventsPopupSize({ width: '90vw', height: '70vh' });
            } else {
                setEventsPopupSize({ width: '400px', height: '600px' });
            }
        };

        updateDimensions();


        window.addEventListener('resize', updateDimensions);


        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    useEffect(() => {
        const preloadIframe = document.createElement('iframe');
        preloadIframe.src = iframeSrc;
        preloadIframe.style.display = 'none';
        document.body.appendChild(preloadIframe);


        iframeRef.current = preloadIframe;


        return () => {
            document.body.removeChild(preloadIframe);
        };
    }, []);

    const handleTap = () => {
        setIsClosed(!isClosed);
    };

    const variants = {
        closed: {
            transition: { duration: 0.5 },
            cursor: 'pointer',
            padding: '8px',
            width: isMobile ? '115px' : '175px',
            height: isMobile ? '35px' : '60px',
        },
        open: {
            width: eventsPopupSize.width,
            height: eventsPopupSize.height,
            transition: { duration: 0.5 },
            cursor: 'default',
            padding: '0px',
            overflow: 'hidden',
        }
    }

    const variantsPopupLabel = {
        open: {
            transition: { duration: 0.5 },
            opacity: 0,
        },
        closed: {
            transition: { duration: 0.5 },
            opacity: 1,
        }
    }

    return (
        <motion.div
            variants={variants}
            initial="closed"
            animate={isClosed ? "closed" : "open"}
            className={`fixed bottom-10 left-5 md:left-10 bg-black text-white flex items-center 
                justify-end cursor-pointer border-white border rounded-md z-30
            `}
            onTap={handleTap}
            onHoverEnd={() => { setIsClosed(true) }}
            onHoverStart={() => { setIsClosed(false) }}
            onPointerLeave={() => { setIsClosed(false) }}
        >
            <motion.div
                variants={variantsPopupLabel}
                initial="closed"
                animate={isClosed ? "closed" : "open"}
                className={`flex items-center absolute pointer-events-none ${isMobile ? 'text-sm bottom-2 left-3' : 'text-xl bottom-4 left-6'}`}
            >
                <BsCalendarWeek className="mr-4 text-white" />
                <p>Next up...</p>
            </motion.div>
            <div className="flex flex-col items-center h-full w-full">
                <div className="flex-grow w-full" style={{ display: isClosed ? 'none' : 'block' }}>
                    <iframe
                        ref={iframeRef}
                        src={iframeSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
                <motion.div className="w-full h-auto pt-1 pb-1" onTap={handleTap} style={{ display: isClosed || window.innerWidth > 420 ? 'none' : 'block' }}>
                    <p className="text-center">Close</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EventsPopup;