import React from "react"
import PropTypes from "prop-types"

const Layout = ({ children  }) => {

    return (
      <>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1280,
          }}
        >
          <main>{children}</main>
        </div>
      </>
    )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout