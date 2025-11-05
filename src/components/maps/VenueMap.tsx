interface VenueMapProps {
    className?: string;
}

export default function VenueMap({ className = "self-stretch h-52 rounded-[10px]" }: VenueMapProps) {
    return (
        <iframe 
            className={className}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.263838364847!2d36.8088793!3d-1.3117924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f103fd37ff4f9%3A0x7faa273cc55d6c7a!2sTamarind%20Tree%20Hotel!5e0!3m2!1sen!2ske!4v1234567890123" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
        />
    );
}
