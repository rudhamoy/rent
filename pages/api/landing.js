import nc from 'next-connect';
import dbConnect from '../../config/dbConnect';
import { landingQuery, allLandingQuery } from '../../controllers/landingController'

const handler = nc()

dbConnect();

handler.get(allLandingQuery)
handler.post(landingQuery)

export default handler