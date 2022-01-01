import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { myNotification } from '../../../controllers/notifyControllers'

import { isAuthenticatedUser } from '../../../middlewares/auth';
import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(myNotification)

export default handler