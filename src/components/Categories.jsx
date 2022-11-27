import CategoriesList from "../datas/CategoriesList";
import { Category } from "./Category";
import chevron from '../assets/images/chevron.svg';

export const Categories = () => {
    return (
        <div className="mb-12 font-medium text-3xl">
            <h2 className="mb-10 px-4">Categories</h2>
            <div className="flex">
                {CategoriesList.map(category => (
                    <Category category={category} key={category.id} />
                ))}
            </div>
            <div className="text-right pt-5 text-xl flex justify-end px-4">
                <a href="">See more</a>
                <img src={chevron} alt='chevron' className="pt-1 pl-3"/>
            </div>
        </div>
    )
}