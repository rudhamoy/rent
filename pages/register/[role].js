import Register from '../../components/auth/Register';
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'


export default function RegisterPage() {
    const router = useRouter()

    const { role } = router.query

    console.log(role)

    return (
        <div>
            <Register role={role} />
        </div>
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