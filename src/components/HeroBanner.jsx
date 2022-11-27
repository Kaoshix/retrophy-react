import heroBanner from '../assets/images/heroBanner.svg';
import './HomePageAnimation.css';
export const HeroBanner = () => {
    return (
        <div className="flex justify-around mb-12 max-w-screen-xl m-auto">
            <div>
                <h1 className="text-6xl pt-20 mb-5 font-medium leading-tight">Play <span className="text-blue-700">retro games</span><br /> and earn <span className="text-blue-700">trophies</span></h1>
                <button><a href="#" className="button-anim px-6 py-2 bg-blue-700 rounded-full text-xl">Play now</a></button>
            </div>

            <div>
                <img src={heroBanner} alt="hero-banner"/>
            </div>
        </div>
    )
}