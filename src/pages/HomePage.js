import heroBanner from "../assets/images/heroBanner.svg";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { Game } from "../components/Game";
import { Genre } from "../components/Genre";
import { Player } from "../components/Player";
import { Blur } from "../assets/blurs/Blur";

import { ScrollingCarousel } from '@trendyol-js/react-carousel';

const HeroBanner = () => {
    return (
        <div className="max-w-screen-xl m-auto relative mb-10 lg:flex lg:flex-row-reverse lg:justify-around lg:items-center">
            <Blur />

            <div className="flex justify-center mb-5">
                <img src={heroBanner} alt="hero-banner" />
            </div>

            <div className="text-center">
                <h1 className="text-4xl mb-5 lg:text-6xl">
                    Play <span className="text-blue-700">retro games</span>
                    <br /> and earn
                    <span className="text-blue-700"> trophies</span>
                </h1>
                <Link
                    to="/games"
                    className="inline-block m-auto px-6 py-3 text-3xl rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 duration-200 ease-in-out"
                >
                    Play now
                </Link>
            </div>
        </div>
    );
};

const Genres = () => {
    const [genres, setGenres] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/api/genres");
            const myDatas = await response.json();
            setGenres(myDatas);
        }
        fetchData();
    }, []);
    return (
        <div className="mb-10">
            <h2 className="mb-10 text-4xl text-center md:text-left lg:text-left">
                Genres
            </h2>

            <div className="lg:flex lg:justify-between">
                {genres
                    ? genres
                        .map((genre) => (
                            <Genre key={genre.id} genre={genre} />
                        ))
                    : "Loading..."}
            </div>
        </div>
    );
};

const LatestAdd = () => {
    const [games, setGames] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/api/games");
            const myDatas = await response.json();
            setGames(myDatas);
        }
        fetchData();
    }, []);

    return (

        <div className="mb-10">
            <h2 className="text-4xl text-center mb-5 md:text-left lg:text-left">
                Latest add
            </h2>

            <ScrollingCarousel className="flex">
                <div className="flex">
                    {games
                        ? games
                            .map((game) => {
                                return (

                                    <div key={game.id} className="mx-3 max-w-[250px]">
                                        <Game game={game} />
                                    </div>
                                );
                            })
                        : "Loading..."}
                </div>
            </ScrollingCarousel>

            <div className="text-xl flex justify-center md:justify-end lg:justify-end">
                <Link to="/games">See all games &#8250;</Link>
            </div>
        </div>
    );
};

const LeaderBoard = () => {
    const [users, setUsers] = useState(null);
    let lgFilteredUser = users?.filter((user, index) => index < 5);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/api/users");
            const myDatas = await response.json();
            setUsers(myDatas);
        }
        fetchData();
    }, []);

    return (
        <div className="mb-20">
            <h2 className="text-3xl text-center mb-5">LeaderBoard</h2>
            <div className="max-w-screen-lg m-auto">
                <div>
                    {lgFilteredUser?.map((user, index) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-center mb-10"
                        >
                                {
                                    index === 0 ? <img src={gold} alt="gold-medal" /> : 
                                    index === 1 ? <img src={silver} alt="silver-medal" /> :
                                    index === 2 ? <img src={bronze} alt="bronze-medal" /> : <span className="w-[25px] h-[34px]"></span>
                                }
                            <p className="text-lg flex relative">
                            {index + 1}</p>
                            <Player user={user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ##################################################################### //
// ############################ Export Home ############################ //
// ##################################################################### //
function HomePage() {
    return (
        <div>
            <HeroBanner />
            <Genres />
            <LatestAdd />
            <LeaderBoard />
        </div>
    );
}

export default HomePage;
