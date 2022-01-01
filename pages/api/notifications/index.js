import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { newNotification } from '../../../controllers/notifyControllers';
import onError from '../../../middlewares/error';

import {
    isAuthenticatedUser,
    authorizeRoles
} from '../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newNotification)

export default handler