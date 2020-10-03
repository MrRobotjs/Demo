import React from "react"
import SEO from "../components/seo"
import { navigate } from "@reach/router"

function back () {
  navigate(-1)
}

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <button onClick={back}>Back</button>
        
  </>
)

export default NotFoundPage
