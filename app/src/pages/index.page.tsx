import { css } from 'linaria'
import type { NextPage } from 'next'
import Link from 'next/link'

import { GrantCard } from '../components/GrantCard'
import { Layout } from '../components/Layout'
import { Spacers } from '../components/Spacers'
import { SolanaSummerSVG } from '../components/svgs/SolanaSummerSVG'
import { urls } from '../constants/urls'

export type GrantInfo = {
  address: string
  company: {
    imageURL: string
    name: string
    twitterSlug: string
    websiteURL: string
  }
  currentBalance: number
  description: string
  grantAmountUSD: number
  walletPublicKey: string
}

const sampleGrant: GrantInfo = {
  address: '1238AiBkVzWwFQtCA7TnEmh8CGTjZ87KJC5Mu3dZ456',
  company: {
    imageURL:
      'https://pbs.twimg.com/profile_images/1446291295266238464/FO2fP9KO_400x400.jpg',
    name: 'Tulip Protocol',
    twitterSlug: 'TulipProtocol',
    websiteURL: 'https://tulip.garden/',
  },
  currentBalance: 5_123.31,
  description:
    'We’re offering $10,000 for people to build things with Tulip Protocol. Show us what you’ve got!',
  grantAmountUSD: 10_000.01,
  walletPublicKey: '7cre8AiBkVzWwFQtCA7TnEmh8CGTjZ87KJC5Mu3dZxwE',
}

const grantsContainer = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 24px;

  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const heading = css`
  font-size: 48px;
  font-weight: bold;
  line-height: 1.2;
  text-align: center;
  @media only screen and (max-width: 800px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 680px) {
    font-size: 32px;
  }
`

const solanaSVGSty = css`
  margin: auto;
  @media only screen and (max-width: 555px) {
    width: 400px;
    height: 250px;
  }
  @media only screen and (max-width: 450px) {
    width: 300px;
    height: 200px;
  }
  @media only screen and (max-width: 350px) {
    width: 200px;
    height: 100px;
  }
`

const NavMenu = () => (
  <>
    <ul>
      <li>
        <Link href={urls.createGrant}>
          <a>Create Grant</a>
        </Link>
      </li>
    </ul>
    <Spacers.Vertical._8px />
  </>
)

const Home: NextPage = () => {
  const grants: GrantInfo[] = Array(15).fill(sampleGrant)
  return (
    <Layout>
      <SolanaSummerSVG width={500} className={solanaSVGSty} />
      <Spacers.Vertical._16px />
      <h1 className={heading}>
        Solana Summer Camp Hackathon
        <br /> Ecosystem Grants
      </h1>
      <NavMenu />
      <Spacers.Vertical._48px />
      <div className={grantsContainer}>
        {grants.map((g, i) => (
          <GrantCard key={i} grant={g} />
        ))}
      </div>
    </Layout>
  )
}

export default Home
