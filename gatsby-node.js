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
  
  let productImages = node.Media
  
  if (node.internal.type === "StrapiProducts") {
    if (productImages.length > 0) {
      const images = await Promise.all(
      productImages.map(el =>
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
  
      productImages.forEach((node, i) => {
        node.localFile___NODE = images[i].id
      })
    }
  }

  if (node.internal.type === "StrapiProducts") {
    if (node.ColorVariant.length > 0) {
      // Map ColorVariants Objects (2 in Total)
      const VariantMedia = node.ColorVariant.map(e => {
        return e
      })
      // Returns total number of objects inside VariantMedia (2)
      let TotalCount = _.size(VariantMedia)
      for(var i = 0; i< TotalCount; i++){
        var Total = i;
        console.log(Total);
      }

      //Returns Array of Objects
      console.log(VariantMedia);

      //Returns the ID of the FIRST Media[0] inside FIRST VariantMedia[0]
      console.log(VariantMedia[0].Media[0].id + " - log")

      const images2 = await Promise.all(
        
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
      
      //Returns result of images2 Promise in console
      console.log(images2)
      
      VariantMedia.forEach((node, i) => {
        console.log("Product - " + i)
        VariantMedia[i].Media.forEach((Media, i) => {
            console.log("Item - " + i)
        })
      })

      //Gives localfile to Media in the FIRST object[0]
      VariantMedia[0].Media.forEach((node, i) => {
        node.localFile___NODE = images2[i].id
      })

    }
  }
}