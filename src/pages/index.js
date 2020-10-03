import React from "react"
import { graphql } from 'gatsby'
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <>
    <SEO/>
    
    <div>
      home
    </div>
  </>
)

export const query = graphql`
query {
  site: site {
    siteMetadata {
      Title
    }
  }
  strapiALL: allStrapiProducts {
    totalCount
    edges {
      node {
        Name
        Quantity
        Price
        Exclusive
        Description
        Date
        Media {
          caption
          url
          size
          height
          width
          alternativeText
        }
        id
        Thumbnail {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  },
  localALL: allMarkdownRemark{
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          price
          image
          description
          exclusive
          id
        }
        html
      }
    }
  }
}
`

export default IndexPage