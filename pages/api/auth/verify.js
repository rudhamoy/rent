import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

import { verifyOtp } from '../../../controllers/otpControllers';
import onError from '../../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.post(verifyOtp)

export default handler