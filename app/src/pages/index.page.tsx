import type { NextPage } from 'next'
import Link from 'next/link'

import { Layout } from '../components/Layout'
import { Spacers } from '../components/Spacers'
import { urls } from '../constants/urls'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Ahoy - Solana Summer</h1>
      <Spacers.Vertical._16px />
      <h2>Pages</h2>
      <Spacers.Vertical._8px />
      <ul>
        <li>
          <Link href={urls.home}>
            <a>Home</a>
          </Link>
        </li>
        <Spacers.Vertical._16px />
        <li>
          <Link href={urls.createGrant}>
            <a>Create Grant</a>
          </Link>
        </li>
        <Spacers.Vertical._16px />
        <li>
          <Link
            href={urls.grant('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr')}
          >
            <a>Grant Page</a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home
