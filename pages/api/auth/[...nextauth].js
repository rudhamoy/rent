import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';

export default NextAuth({
    session: {
        jwt: true
    },

    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                dbConnect();

                const { mobile, password } = credentials;

                //Check if email and password is entered
                if (!mobile || !password) {
                    throw new Error("Please enter mobile or password")
                }

                //find user in database
                const user = await User.findOne({ mobile }).select("+password")

                if (!user) {
                    throw new Error("Invalid mobile and password")
                }

                //Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    throw new Error("Invalid name and password")
                }

                return Promise.resolve(user)
            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async (session, user) => {
            session.user = user.user
            return Promise.resolve(session)
        }
    }
})