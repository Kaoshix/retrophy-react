import PlayersList from "../datas/PlayersList";
import astro from '../assets/images/astro.png';

export const LeaderBoard = () => {
    return (
        <div className="font-medium max-w-screen-xl m-auto">
            <h2 className="text-3xl text-center font-medium mb-5">LeaderBoard</h2>
            {/* Contain all players item */}
            <div className="flex justify-around">
                {/* left */}
                <div>
                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">1st</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <img className="w-[80px] h-[80px] rounded-full" src={astro} alt="player icon" />
                                <div className="flex grow justify-between">
                                    <div className="pl-4">{PlayersList[0].name}</div>
                                    <div className="pr-4">{PlayersList[0].points} pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">2nd</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">3rd</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">4th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">5th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right */}
                <div>
                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">6th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">7th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">8th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">9th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl">10th</div>
                            <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-red-500"></div>
                                <div className="flex grow justify-between">
                                    <div className="pl-4">Nickname</div>
                                    <div className="pr-4">125 pts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}