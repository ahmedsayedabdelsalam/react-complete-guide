import React from 'react'

const withClassesComponent = (props) => {
  return (
    <div className={props.classes}>
      {props.children}
    </div>
  )
}

export default withClassesComponent