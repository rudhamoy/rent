import SearchBar from '../search/SearchBar';
import classes from './hero.module.css';

const HeroSection = () => {
    return (
        <div className={`${classes.background_svg} h-[65vh] sm:h-[85vh] `}>
            <div className="px-3 sm:px-32 backdrop-blur-[1.5px] h-full w-full flex flex-col justify-center">
                <h1 className={`text-2xl sm:text-6xl font-bold uppercase text-center ${classes.hero_heading}`}>RENT ME ROOM</h1>
                <p className="my-2 text-center font-semibold text-gray-800">Find your next rent house easily</p>

                {/** Search bar */}
                <SearchBar />
                {/** Example */}
                <div className="max-w-sm sm:max-w-xl mx-auto">
                    <ul className="flex flex-wrap gap-x-2 font-semibold text-sm text-gray-800">
                        <li>Example: </li>
                        <li>Abhoynagar,</li>
                        <li>Krishnanagar,</li>
                        <li>1bhk,</li>
                        <li>Family,</li>
                        <li>Students</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
