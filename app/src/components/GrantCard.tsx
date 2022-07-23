import { css } from 'linaria'
import Link from 'next/link'
import { FC } from 'react'

import { urls } from '../constants/urls'
import { Grant } from '../network/types/models/Grant'
import { colors } from '../ui/colors'
import { Spacers } from './Spacers'

const cardContainer = css`
  display: flex;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.14);
  padding: 24px;
  border-radius: 8px;
  :hover {
    box-shadow: 0px 0px 14px ${colors.shadow.hover};
    transform: translate(0, -2px);
  }
  :active {
    background-color: ${colors.bg.gray};
    transform: translate(0, -1px);
  }
`

const companyImage = css`
  border-radius: 100px;
`

const companyName = css`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
`
const grantAmount = css`
  font-size: 20px;
  color: ${colors.spot.green};
  font-weight: bold;
  line-height: 32px;
`
const description = css`
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: anywhere;
  overflow: hidden;
`

export const GrantCard: FC<{ grant: Grant }> = ({ grant }) => {
  return (
    <Link href={urls.grant(grant.publicKey)}>
      <a className={cardContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src={grant.info.imageCID}
          width={48}
          alt={`${grant.company.name} logo`}
          height={48}
          className={companyImage}
        /> */}
        <Spacers.Horizontal._16px />
        <div>
          <div className={companyName}>{grant.info.companyName}</div>
          <div className={grantAmount}>
            ${Math.floor(grant.initialAmountUSDC).toLocaleString()} USDC
          </div>
          <div className={description}>{grant.info.description}</div>
        </div>
      </a>
    </Link>
  )
}
