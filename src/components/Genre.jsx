import { useState } from "react";

export const Genre = ({ genre }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-[70vw] mb-20 md:w-[30vw] lg:w-[22vw] aspect-video relative flex items-center"
            style={{ backgroundImage: `url(${genre.backgroundImagePath})`, backgroundSize: 'cover' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <h2 className="ml-2 text-3xl md:text-xl lg:text-2xl">{genre.name}</h2>
            <img src={genre.overflowImagePath} alt={genre.name} className={`overflow-img absolute bottom-0 right-5 w-6/12 origin-bottom duration-300 ${isHovered ? 'scale-110' : ''}`} />
        </div>
    )
}