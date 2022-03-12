import TrialUser from '../components/auth/TrialUser';
import { getSession } from 'next-auth/client'
import Head from 'next/head'

export default function TrialUserPage() {
    return (
        <>
            <Head>
                <title>RentmeRoom | OTP sign up</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <TrialUser />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}