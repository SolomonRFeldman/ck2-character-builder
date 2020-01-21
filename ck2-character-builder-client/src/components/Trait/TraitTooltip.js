import React from 'react'

export default function TraitTooltip({trait}) {
  const unslug = string => {
    const words = string.split('_')
    return words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
  }
  return(
    <React.Fragment>
      <h4>{trait.name}:</h4>
      -------------------------
      <p>{trait.description}</p>
      <ul>
        {Object.keys(trait.effects).map(attr => {
          return <div key={attr} className="ml-n5">{unslug(attr)}: {trait.effects[attr]}</div>
        })}
      </ul>
    </React.Fragment>
  )
}