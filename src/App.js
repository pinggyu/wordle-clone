import { useEffect, useState } from 'react';
import './App.css';
import Row from './components/Row';

function App() {
    const [answer, setAnswer] = useState();
    // one array of 6 strings
    const [guesses, setGuesses] = useState(Array(6).fill(''));

    // API Endpoint (returns 5-letter words): https://api.frontendexpert.io/api/fe/wordle-words
    const API_URL = 'https://intense-dusk-96795.herokuapp.com/https://api.frontendexpert.io/api/fe/wordle-words';

    // retrieve a random word
    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await fetch(API_URL);
                const words = await response.json();
                const randomWord = words[Math.floor(Math.random() * words.length)];
                setAnswer(randomWord);
            } catch (err) {
                console.log(err);
            }
        };

        fetchWord();
    }, []);

    // detect typing
    useEffect(() => {});

    return (
        <div className="wordle wrapper">
            <header>
                <h1>Welcome to Wordle</h1>
                <h2>
                    You have 6 tries to guess the 5-letter word. The color of the tiles will indicate specific clues:
                    green means the letter is exists in the word and is in the correct spot, yellow means the the letter
                    exists but is in the wrong spot, grey means the letter is not in any spot of the word.
                </h2>
                <h3>Use your keyboard to type and press enter to submit a guess.</h3>
            </header>

            <div className="board">
                {guesses.map((guess, index) => {
                    return <Row guess={guess} key={index} />;
                })}
            </div>
        </div>
    );
}

export default App;
