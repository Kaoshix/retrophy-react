
import github from '../assets/images/github.svg';
import discord from '../assets/images/discord.svg';
import facebook from '../assets/images/facebook.svg';
import twitter from '../assets/images/twitter.svg';

export const Footer = () => {
    return (
        <footer className="text-center font-medium pb-5">
            <div className='flex justify-between m-auto mb-3 w-[250px]'>
                <a href='/#'><img src={github} alt='github' /></a>
                <a href='/#'><img src={discord} alt='discord' /></a>
                <a href='/#'><img src={facebook} alt='facebook' /></a>
                <a href='/#'><img src={twitter} alt='twitter' /></a>
            </div>
            <p>Copyright lorem lorem lorem lorem lorem</p>
            <p>For any technical issue or suggestion click <a href="/#" className='text-violet-400'>here</a></p>
        </footer>
    )
}