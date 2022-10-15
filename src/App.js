import { useEffect, useState } from 'react';
import './App.css';
import Row from './components/Row';
import confetti from 'canvas-confetti';

function App() {
    const [answer, setAnswer] = useState();
    // one array of 6 strings/guesses, each string will have 5 letters
    const [guesses, setGuesses] = useState(Array(6).fill(''));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setGameOver] = useState(false);

    // API Endpoint (returns 5-letter words): https://api.frontendexpert.io/api/fe/wordle-words
    const API_URL = 'https://intense-dusk-96795.herokuapp.com/https://api.frontendexpert.io/api/fe/wordle-words';

    // retrieve a random word
    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await fetch(API_URL);
                const words = await response.json();
                const randomWord = words[Math.floor(Math.random() * words.length)];
                setAnswer(randomWord.toLowerCase());
            } catch (err) {
                console.log(err);
            }
        };

        fetchWord();
    }, []);

    // detect typing
    useEffect(() => {
        const handleTyping = (e) => {
            // if solution is found, do nothing
            if (isGameOver) {
                return;
            }

            const isLetter = (str) => {
                return /^[a-zA-Z]/.test(str);
            };

            if (isLetter(e.key) || e.key === 'Backspace' || e.key === 'Enter') {
                if (e.key === 'Backspace') {
                    // backspace
                    setCurrentGuess(currentGuess.slice(0, -1));
                    return;
                }
                // when enter is pressed
                if (e.key === 'Enter') {
                    // if word isn't 5 letters
                    if (currentGuess.length !== 5) {
                        return;
                    }

                    const isCorrect = answer === currentGuess;
                    if (isCorrect) {
                        setGameOver(true);
                        confetti();
                    }

                    // set current index guess to the current guess in the guesses array
                    const guessesClone = [...guesses];
                    guessesClone[guesses.findIndex((val) => val === '')] = currentGuess;
                    setGuesses(guessesClone);
                    setCurrentGuess('');
                }

                // show character
                if (currentGuess.length < 5) {
                    setCurrentGuess(currentGuess + e.key);
                }
            }
        };

        window.addEventListener('keydown', handleTyping);

        return () => window.removeEventListener('keydown', handleTyping);
    }, [currentGuess, isGameOver, answer]);

    return (
        <div className="wordle wrapper">
            <header>
                <h1>Wordle</h1>
                <h2>
                    You have 6 tries to guess the 5-letter word. The color of the tiles will indicate specific clues:
                    <ul className="instructions">
                        <li>
                            <span className="correct">green</span> means the letter exists in the word and is in the
                            correct spot,
                        </li>
                        <li>
                            <span className="close">yellow</span> means the letter exists but is in the wrong spot,
                        </li>
                        <li>
                            <span className="incorrect">gray</span> means the letter is not in any spot of the word.
                        </li>
                    </ul>
                </h2>
                <h3>Use your keyboard to type and press enter to submit a guess.</h3>
            </header>

            <div className="board">
                {guesses.map((guess, index) => {
                    // if on current guess then show current guess
                    // The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
                    // current index here is the first index that is not empty
                    const isCurrentIndex = index === guesses.findIndex((val) => val === '');
                    return (
                        <Row
                            guess={isCurrentIndex ? currentGuess : guess}
                            key={index}
                            // final guess if it's not the current index and the guess isn't nothing
                            isFinal={!isCurrentIndex && guess !== ''}
                            answer={answer}
                        />
                    );
                })}
                <div className="winAlert"> {isGameOver ? <p>Congratulations! You found the word. 🎉</p> : null} </div>
                <div className="loseAlert">
                    {!isGameOver && guesses.findIndex((val) => val === '') === -1 ? (
                        <p>Out of tries! Better luck next time. The word was {answer}. 🤓</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default App;
