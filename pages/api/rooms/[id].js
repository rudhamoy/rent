import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { deleteRoom, getSingleRoom, updateRoom } from '../../../controllers/roomControllers';

import onError from '../../../middlewares/error';
import {
    isAuthenticatedUser,
    authorizeRoles
} from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin', 'owner'))
    .put(updateRoom)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin', 'owner'))
    .delete(deleteRoom)

export default handler