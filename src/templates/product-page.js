import React from "react"
import { graphql } from "gatsby"
import  * as variable from 'src/config'
import { darken } from 'polished'
import { globalHistory } from "@reach/router"
import marked from 'marked'
//import dompurify from 'dompurify'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { CarouselProvider, Slider, Slide, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import missingImage from 'src/images/missing-image.png'
import zoomInCursor from 'src/images/cursor-zoom-in.svg'
import zoomInCursor2 from 'src/images/cursor-zoom-in-2x.svg'
import SEO from "src/components/seo"
import { Helmet } from "react-helmet"
import  styled  from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const webDOMAIN = globalHistory.location.origin

class SnipCart extends React.Component {
  countQuantity = this.props.dataItemQuantity //prop passed from main component ProductTemplate
  constructor(props){
      super(props);
      this.state={

      }
  }

  render() {
    const data = this.props
   return (
      <>
        <BuyButton
          className='snipcart-add-item buyBtn'
          data-item-id={data.dataItemId}
          data-item-price={data.dataItemPrice}
          data-item-image={data.dataItemImage}
          data-item-name={data.dataItemName}
          data-item-description={data.dataItemDescription}
          data-item-url={data.dataItemUrl}
          data-item-min-quantity={0}
          data-item-shippable={true}
          data-item-custom1-name="Color"
          data-item-custom1-options="Black|Brown|Gold">
          Add to Bag
        </BuyButton>
      </>
    )
  }
}

class LightboxContainer extends React.Component {
  constructor(props){
      super(props);
      this.state={ 
        isOpen: false,
        imageSrc: null,
      }
  }

  render() {
    
   return (
      <>
      <CarouselProvider 
      totalSlides={this.props.allImages.length > 0 ? this.props.allImages.length : 1}
      isIntrinsicHeight={true}
      >
        <Slider>
          {this.props.allImages.length > 0 ?
            <>
              {this.props.allImages.map((node, index) => (
                <Slide key={index} index={index}>
                  <img 
                  alt={node.caption}
                  src={node.url}
                  onClick={() => this.setState({ isOpen: true, imageSrc: node.url })} /> 
                </Slide>
              ))}
            </>
          :
          <>
          <Slide>
            <img 
            alt="Missing Image"
            src={missingImage} />
          </Slide>
        </>
          }
        </Slider>
        <CarouselThumbs>
        {this.props.allImages.map((node, index) => (
          <Dot key={index} slide={index}>
            <img 
            src={node.url}
            />
            <span/>
          </Dot>
        ))}
        </CarouselThumbs>
      </CarouselProvider>
      {this.state.isOpen &&
        <Lightbox 
        mainSrc={this.state.imageSrc}
        onCloseRequest={() => this.setState({ isOpen: false })} />
      }
      </>
    )
  }
}

class SizeFit extends React.Component {
  constructor(props){
      super(props);
      this.state={ 
        isOpen: false,
      }
  }

  toggle() {
    if(this.state.isOpen === false) {
      this.setState({ isOpen: true});
    }

    else if(this.state.isOpen === true) {
      this.setState({ isOpen: false});
    }
  }

  render() {
    const markdown = marked(this.props.content)
   return (
      <>
      <SizeFitContainer className={this.state.isOpen === true && "isOpen"}>
        <button onClick={this.toggle.bind(this)}>Size & Fit</button>
        <ExpandContent aria-hidden={this.state.isOpen === true ? "false" : "true"}>
          <Content
          dangerouslySetInnerHTML={{ 
            __html: markdown
          }}
          />
        </ExpandContent>
      </SizeFitContainer>
      </>
    )
  }
}

