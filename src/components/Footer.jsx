
import github from '../assets/images/github.svg';
import discord from '../assets/images/discord.svg';
import facebook from '../assets/images/facebook.svg';
import twitter from '../assets/images/twitter.svg';

export const Footer = () => {
    return (
        <footer className="text-center font-medium pb-5">
            <div className='flex justify-between m-auto mb-3 w-[250px]'>
                <a href='https://github.com/Kaoshix' target='_blanck'><img src={github} alt='github' /></a>
                <a href='https://discord.gg/pTdQ3458cV' target='_blanck'><img src={discord} alt='discord' /></a>
                <a href='https://www.facebook.com/groups/706165144511228' target='_blanck'><img src={facebook} alt='facebook' /></a>
                <a href='https://twitter.com/OlhagaraySebas1' target='_blanck'><img src={twitter} alt='twitter' /></a>
            </div>
            <p>Copyright &copy; <a href='https://github.com/Kaoshix' target='_blanck' className='text-violet-400'>Kaoshix</a></p>
            <p>For any technical issue or suggestion, you can contact me anytime by clicking <a href="/#" className='text-violet-400'>here</a></p>
            <p>Thanks to <a href='https://github.com/bfirsh/jsnes' className='text-violet-400'>bfirsh and contributors</a> for the javascript NES emulator</p>
        </footer>
    )
}