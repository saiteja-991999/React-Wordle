import React from 'react'
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn, solution }) {
  return (
    <div className="grid-container">
      {guesses.map((g, i) => (
        <Row
          key={i}
          guess={g}
          currentGuess={i === turn ? currentGuess : null}
          solutionLength={solution.length}
        />
      ))}
    </div>
  )
}
