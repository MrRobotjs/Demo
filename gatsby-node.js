const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const _ = require('lodash')

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
  }) => {
  const { createNode } = actions
  
  if (node.internal.type === "StrapiProducts") {
    if (node.Media.length > 0) {
      const ProductImages = await Promise.all(
        node.Media.map(el =>
          createRemoteFileNode({
            url: `${el.url}`,
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
          })
        )
      )
  
      node.Media.forEach((node, i) => {
        node.localFile___NODE = ProductImages[i].id
      })
    }

    if (node.ColorVariant.length > 0) {
      // Map ColorVariants Objects (2 in Total)
      const VariantMedia = node.ColorVariant.map(e => {
        return e
      })

      //Returns Array of Objects
      console.log(VariantMedia);

      //Returns the ID of the FIRST Media[0] inside FIRST VariantMedia[0]
      console.log(VariantMedia[0].Media[0].id + " - log")

      const ColorVariantImages = await Promise.all(
        
        //Maps Media from the FIRST Object from VariantMedia[0]
        VariantMedia[0].Media.map(el2 =>
          createRemoteFileNode({
            url: `${el2.url}`, //Downloads image from url so it can be used locally by gatsby-image
            parentNodeId: node.id,
            store,
            cache,
            createNode,
            createNodeId,
          })
        )
        
      )
      
      //Returns result of ColorVariantImages Promise in console
      console.log(ColorVariantImages)
      
      VariantMedia.forEach((node, i) => {
        console.log("Product - " + i)
        VariantMedia[i].Media.forEach((Media, i) => {
            console.log("Item - " + i)
        })
      })

      //Gives localfile to Media in the FIRST object[0]
      VariantMedia[0].Media.forEach((node, i) => {
        node.localFile___NODE = ColorVariantImages[i].id
      })

    }

  }
}