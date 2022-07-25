import Head from 'next/head'
import React, { FC } from 'react'

const description = 'Solana Super Camp Ecosystem Grants'

/** A wrapper for the HTML page title
 *
 * Used to make consistent title
 */
export const PageHead: FC<{
  children?: React.ReactNode
  overrideDescription?: string
  title?: string
}> = (props) => {
  const showInputTitle = props.title && props.title.length > 0
  return (
    <Head>
      <title key="title">
        Solana Summer Camp Ecosystem Grants
        {showInputTitle ? ` | ${props.title}` : ''}
      </title>
      <meta
        key="og:title"
        property="og:title"
        content={`Ahoy ${showInputTitle ? ` | ${props.title}` : ''}`}
      />
      <meta
        key="twitter:title"
        name="twitter:title"
        content={`Ahoy ${showInputTitle ? ` | ${props.title}` : ''}`}
      />
      <meta
        name="description"
        content={props.overrideDescription || description}
        key="description"
      />

      <meta
        property="og:url"
        key="og:url"
        content="https://summercamp.ahoy.fund/"
      />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:description"
        key="og:description"
        content={props.overrideDescription || description}
      />
      <meta
        property="og:image"
        key="og:image"
        content="https://summercamp.ahoy.fund/og_generic.png"
      />

      <meta
        name="twitter:card"
        key="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:domain" key="twitter:domain" content="ahoy.fund" />
      <meta
        name="twitter:url"
        key="twitter:url"
        content="https://summercamp.ahoy.fund/"
      />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={props.overrideDescription || description}
      />
      <meta
        name="twitter:image"
        key="twitter:image"
        content="https://summercamp.ahoy.fund/og_generic.png"
      />
      {props.children}
    </Head>
  )
}
