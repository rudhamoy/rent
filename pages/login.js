import Login from '../components/auth/Login';
import { getSession } from 'next-auth/client';
import Head from 'next/head'


export default function LoginPage() {
    return (
        <>
            <Head>
                <title>RentmeRoom | Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="py-20">
                <Login />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}