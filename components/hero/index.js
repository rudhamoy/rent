import SearchBar from '../search/SearchBar';
import classes from './hero.module.css';

const HeroSection = () => {
    return (
        <div className={`${classes.background_svg} h-[65vh] sm:h-[85vh] `}>
            <div className="px-[3%] sm:px-32 backdrop-blur-[1.5px] h-full w-full flex flex-col justify-center pt-[20vh] relative">
                <div className="absolute bg-purple-200 mix-blend-multiply filter blur-3xl rounded-full w-48 h-48 top-10"></div>
                <div className="absolute bg-yellow-200 mix-blend-multiply filter blur-3xl rounded-full w-48 h-48 right-7 top-10"></div>
                <div className="absolute bg-pink-200 mix-blend-multiply filter blur-3xl rounded-full w-48 h-48 left-16 top-10"></div>
                <h1 className={`text-base text-[#4f4755] sm:text-6xl font-bold uppercase text-center ${classes.hero_heading}`}><span className={`text-3xl font-sans ${classes.hero_heading}`}>Searching a rent</span> <br /> is tiring, Say no more!</h1>
                <p className="my-2 text-center font-semibold text-gray-600">Let us find a perfect room for you</p>

                {/** Search bar */}
                <SearchBar />
                {/** Example */}
                {/* <div className="max-w-sm sm:max-w-xl mx-auto">
                    <ul className="flex flex-wrap gap-x-2 font-semibold text-sm text-gray-800">
                        <li>Example: </li>
                        <li>Abhoynagar,</li>
                        <li>Krishnanagar,</li>
                        <li>1bhk,</li>
                        <li>Family,</li>
                        <li>Students</li>
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default HeroSection
