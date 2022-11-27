import './HomePageAnimation.css';

export const Category = ({ category }) => {
    return (
        <div className="w-1/4 px-4" key={category.id}>
            <a href="" className="flex items-center relative w-full hero-scale">
                <img src={category.image} alt="category" className="opacity-30 w-full" />
                <p className="absolute left-3 text-[2.2vw]">{category.name}</p>
                <img src={category.hero} alt="hero" className="absolute bottom-0 right-0 w-3/6" />
            </a>
        </div>
    )
}