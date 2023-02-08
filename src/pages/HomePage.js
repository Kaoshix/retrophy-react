import heroBanner from '../assets/images/heroBanner.svg';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import { Game } from '../components/Game';
import { Genre } from '../components/Genre';
import { Player } from '../components/Player';

import { Carousel } from '@trendyol-js/react-carousel';
import { RightArrow } from '../components/RightArrow';
import { LeftArrow } from '../components/LeftArrow';

const HeroBanner = () => {
  return (
    <div className="
    flex flex-col-reverse items-center mt-12 relative
    lg:flex-row lg:justify-around lg:items-center
    ">
      <div className='h-60 w-60 bg-white rounded-full absolute top-50 left-[-350px] opacity-90 blur-[200px]'></div>
      <div>
        <h1 className="text-4xl text-center mt-4 lg:text-6xl">Play <span className="text-blue-700">retro games</span><br /> and earn <span className="text-blue-700">trophies</span></h1>
        <button className='block m-auto mt-8 lg:m-0 lg:mt-8'><Link to='/games' className="px-6 py-3 text-3xl rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 duration-200 ease-in-out">Play now</Link></button>
      </div>

      <div>
        <img src={heroBanner} alt="hero-banner" />
      </div>
    </div>
  )
}

const LatestAdd = () => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/api/games');
      const myDatas = await response.json();
      setGames(myDatas);
    }
    fetchData();
  }, []);

  function carouselResponsive() {
    if (window.innerWidth < 768) {
      return (
        <div className='flex relative'>
          {games ? <Carousel rightArrow={<RightArrow />} leftArrow={<LeftArrow />} show={1} slide={1} swiping={true} infinite={false}>{games.map(game => <Game key={game.id} game={game} />).slice(0, 6)}</Carousel> : 'Loading...'}
        </div>
      )
    } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
      return (
        <div className='flex relative'>
          {games ? <Carousel rightArrow={<RightArrow />} leftArrow={<LeftArrow />} show={3} slide={1} swiping={true} infinite={false}>{games.map(game => <Game key={game.id} game={game} />).slice(0, 6)}</Carousel> : 'Loading...'}
        </div>
      )
    } else {
      return (
        <div className='flex relative'>
          {games ? <Carousel rightArrow={<RightArrow />} leftArrow={<LeftArrow />} show={5} slide={1} swiping={true} infinite={false}>{games.map(game => <Game key={game.id} game={game} />).slice(0, 6)}</Carousel> : 'Loading...'}
        </div>
      )
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-4xl text-center mb-8 md:text-left lg:text-left">Latest add</h2>

      {carouselResponsive()}

      <div className="text-xl flex justify-center md:justify-end lg:justify-end">
        <Link to='/games'>See all games &#8250;</Link>
      </div>
    </div>
  )
}


const Genres = () => {
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/api/genres');
      const myDatas = await response.json();
      setGenres(myDatas);
    }
    fetchData();
  }, []);
  return (

    <div className="mt-12">
      <h2 className="text-center text-4xl mb-12 md:text-left lg:text-left">Genres</h2>
      <div className='flex justify-center md:justify-between lg:justify-between flex-wrap'>
        {genres ? genres.map(genre => <Genre key={genre.id} genre={genre} />) : 'Loading...'}
      </div>
    </div>
  )
}


const LeaderBoard = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/api/users');
      const myDatas = await response.json();
      setUsers(myDatas);
    }
    fetchData();
  }, []);

  return (
    <div className=" max-w-screen-xl m-auto mb-20">
      <h2 className="text-3xl text-center mb-10">LeaderBoard</h2>

      <div>
        {users?.slice(0, 5)?.map(user => (
          <Player user={user} key={user.id} />
        ))}
      </div>
    </div>
  )
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
