import { useState } from 'react';

const useWordle = (solution) => {
  const wordLength = solution.length;
  const maxTurns = 6;

  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(maxTurns)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: 'grey' };
    });

    // find green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    // find yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prev) => [...prev, currentGuess]);
    setTurn((prev) => prev + 1);

    setUsedKeys((prevUsedKeys) => {
      const newUsedKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newUsedKeys[l.key];

        if (l.color === 'green') {
          newUsedKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newUsedKeys[l.key] = 'yellow';
          return;
        }
        if (
          l.color === 'grey' &&
          currentColor !== 'green' &&
          currentColor !== 'yellow'
        ) {
          newUsedKeys[l.key] = 'grey';
          return;
        }
      });

      return newUsedKeys;
    });

    setCurrentGuess('');
  };

  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      if (turn >= maxTurns) return;
      if (history.includes(currentGuess)) return;
      if (currentGuess.length !== wordLength) return;

      const formatted = formatGuess();
      addNewGuess(formatted);
      return;
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key.toLowerCase());
      }
    }
  };

  // For handling keypad clicks
  const handleKeyClick = (key) => {
    if (key === 'Enter' || key === 'BACKSPACE') {
      handleKeyup({ key: key === 'BACKSPACE' ? 'Backspace' : 'Enter' });
    } else if (/^[a-zA-Z]$/.test(key)) {
      handleKeyup({ key });
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleKeyClick,
    wordLength,
  };
};

export default useWordle;
