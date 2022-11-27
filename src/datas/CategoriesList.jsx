import platform from '../assets/images/platform.svg';
import adventure from '../assets/images/adventure.svg';
import rpg from '../assets/images/rpg.svg';
import beat from '../assets/images/beat.svg';
import mario from '../assets/images/mario.svg';
import link from '../assets/images/link.svg';
import wol from '../assets/images/wol.svg';
import billy from '../assets/images/billy.svg';


const CategoriesList = [
    {
        name: "Platform",
        id: "001",
        image: platform,
        hero: mario,
    },
    {
        name: "Adventure",
        id: "002",
        image: adventure,
        hero: link,
    },
    {
        name: "RPG",
        id: "003",
        image: rpg,
        hero: wol,
    },
    {
        name: "Beat'em all",
        id: "004",
        image: beat,
        hero: billy,
    },
]

export default CategoriesList;