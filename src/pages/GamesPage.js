import arrowBottom from '../assets/images/arrowBottom.svg';
import cross from '../assets/images/cross.svg';
import options from '../assets/images/options.svg';
import search from '../assets/images/search.svg';

import { GamesList } from '../components/GamesList';

function GamesPage() {
    return (
        <div className='px-4'>
            <ul className='text-xl border-b-2 border-gray-600'>
                <li>Games</li>
            </ul>

            <div className='flex mt-4 text-black'>
                <div className='w-[25%] border-r-2 border-gray-600 flex items-start justify-between relative'>
                    <div className='bg-slate-100 rounded-lg w-[80%]'>

                        <div className='flex justify-between p-3 text-lg font-bold'>
                            <h2>Search by</h2>
                            <img src={arrowBottom} alt="arrow-bottom" />
                        </div>

                        <div className='border-b-2 border-black mx-4 pb-1'>
                            <h3 className='text-center font-bold pb-2'>Notes</h3>
                            <div className='flex justify-around'>
                                <button className='bg-red-300 py-1 px-3 rounded-full'>Ascending</button>
                                <button>Descending</button>
                            </div>
                        </div>

                        <div className='border-b-2 border-black mx-4 pb-1'>
                            <h3 className='text-center font-bold pb-2 pt-3'>Most played</h3>
                            <div className='flex justify-around'>
                                <button className='bg-red-300 py-1 px-3 rounded-full'>Ascending</button>
                                <button>Descending</button>
                            </div>
                        </div>

                        <div className='mx-4 pb-4'>
                            <h3 className='text-center font-bold pb-2 pt-3'>Difficulty</h3>
                            <div className='flex justify-around'>
                                <button>Ascending</button>
                                <button className='bg-red-300 py-1 px-3 rounded-full'>Descending</button>
                            </div>
                        </div>

                    </div>
                    <img src={cross} alt="cross" className='absolute top-0 right-5' />
                </div>
                <div className='w-[75%]'>
                    <div className='flex items-start'>
                        <img src={options} alt="options" className='px-5' />
                        <div className='w-full'>
                            <div className='flex bg-slate-100 p-1 rounded-full'>
                                <img src={search} alt='search' className='mx-3' />
                                <input type="search" className="w-full rounded-lg bg-transparent" placeholder='Search' />
                            </div>
                            <GamesList />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamesPage;