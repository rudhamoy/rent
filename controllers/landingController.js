import Landing from '../models/landing'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors';

const landingQuery = catchAsyncErrors(async (req, res) => {

    const queryMsg = await Landing.create(req.body);
    res.status(200).json({
        success: true,
        queryMsg
    })
});

const allLandingQuery = catchAsyncErrors(async (req, res) => {

    const landingQuery = await Landing.find();

    res.status(200).json({
        success: true,
        landingQuery
    })
})

export { landingQuery, allLandingQuery }