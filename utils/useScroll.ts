import { useEffect, useState } from "react";

export default function useScroll() {
    const [position,setPosition] = useState({
        x: 0,
        y: 0
    });


    const handleScroll = () => {
        const { scrollX, scrollY } = window
        setPosition({
            x: scrollX,
            y: scrollY
        })
    }

    useEffect(() => {
        window.addEventListener("scroll",handleScroll,{passive: true})

        return () => {
            window.removeEventListener("scroll",handleScroll)
        }
    },[])

    return position
}