import React from 'react'

const withClasses = (WrappedComponent, classes) => (props) => (
  <div className={classes}>
    <WrappedComponent {...props} />
  </div>
)

export default withClasses