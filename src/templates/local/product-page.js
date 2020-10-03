import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import  * as variable from 'src/config'
import { Helmet } from "react-helmet"
import { darken } from 'polished'

class SnipCart extends React.Component {
  countQuantity = this.props.dataItemQuantity //prop passed from main component ProductTemplate
  constructor(props){
      super(props);
      this.state={ 
        countQuantity: this.props.dataItemQuantity, 
        count: 1 //count is the number that gets updated when a user increments or removes an amount of a product. 
        
      }
  }

  increment(){
    if(this.state.count < this.countQuantity){
       this.setState( {
        count: this.state.count + 1,
        });
    }
 }

  decrement(){
    if(this.state.count > 0){
       this.setState(prevState => ({
        count: prevState.count - 1,
        }));
    }
 }

 blockButtons(){
  if(this.state.countQuantity > 1){
      this.setState({ count: 1 });
      document.getElementById("QuantityWrap").className += " disabled";
  }
  if(this.state.countQuantity === 0){
    document.getElementById("QuantityWrap").className += " disabled";
    document.getElementById("addCartbtn").className += " disabled";
  }
}

handleOnClick = (e) => {
  e.preventDefault(); //prevent transition

  // redirect after 1 second
  window.setTimeout(() => {
     this.blockButtons()
  }, 100)
};

  render() {
    const data = this.props
   return (
     <>
       <br/>
       {data.dataItemQuantity === 0 ?
       <>
        <QuantityWrapper id="QuantityWrap" className="disabled">
          <QtyBtn type='button' onClick={this.decrement.bind(this)} value='-'/>
          <QuantityCount>
            <span>Quantity</span> {this.state.count}
          </QuantityCount>
          <QtyBtn type='button' onClick={this.increment.bind(this)} value='+'/>
        </QuantityWrapper>
        <BuyButton
            id="addCartbtn"
            className='snipcart-add-item buyBtn disabled'
            data-item-id={data.dataItemId}
            data-item-price={data.dataItemPrice}
            data-item-image={data.dataItemImage}
            data-item-name={data.dataItemName}
            data-item-description={data.dataItemDescription}
            data-item-url={"/product" + data.dataItemUrl}
            data-item-quantity={this.state.count}
            data-item-min-quantity={0}
            onClick={this.handleOnClick.bind(this)}
            >
            Add to Cart
          </BuyButton>
       </>
        :
        <>
          {this.state.count === 0 ?
          <>
            <QuantityWrapper id="QuantityWrap">
              <QtyBtn type='button' onClick={this.decrement.bind(this)} value='-'/>
                <QuantityCount>
                  <span>Quantity</span> {this.state.count}
                </QuantityCount>
              <QtyBtn type='button' onClick={this.increment.bind(this)} value='+'/>
            </QuantityWrapper>
            <BuyButton
              id="addCartbtn"
              className='snipcart-add-item buyBtn disabled'
              data-item-id={data.dataItemId}
              data-item-price={data.dataItemPrice}
              data-item-image={data.dataItemImage}
              data-item-name={data.dataItemName}
              data-item-description={data.dataItemDescription}
              data-item-url={"/product" + data.dataItemUrl}
              data-item-quantity={this.state.count}
              data-item-min-quantity={0}
              onClick={this.handleOnClick.bind(this)}
              >
              Add to Cart
            </BuyButton>
          </>
          :
          <>
            <QuantityWrapper id="QuantityWrap">
              <QtyBtn type='button' onClick={this.decrement.bind(this)} value='-'/>
                <QuantityCount>
                  <span>Quantity</span> {this.state.count}
                </QuantityCount>
              <QtyBtn type='button' onClick={this.increment.bind(this)} value='+'/>
            </QuantityWrapper>
            <BuyButton
              id="addCartbtn"
              className='snipcart-add-item buyBtn'
              data-item-id={data.dataItemId}
              data-item-price={data.dataItemPrice}
              data-item-image={data.dataItemImage}
              data-item-name={data.dataItemName}
              data-item-description={data.dataItemDescription}
              data-item-url={"/product" + data.dataItemUrl}
              data-item-quantity={this.state.count}
              data-item-min-quantity={0}
              onClick={this.handleOnClick.bind(this)}
              >
              Add to Cart
            </BuyButton>
          </>
          }
          </>
        }
      </>
    )
  }
}

export default function ProductTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
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
          <ContentContainer style={{margin: "0 0.8rem"}}>
              <Top>
                <Left>
                  <ImageContainer>
                    <Image src={frontmatter.image} />
                  </ImageContainer>
                </Left>
                <Right>
                    <Details>
                        <ProductName>{frontmatter.title}</ProductName>
                        <Price>${frontmatter.price}</Price>
                    </Details>
                    <SnipCart 
                      dataItemId={frontmatter.id}
                      dataItemPrice={frontmatter.price}
                      dataItemImage={frontmatter.image}
                      dataItemName={frontmatter.title}
                      dataItemDescription={frontmatter.description}
                      dataItemQuantity={frontmatter.quantity}
                      dataItemMaxQty={frontmatter.quantity}
                      dataItemUrl={"/product" + frontmatter.path}
                      />
                </Right>
              </Top>
          </ContentContainer>
        <ContentDetails>
            <Container>
                <Content
                dangerouslySetInnerHTML={{ __html: html }}
                />
            </Container>
        </ContentDetails>
    </>
  )
}
export const pageQuery = graphql`
  query($title: String!) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        date
        quantity
        id
        price
        image
        description
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
const Container = styled.div``
const Content = styled.div``
const ImageContainer = styled.div``
const QuantityWrapper = styled.div``
const QuantityCount = styled.div``
const BuyButton = styled.button``
const QtyBtn = styled.input``

const ContentDetails = styled.div`
  ${Container} {
      padding: 1rem 0rem 1rem 0rem;
    ${Content} {
        margin: unset;
        line-height: 1.6;
        color: #000;
        font-size: 0.81rem;
        li {
            text-align: left;
            margin: unset;
        }
        blockquote {
            margin: unset;
        }
    }
  }
`

const ContentContainer = styled.div`
display: flex;
overflow: hidden;
 ${Top} {
     display: flex;
     flex-direction: column;
     flex-grow: 1;
    ${Left} {
        background-color: grey;
        margin-top: 1rem;
        width: 100%;
        ${ImageContainer} {
          padding-top: 100%;
          position: relative;
          ${Image} {
            margin: unset;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
    }
    ${Right} {
      width: 100%;
        ${Details} {
            display: flex;
            flex-direction: column;
            ${ProductName} {
                font-weight: 700;
                font-size: 1.56rem;
                padding 1rem 0 0.3rem 0;
                color: #000;
                line-height: 1.2;
                font-family: Helvetica;
            }
            ${Price} {
                font-size: 1rem;
                color: #000;
                padding: 0 1rem 1rem 1rem;
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
            padding: 0.8rem 1.8rem;
            border-radius: 3px;
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