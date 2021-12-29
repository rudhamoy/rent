import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { myRooms } from '../../../controllers/roomControllers'

import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'
import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles("admin", "owner"))
    .get(myRooms)

export default handler;