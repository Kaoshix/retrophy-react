import { useState } from "react";

export const Genre = ({ genre }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="max-w-[335px] h-[150px] m-auto flex items-center relative mt-10 md:w-[30vw] lg:w-[22vw]"
            style={{ backgroundImage: `url(${genre.backgroundImagePath})`, backgroundSize: 'cover' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <h2 className="ml-2 text-3xl md:text-xl lg:text-2xl">{genre.name}</h2>
            <img src={genre.overflowImagePath} alt={genre.name} className={`absolute bottom-0 right-5 w-6/12 origin-bottom duration-300 ${isHovered ? 'scale-110' : ''}`} />
        </div>
    )
}