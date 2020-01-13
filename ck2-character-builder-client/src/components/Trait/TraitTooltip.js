import React from 'react'

export default function TraitTooltip({trait}) {
  return(
    <React.Fragment>
      <h4>{trait.name}:</h4>
      -------------------------
      <p>{trait.description}</p>
      <ul>
        {Object.keys(trait.effects).map(attr => {
          return <div key={attr} className="ml-n5">{attr[0].toUpperCase() + attr.slice(1)} : {trait.effects[attr]}</div>
        })}
      </ul>
    </React.Fragment>
  )
}