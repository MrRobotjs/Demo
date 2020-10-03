import Typography from "typography"
import CodePlugin from 'typography-plugin-code'
//import * as variable from "src/config"

/*import {
    MIN_DEFAULT_MEDIA_QUERY,
    MIN_LARGER_DISPLAY_MEDIA_QUERY,
  } from "typography-breakpoint-constants"*/

  const MIN_MOBILE_MEDIA_QUERY = "@media (min-width:320px)";
  const MIN_TABLET_MEDIA_QUERY = "@media (min-width:720px)";

const _options = {
    headerFontFamily: [
        `Helvetica Neue`,
    ],
    bodyFontFamily: [`serif`],
    monospaceFontFamily: [
      `monospace`,
    ],
    systemFontFamily: [
      `sans-serif`,
    ],
    baseFontSize: `1px`,
    baseLineHeight: 1.4,
    headerLineHeight: 1.075,
    blockMarginBottom: 0.75,
    scaleRatio: 2,
    plugins: [new CodePlugin()],
    overrideStyles: ({ rhythm, scale }, options) => {
        return {
            "h1,h2,h4,h5,h6": {
                marginTop: rhythm(options.blockMarginBottom * 2),
                marginBottom: rhythm(options.blockMarginBottom),
                letterSpacing: `-0.0075em`,
              },
              "ul, ol": {
                marginTop: rhythm(options.blockMarginBottom),
              },
              h1: {
                ...scale(4 / 5),
              },
              h3: {
                ...scale(2 / 5),
                lineHeight: 1,
                marginTop: rhythm(options.blockMarginBottom * 2),
                marginBottom: rhythm(options.blockMarginBottom / 2),
              },
              h4: {
                ...scale(1 / 5),
              },
              h5: {
                ...scale(0),
              },
              blockquote: {
                paddingLeft: rhythm(options.blockMarginBottom),
                marginLeft: 0,
                borderLeft: `${rhythm(options.blockMarginBottom / 4)} solid grey`,
              },
              hr: {
                backgroundColor: "grey",
              },
              "tt,code,kbd": {
                // background: `hsla(23, 60%, 97%, 1)`,
                fontFamily: options.monospaceFontFamily.join(`,`),
                fontSize: `80%`,
                // Disable ligatures as they look funny w/ Space Mono as code.
                fontVariant: `none`,
                WebkitFontFeatureSettings: `"clig" 0, "calt" 0`,
                fontFeatureSettings: `"clig" 0, "calt" 0`,
                paddingTop: `0.1em`,
                paddingBottom: `0.1em`,
              },
            [MIN_MOBILE_MEDIA_QUERY]: {
                // Make baseFontSize on mobile 16px.
                html: {
                fontSize: `${(16 / 16) * 100}% !important`,
                color: "red",
                },
            },
            [MIN_TABLET_MEDIA_QUERY]: {
                html: {
                fontSize: `${(17 / 16) * 100}% !important`,
                },
            },
        }
    }
}
  
  const typography = new Typography(_options)
  
  export const { scale, rhythm, options } = typography
  export default typography