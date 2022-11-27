import PlayersList from "../datas/PlayersList";
import astro from '../assets/images/astro.png';
import megan from '../assets/images/megan.png';
import john from '../assets/images/john.png';
import swordman from '../assets/images/swordman.png';


export const LeaderBoard = () => {
    return (
        <div className="font-medium max-w-screen-xl m-auto">
            <h2 className="text-3xl text-center font-medium mb-5">LeaderBoard</h2>
            <div className="flex justify-around">
                {/* left */}
                <div>
                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">1</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <img src={astro} alt="player icon" className="w-[80px] h-[80px] rounded-full" />
                                <div className="flex grow justify-between">
                                    <div className="pl-4">{PlayersList[0].name}</div>
                                    <div className="pr-4">{PlayersList[0].points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">2</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                            <img src={megan} alt="player icon" className="w-[80px] h-[80px] rounded-full" />
                                <div className="flex grow justify-between">
                                    <div className="pl-4">{PlayersList[1].name}</div>
                                    <div className="pr-4">{PlayersList[1].points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">3</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                            <img src={john} alt="player icon" className="w-[80px] h-[80px] rounded-full" />
                                <div className="flex grow justify-between">
                                    <div className="pl-4">{PlayersList[2].name}</div>
                                    <div className="pr-4">{PlayersList[2].points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">4</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                            <img src={swordman} alt="player icon" className="w-[80px] h-[80px] rounded-full" />
                                <div className="flex grow justify-between">
                                    <div className="pl-4">{PlayersList[3].name}</div>
                                    <div className="pr-4">{PlayersList[3].points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right */}
                <div>
                right part
                </div>

            </div>

        </div>

    )
}

// 