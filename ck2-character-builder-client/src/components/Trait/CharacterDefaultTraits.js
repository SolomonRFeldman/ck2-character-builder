import React, { useRef, useEffect } from 'react'
import CharacterDefaultTrait from './CharacterDefaultTrait'

export default function CharacterDefaultTraits(props) {
  const characterTraits = useRef(null)
  const handleWheel = event => {
    event.preventDefault()
    event.target.parentElement.scrollBy(event.deltaY + event.deltaX, 0)
  }

  useEffect(() => {
    const node = characterTraits.current
    node.addEventListener('wheel', handleWheel)
    return () => node.removeEventListener('wheel', handleWheel)
  }, [])

  return(
    <span 
      ref={characterTraits}
      aria-label='Character Traits'
      className='float-right'
      style={{
        overflowY: 'hidden', 
        overflowX: 'scroll', 
        width: 'calc(100% - 90px)',
        display: 'inline-block', 
        whiteSpace: 'nowrap',
        paddingBottom: '20px'
      }}
    >
      {props.character.traits.map(trait => <CharacterDefaultTrait key={trait.id} trait={trait} {...props} />)}
    </span>
  )
}