import Login from '../components/auth/Login';
import { getSession } from 'next-auth/client';

export default function LoginPage() {
    return (
        <div className="py-20">
            <Login />
        </div>
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