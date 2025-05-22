import React from 'react'

const KEYS_ROW1 = ['Q','W','E','R','T','Y','U','I','O','P']
const KEYS_ROW2 = ['A','S','D','F','G','H','J','K','L']
const KEYS_ROW3 = ['Enter','Z','X','C','V','B','N','M','Backspace']

export default function Keypad({ usedKeys, onKeyClick }) {
  const renderKeyLabel = (key) => {
    if (key === 'Backspace') {
      return <span aria-label="Backspace" role="img" className="icon">&#x232b;</span>
    }
    if (key === 'Enter') {
      return <span aria-label="Enter" role="img" className="icon">&#x23CE;</span>
    }
    return key
  }

  const handleClick = (key) => {
    if (onKeyClick) onKeyClick(key)
  }

  return (
    <div className="keypad-container">
      <div className="keypad-row">
        {KEYS_ROW1.map(key => (
          <div
            key={key}
            className={`key ${usedKeys[key.toLowerCase()] || ''}`}
            onClick={() => handleClick(key)}
            data-key={key}
          >
            {renderKeyLabel(key)}
          </div>
        ))}
      </div>
      <div className="keypad-row">
        {KEYS_ROW2.map(key => (
          <div
            key={key}
            className={`key ${usedKeys[key.toLowerCase()] || ''}`}
            onClick={() => handleClick(key)}
            data-key={key}
          >
            {renderKeyLabel(key)}
          </div>
        ))}
      </div>
      <div className="keypad-row">
        {KEYS_ROW3.map(key => (
          <div
            key={key}
            className={`key special-key ${usedKeys[key.toLowerCase()] || ''}`}
            onClick={() => handleClick(key)}
            data-key={key}
          >
            {renderKeyLabel(key)}
          </div>
        ))}
      </div>
    </div>
  )
}
