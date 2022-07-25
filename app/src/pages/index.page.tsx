import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { css } from 'linaria'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { GrantCard } from '../components/GrantCard'
import { Layout } from '../components/Layout'
import { Spacers } from '../components/Spacers'
import { SolanaSummerSVG } from '../components/svgs/SolanaSummerSVG'
import { urls } from '../constants/urls'
import { fetchAllGrants } from '../network/fetch/fetchAllGrants'
import { Grant } from '../network/types/models/Grant'
import { colors } from '../ui/colors'
import { anchorWalletWithFallback } from '../utils/anchorWalletWithFallback'

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
  margin: 0 auto;
  filter: drop-shadow(0px 0px 3px ${colors.hover.fancy});
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

const createButton = css`
  background: ${colors.spot.green};
  color: ${colors.text.whitePrimary};
  font-weight: bold;
  border-radius: 8px;
  font-size: 20px;
  padding: 12px;
  :hover {
    background: ${colors.hover.green};
  }
  :disabled {
    background: ${colors.bg.gray};
    color: ${colors.text.blackSecondary};
  }
`

const Home: NextPage = () => {
  const wallet = useAnchorWallet()
  const [grants, setGrants] = useState<Grant[]>([])
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const grants = await fetchAllGrants({
        wallet: anchorWalletWithFallback(wallet),
      })
      setGrants(grants)
    })()
  }, [wallet])

  return (
    <Layout>
      <SolanaSummerSVG width={500} className={solanaSVGSty} />
      <Spacers.Vertical._24px />
      <h1 className={heading}>Solana Ecosystem Grants</h1>
      <>
        <Spacers.Vertical._24px />
        <button
          onClick={() => {
            router.push(urls.createGrant)
          }}
          className={createButton}
        >
          Create Grant
        </button>
      </>
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
