import OtpRegister from '../components/auth/OtpRegister';
import { getSession } from 'next-auth/client'
import Head from 'next/head'

export default function OtpUserPage() {
    return (
        <>
            <Head>
                <title>RentmeRoom | OTP sign up</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <OtpRegister />
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