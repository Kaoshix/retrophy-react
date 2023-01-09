// CSS files and images
import './Animations.css';
import heroBanner from '../assets/images/heroBanner.svg';
import chevron from '../assets/images/chevron.svg';

// Datas
import CategoriesList from "../datas/CategoriesList";
// import PlayersList from "../datas/PlayersList";

// Components
import { Category } from '../components/Category';
// import { Player } from '../components/Player';

// Routes
import { Link } from 'react-router-dom';

// Fetch datas
import { GamesList } from '../components/GamesList';



// ##################################################################### //
// ############################# HeroBanner ############################ //
// ##################################################################### //
const HeroBanner = () => {
  return (
    <div className="flex justify-around mb-12 max-w-screen-xl m-auto">
      <div>
        <h1 className="text-6xl pt-20 mb-5 leading-tight">Play <span className="text-blue-700">retro games</span><br /> and earn <span className="text-blue-700">trophies</span></h1>
        <button><Link to='/games' className="button-anim px-6 py-2 bg-blue-700 rounded-full text-xl">Play now</Link></button>
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
    <div className="mb-12 text-3xl">
      <h2 className="mb-10 px-4">Categories</h2>
      <div className="flex">
        {slicedCategories}
      </div>
      <div className="text-right pt-5 text-xl flex justify-end px-4">
        <a href="/#" className='nav-anim flex'>
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

  return (
    <div className="mb-12 ">
      <h2 className="text-3xl mb-10 px-4">Latest add</h2>
      <GamesList />

      <div className="text-right pt-5 text-xl flex justify-end px-4">
        <p>See all games</p>
        <img src={chevron} alt='chevron' className="pt-1 pl-3" />
      </div>
    </div>
  )
}



// ##################################################################### //
// ############################ LeaderBoard ############################ //
// ##################################################################### //
const LeaderBoard = () => {
  // const slicedPlayers = PlayersList.slice(0, 5).map(player => (
  //   <Player player={player} key={player.id} />
  // ))
  // return (
  //   <div className=" max-w-screen-xl m-auto mb-20">
  //     <h2 className="text-3xl text-center mb-10">LeaderBoard</h2>
  //     <div className="flex justify-around">
  //       <table>
  //         {slicedPlayers}
  //       </table>

  //       <table>
  //         {slicedPlayers}
  //       </table>

  //     </div>
  //   </div>
  // )
}



// ##################################################################### //
// ############################ Export Home ############################ //
// ##################################################################### //
function HomePage() {
  return (
    <div>
      <HeroBanner />
      <Categories />
      <LatestAdd />
      <LeaderBoard />
    </div>
  );
}

export default HomePage;
