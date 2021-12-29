import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { getSingleRoom } from '../../../controllers/roomControllers';

import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom)

export default handler