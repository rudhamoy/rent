
const StepCard = ({ step, details }) => {
    return (
        <div className="flex items-center">
            <div className="bg-gray-600 w-[20%] h-[2px]"></div>
            <div className="shadow-md rounded-md  w-[80%] bg-gray-50 p-2">
                <div className="w-[32%] p-1 my-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm">
                    <h1 className="text-sm font-semibold">{step}</h1>
                </div>
                <p className="text-sm">{details}</p>
            </div>
        </div>
    )
}


const HowItWorks = () => {
    return (
        <div className="bg-[#eeeeee] py-6 px-[4%] sm:px-32 relative">
            {/* <div className="absolute bg-purple-200 mix-blend-multiply filter blur-3xl rounded-full w-36 h-36 top-8"></div>
            <div className="absolute bg-yellow-200 mix-blend-multiply filter blur-3xl rounded-full w-36 h-36 right-24 top-8"></div>
            <div className="absolute bg-pink-200 mix-blend-multiply filter blur-3xl rounded-full w-36 h-36 left-16 top-10"></div> */}
            <h1 className="text-center text-4xl sm:text-6xl my-3 font-semibold">How it works</h1>
            <p className="text-center text-sm text-gray-600">Now, search or book your new rent house easily with just these 6 Steps</p>
            <div className="my-[100px] flex">
                <div className="bg-gray-600 w-1"></div>
                <div className="flex flex-col gap-y-5">

                    <StepCard
                        step="Step One"
                        details="Search or go to Explore and filter according to your preferrances by room type, price range, etc "
                    />
                    <StepCard
                        step="Step two"
                        details="Save or bookmarks your choices of room"
                    />
                    <StepCard
                        step="Step Three"
                        details="Go to your bookmark list and starting booking your favorite room"
                    />
                    <StepCard
                        step="Step Four"
                        details="Wait for the confirmation notification or get call for the confirmation"
                    />
                    <StepCard
                        step="Step Five"
                        details="You'll be reacive house owner contact number"
                    />
                    <StepCard
                        step="Step Six"
                        details="You're ready to move when your book has confirm to READY TO MOVE"
                    />
                </div>
            </div>
        </div>
    )
}

export default HowItWorks