import Register from '../../components/auth/Register';
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function RegisterPage() {
    const router = useRouter()

    const { role } = router.query

    console.log(role)

    return (
        <>
            <Head>
                <title>RentmeRoom | Register as Owner</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                <Register role={role} />
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