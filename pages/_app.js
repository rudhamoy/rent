import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import { wrapper } from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)