export default function ProductTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { strapiProducts } = data // data.markdownRemark holds your post data
  const markdown = marked(strapiProducts.Description)
  return (
      <>   
      <Helmet
              link={[{
                href:"https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
                rel:"stylesheet",
                type:"text/css" 
              }]}
              script={[
                {
                    type: 'text/javascript',
                    src:"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
                  },{ 
                type: 'text/javascript',
                id: "snipcart",
                "data-api-key": "MzVhYWI0NjktNjJmMS00YWJhLTk4ZTktYTQ5MTJmZWRjODEwNjM2NzMwNzUwOTM1NzA2ODk5",
                src:"https://cdn.snipcart.com/scripts/2.0/snipcart.js" 
              }]}/>
              <GlobalStyle />
          <SEO title={strapiProducts.Name} />
          <ContentContainer>
              <Top>
                <Left>
                  <ImageContainer>
                    <LightboxContainer 
                    allImages={strapiProducts.Media}/>
                  </ImageContainer>
                </Left>
                <Right>
                    <Details>
                        <ProductName>{strapiProducts.Name}</ProductName>
                        <Price>${strapiProducts.Price}</Price>
                    </Details>
                    <ContentDetails>
                      <Content
                      dangerouslySetInnerHTML={{ 
                        __html: markdown
                      }}
                      />
                    </ContentDetails>
                    <SizeFit content={strapiProducts.SizeAndFit} />
                    <SnipCart 
                      dataItemId={strapiProducts.id}
                      dataItemPrice={strapiProducts.Price}
                      dataItemImage={strapiProducts.Thumbnail ? webDOMAIN+strapiProducts.Thumbnail.publicURL : "no image" }
                      dataItemName={strapiProducts.Name}
                      dataItemDescription={strapiProducts.Excerpt ? strapiProducts.Excerpt : "Missing Excerpt."}
                      dataItemQuantity={strapiProducts.Quantity}
                      dataItemMaxQty={strapiProducts.Quantity}
                      dataItemUrl={"shop/product/" + strapiProducts.Name.replace(/\s+/g, '-').toLowerCase()}
                      />
                </Right>
              </Top>
          </ContentContainer>
    </>
  )
}
export const pageQuery = graphql`
  query($title: String!) {      
      strapiProducts(Name: {eq: $title}) {
      Name
      Quantity
      Price
      Exclusive
      SizeAndFit
      Description
      Excerpt
      Date
      Media {
        caption
        url
      }
      id
      Thumbnail {
        absolutePath
        publicURL
      }
    }
  }
`

const Left = styled.div``
const Right = styled.div``
const Top = styled.div``
const Image = styled.img``
const Details = styled.div``
const ProductName = styled.div``
const Price = styled.div``
const Content = styled.div``
const ImageContainer = styled.div``
const QuantityWrapper = styled.div``
const QuantityCount = styled.div``
const BuyButton = styled.button``
const QtyBtn = styled.input``
const CarouselThumbs = styled.div``
const SizeFitContainer = styled.div``
const ExpandContent = styled.div``

const GlobalStyle = createGlobalStyle`
.ril__outer {
  background-color: #fff;
}
.ril__toolbar {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  .ril__toolbarItem {
    button {
      filter: invert(100%);
    }
  }
}
`

const ContentDetails = styled.div`
margin-bottom: 3.5rem;
    ${Content} {
        line-height: 1.88;
        color: #000;
        font-size: 1rem;
        text-align: initial;
        p {
          margin-bottom: 1rem;
        }
        li {
            text-align: left;
        }
        blockquote {
            margin: unset;
        }
    }
`

