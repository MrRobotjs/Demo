const path = require('path')

module.exports = {
  siteMetadata: {
    Title: `DEMO`,
    description: `DEMO.`,
    author: `DEMO`,
    siteUrl: `https://demo.com`
  },
  plugins: [
    `gatsby-plugin-lodash`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: "https://guap-admin-panel.herokuapp.com",
        queryLimit: 1000,
        contentTypes: [
           "products",
        ],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/products/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DEMO`,
        short_name: `DEMO`,
        start_url: `/`,
        background_color: `#0e0d0d`,
        theme_color: `#0e0d0d`,
        display: `standalone`,
        legacy: true,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
    },
    'gatsby-plugin-netlify-cache',
  ],
}
