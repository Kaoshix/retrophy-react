import heroBanner from '../assets/images/heroBanner.svg';
import chevron from '../assets/images/chevron.svg';

// import PlayersList from "../datas/PlayersList";

// import { Player } from '../components/Player';

import { Link } from 'react-router-dom';

import { GamesList } from '../components/GamesList';


const HeroBanner = () => {
  return (
    <div className="
    flex flex-col-reverse items-center mb-12 mt-12 relative
    lg:flex-row lg:justify-around lg:items-center
    ">
      <div className='h-60 w-60 bg-white rounded-full absolute top-50 left-[-350px] opacity-90 blur-[200px]'></div>
      <div>
        <h1 className="text-4xl text-center mt-4 leading-tight lg:text-6xl">Play <span className="text-blue-700">retro games</span><br /> and earn <span className="text-blue-700">trophies</span></h1>
        <button className='block m-auto mt-8 lg:m-0 lg:mt-8'><Link to='/games' className="px-6 py-3 text-3xl rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 duration-200 ease-in-out">Play now</Link></button>
      </div>

      <div>
        <img src={heroBanner} alt="hero-banner" />
      </div>
    </div>
  )
}

const LatestAdd = () => {

  return (
    <div className="mb-12 mt-20">
      <h2 className="text-4xl text-center mb-8">Latest add</h2>
      <GamesList />

      <div className="text-right pt-5 text-xl flex justify-end">
        <p>See all games</p>
        <img src={chevron} alt='chevron' className="pt-1 pl-3" />
      </div>
    </div>
  )
}


const Genres = () => {
  return (
    <div className="mb-12">
      <h2 className="text-center text-4xl mb-6">Genres</h2>
    </div>
  )
}


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
      <LatestAdd />
      <Genres />
      <LeaderBoard />
    </div>
  );
}

export default HomePage;