const ContentContainer = styled.div`
display: flex;
overflow: hidden;
margin-bottom: 3.5rem;
 ${Top} {
     display: flex;
     flex-direction: column;
     flex-grow: 1;
     width: 100%;
    ${Left} {
        width: 100%;
        margin-bottom: 3rem;
        ${ImageContainer} {
          position: relative;
          .carousel {
            ${CarouselThumbs} {
              bottom: 0;
              display: flex;
              margin-top: 5px;
              margin-left: 5px;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              overflow-y: hidden;
              >button {
                min-height: 9.5rem;
                max-height: 9.5rem;
                min-width: 9.5rem;
                max-width: 9.5rem;
                position: relative;
                flex: unset;
                margin-right: 5px;
                outline: none;
                border: none;
                &::before {
                  content: "";
                  height: 100%;
                  width: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background-color: #000;
                  opacity: 0;
                  z-index: 1;
                  transition: ease-in-out opacity .3s;
                }
                &.carousel__dot--selected {
                  outline: none;
                  border: none;
                  &::before {
                    opacity: 0.2;
                  }
                }
                >img {

                }
              }
            }
            .carousel__slider-tray {
              display: flex;
              .carousel__slide {
                
                
                .carousel__inner-slide {
                  padding-bottom: 98% !important;
                  position: relative !important;
                  img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: all;
                  }
                }
              }
            }
          }
            .thumbs-wrapper {
              .thumbs {
                margin: unset;
                li {
                  margin-bottom: unset;
                  img {
                    position: unset;
                    pointer-events: none;
                    margin: unset;
                  }
                }
              }
            }
          }
          ${Image}, img {
            margin: -1px 0;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: all;
            width: 100%;
            &:hover {
              cursor: pointer;
              cursor: -webkit-image-set(url("${zoomInCursor}") 1x, url("${zoomInCursor2}") 2x),zoom-in;
            }
            ~ div {
              img {
                
              }
            }
          }
        }
    }
    ${Right} {
      width: 100%;
      padding: 0 1.5rem;
        ${Details} {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
            ${ProductName} {
                font-weight: 700;
                font-size: 1.56rem;
                color: #000;
                line-height: 1.2;
                font-family: Helvetica;
                text-align: left;
                margin-bottom: 1rem;
            }
            ${Price} {
                font-size: 1rem;
                color: #000;
                font-weight: 600;
                text-align: left;
            }
        }
        ${SizeFitContainer} {
          margin-bottom: 1.7rem;
          &.isOpen {
            ${ExpandContent} {
              max-height: 20rem;
              transition: max-height 0.25s ease-in, opacity 0.25s ease-in;
              padding-bottom: 0.7rem;
              ${Content} {
                opacity: 1;
              }
            }
          }
          button {
            background-color: unset;
            border: unset;
            outline: unset;
            padding: 1.5rem 1rem;
            font-size: 1.4rem;
            width: 100%;
            text-align: left;
            border-top: 1px solid #e6e6e6;
            &:hover {
              cursor: pointer;
            }
          }
          ${ExpandContent} {
            max-height: 0px;
            overflow: hidden;
            transition: max-height 0.35s ease-out, opacity 0.35s ease-in;
            border-bottom: 1px solid #e6e6e6;
            ${Content} {
              line-height: 1.88;
              color: #000;
              font-size: 1rem;
              text-align: initial;
              opacity: 0.4;
              p {
                margin-bottom: 1rem;
              }
              li {
                text-align: left;
              }
              blockquote {
                margin: unset;
              }
            }
          }
        }
        ${QuantityWrapper} {
          display: flex;
          justify-content: center;
          margin-bottom: 0.9rem;
          &.disabled {
            opacity: 0.4;
            pointer-events: none;
          }
          ${QuantityCount} {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 27px;
            height: 27px;
            span {
              margin-left: auto;
              margin-right: auto;
              left: -21px;
              top: -35px;
              text-align: center;
              font-weight: bold;
              position: absolute;
              white-space: nowrap;
              color: #000;
            }
          }
          ${QtyBtn} {
            background-color: transparent;
            outline: none;
            border: unset;
            color: #000;
            width: 33px;
            border-radius: 3px;
            transition: .3s linear box-shadow;
            text-align: center;
            white-space: normal;
            padding: unset;
            opacity: 0.4;
            &:hover {
              opacity: 1;
              cursor: pointer;
            }
          }
        }
        ${BuyButton} {
            background-color: ${variable.SiteColor};
            color: #fff;
            padding: 1.1rem 1.85rem;
            border-radius: 100px;
            outline: unset;
            border: unset;
            width: 100%;
            transition: .3s linear background-color;
            &.disabled {
              opacity: 0.4;
              pointer-events: none;
            }
            &:hover {
                cursor: pointer;
                background-color: ${darken(0.18,variable.SiteColor)};
            }
        }
    }
 }
 @media screen and (min-width: 360px) {
  ${Top} {
    flex-grow: 1;
    align-items: center;
    ${Left} {

    }
  }
}
`