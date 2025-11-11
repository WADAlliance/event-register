import React from "react"; 

type OverlayProps = { hoveredId: string; }; 

export const Overlay: React.FC<OverlayProps> = ({ hoveredId }) => { 
    return ( 
        <div className={`fixed inset-0 bg-black z-20 pointer-events-none ${hoveredId ? "opacity-70 transition-opacity duration-700" : "opacity-0 transition-opacity duration-500"}`} /> 
    ); 
};