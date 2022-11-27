// CSS files and images
import './Animations.css';
import heroBanner from '../assets/images/heroBanner.svg';
import chevron from '../assets/images/chevron.svg';

// Datas
import CategoriesList from "../datas/CategoriesList";
import GamesList from "../datas/GamesList";
import PlayersList from "../datas/PlayersList";

// Components
import { Category } from '../components/Category';
import { Game } from '../components/Game';
import { Player } from '../components/Player';



// ##################################################################### //
// ############################# HeroBanner ############################ //
// ##################################################################### //
const HeroBanner = () => {
  return (
    <div className="flex justify-around mb-12 max-w-screen-xl m-auto">
      <div>
        <h1 className="text-6xl pt-20 mb-5 font-medium leading-tight">Play <span className="text-blue-700">retro games</span><br /> and earn <span className="text-blue-700">trophies</span></h1>
        <button><a href="#" className="button-anim px-6 py-2 bg-blue-700 rounded-full text-xl">Play now</a></button>
      </div>

      <div>
        <img src={heroBanner} alt="hero-banner" />
      </div>
    </div>
  )
}



// ##################################################################### //
// ############################# Categories ############################ //
// ##################################################################### //
const Categories = () => {
  const slicedCategories = CategoriesList.slice(0, 4).map(category => (
    <Category category={category} key={category.id} />
  ))
  return (
    <div className="mb-12 font-medium text-3xl">
      <h2 className="mb-10 px-4">Categories</h2>
      <div className="flex">
        {slicedCategories}
      </div>
      <div className="text-right pt-5 text-xl flex justify-end px-4">
        <a href="" className='nav-anim flex'>
          <p>See more</p>
          <img src={chevron} alt='chevron' className="pt-1 pl-3" />
        </a>
      </div>
    </div>
  )
}



// ##################################################################### //
// ############################# LatestAdd ############################# //
// ##################################################################### //
const LatestAdd = () => {
  const slicedGames = GamesList.slice(0, 6).map(game => (
    <Game game={game} key={game.id} />
  ))
  return (
    <div className="mb-12 font-medium">
      <h2 className="text-3xl mb-10 px-4">Latest add</h2>
      <div className="flex">
        {slicedGames}
      </div>

      <div className="text-right pt-5 text-xl flex justify-end px-4">
        <a href="" className='nav-anim flex'>
          <p>See all games</p>
          <img src={chevron} alt='chevron' className="pt-1 pl-3" />
        </a>
      </div>
    </div>
  )
}



// ##################################################################### //
// ############################ LeaderBoard ############################ //
// ##################################################################### //
const LeaderBoard = () => {
  const slicedPlayers = PlayersList.slice(0, 5).map(player => (
    <Player player={player} key={player.id} />
  ))
  return (
    <div className="font-medium max-w-screen-xl m-auto">
      <h2 className="text-3xl text-center font-medium mb-10">LeaderBoard</h2>
      <div className="flex justify-around">
        <table>
          {slicedPlayers}
        </table>

        <table>
          {slicedPlayers}
        </table>

      </div>
    </div>
  )
}



// ##################################################################### //
// ############################ Export Home ############################ //
// ##################################################################### //
function Home() {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <LatestAdd />
      <LeaderBoard />
    </div>
  );
}

export default Home;
