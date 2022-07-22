import { css, cx } from 'linaria'
import { VFC } from 'react'

const noFlexShrink = css`
  flex-shrink: 0;
`
const width1px = css`
  width: 1px;
`
const width8px = css`
  width: 8px;
`
const width4px = css`
  width: 4px;
`
const width16px = css`
  width: 16px;
`
const width24px = css`
  width: 24px;
`
const width32px = css`
  width: 32px;
`
const width48px = css`
  width: 48px;
`
const width64px = css`
  width: 64px;
`
const width72px = css`
  width: 64px;
`
const width96px = css`
  width: 96px;
`

const height4px = css`
  height: 4px;
`
const height8px = css`
  height: 8px;
`
const height16px = css`
  height: 16px;
`
const height24px = css`
  height: 24px;
`
const height32px = css`
  height: 32px;
`
const height48px = css`
  height: 48px;
`
const height64px = css`
  height: 64px;
`
const height72px = css`
  height: 64px;
`
const height96px = css`
  height: 96px;
`

type ValidSizes = 4 | 8 | 16 | 24 | 32 | 48 | 64 | 72 | 96

export const Spacers: {
  [z in 'Horizontal' | 'Vertical']: { [x in `_${ValidSizes}px`]: VFC }
} = {
  Horizontal: {
    _4px: () => <div className={cx(noFlexShrink, width4px)} />,
    _8px: () => <div className={cx(noFlexShrink, width8px)} />,
    _16px: () => <div className={cx(noFlexShrink, width16px)} />,
    _24px: () => <div className={cx(noFlexShrink, width24px)} />,
    _32px: () => <div className={cx(noFlexShrink, width32px)} />,
    _48px: () => <div className={cx(noFlexShrink, width48px)} />,
    _64px: () => <div className={cx(noFlexShrink, width64px)} />,
    _72px: () => <div className={cx(noFlexShrink, width72px)} />,
    _96px: () => <div className={cx(noFlexShrink, width1px, width96px)} />,
  },
  Vertical: {
    _4px: () => <div className={cx(noFlexShrink, width1px, height4px)} />,
    _8px: () => <div className={cx(noFlexShrink, width1px, height8px)} />,
    _16px: () => <div className={cx(noFlexShrink, width1px, height16px)} />,
    _24px: () => <div className={cx(noFlexShrink, width1px, height24px)} />,
    _32px: () => <div className={cx(noFlexShrink, width1px, height32px)} />,
    _48px: () => <div className={cx(noFlexShrink, width1px, height48px)} />,
    _64px: () => <div className={cx(noFlexShrink, width1px, height64px)} />,
    _72px: () => <div className={cx(noFlexShrink, width1px, height72px)} />,
    _96px: () => <div className={cx(noFlexShrink, width1px, height96px)} />,
  },
} as const
