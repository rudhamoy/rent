import Register from '../../components/auth/Register';
import { getSession } from 'next-auth/client'
import Head from 'next/head'

export default function RegisterPage() {
    return (
        <>
            <Head>
                <title>RentmeRoom | Register</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <Register />
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