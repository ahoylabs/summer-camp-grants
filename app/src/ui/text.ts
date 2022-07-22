const baseProps = {
  fontFamily: {
    caption: 'halyard-micro',
    header: 'halyard-display',
    text: 'halyard-text',
  },
  lineHeight: {
    body: '24px',
    caption: '16px',
    h1: '128px',
    h2: '72px',
    h3: '40px',
    h4: '32px',
    h5: '28px',
  },
  size: {
    body: '16px',
    caption: '12px',
    h1: '128px',
    h2: '72px',
    h3: '32px',
    h4: '24px',
    h5: '20px',
  },

  weight: {
    bold: 700,
    h1: 700,
    h2: 700,
    h3: 700,
    h4: 600,
    h5: 600,
    medium: 500,
    regular: 400,
    semibold: 600,
  },
} as const

export const text = {
  ...baseProps,
  complete: {
    body: `
  font-size: ${baseProps.size.body};
  line-height: ${baseProps.lineHeight.body};
  font-family: ${baseProps.fontFamily.text};
  font-weight: ${baseProps.weight.regular};
`,
    caption: `
  font-size: ${baseProps.size.caption};
  line-height: ${baseProps.lineHeight.caption};
  font-family: ${baseProps.fontFamily.caption};
  font-weight: ${baseProps.weight.regular};
`,
    h1: `
      font-size: ${baseProps.size.h1};
      line-height: ${baseProps.lineHeight.h1};
      font-family: ${baseProps.fontFamily.header};
      font-weight: ${baseProps.weight.h1};
    `,
    h2: `
      font-size: ${baseProps.size.h2};
      line-height: ${baseProps.lineHeight.h2};
      font-family: ${baseProps.fontFamily.header};
      font-weight: ${baseProps.weight.h2};
    `,
    h3: `
      font-size: ${baseProps.size.h3};
      line-height: ${baseProps.lineHeight.h3};
      font-family: ${baseProps.fontFamily.header};
      font-weight: ${baseProps.weight.h3};
    `,
    h4: `
      font-size: ${baseProps.size.h4};
      line-height: ${baseProps.lineHeight.h4};
      font-family: ${baseProps.fontFamily.header};
      font-weight: ${baseProps.weight.h4};
    `,
    h5: `
      font-size: ${baseProps.size.h5};
      line-height: ${baseProps.lineHeight.h5};
      font-family: ${baseProps.fontFamily.text};
      font-weight: ${baseProps.weight.h5};
    `,
  },
} as const
