import nc from 'next-connect';
import dbConnect from '../../config/dbConnect';

import { registerTrialUser } from '../../controllers/trialControllers';
import onError from '../../middlewares/error';

const handler = nc({ onError });

dbConnect();

handler.post(registerTrialUser)

export default handler