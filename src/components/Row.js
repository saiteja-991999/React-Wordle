import React from "react";

export default function Row({ guess, currentGuess, solutionLength }) {
  const emptySquares = [...Array(solutionLength)];

  if (guess) {
    return (
      <div className="row dynamic" style={{ '--columns': solutionLength }}>
        {guess.map((l, i) => (
          <div key={i} className={`tile ${l.color}`}>{l.key}</div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split("");
    return (
      <div className="row dynamic" style={{ '--columns': solutionLength }}>
        {letters.map((letter, i) => (
          <div key={i} className="tile filled">{letter}</div>
        ))}
        {emptySquares.slice(letters.length).map((_, i) => (
          <div key={i} className="tile"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row dynamic" style={{ '--columns': solutionLength }}>
      {emptySquares.map((_, i) => (
        <div key={i} className="tile"></div>
      ))}
    </div>
  );
}
