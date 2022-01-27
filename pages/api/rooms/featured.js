import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { featuredRooms } from '../../../controllers/roomControllers';
import onError from '../../../middlewares/error';


const handler = nc({ onError });

dbConnect();

handler.get(featuredRooms)

export default handler