function Row({ guess, isFinal, answer }) {
    const WORD_LENGTH = 5;
    let letterTiles = [];

    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i];
        let className = 'letter';

        if (isFinal) {
            if (letter === answer[i]) {
                className += ' correct';
            } else if (answer.includes(letter)) {
                className += ' close';
            } else {
                className += ' incorrect';
            }
        }

        letterTiles.push(
            <div className={className} key={i}>
                {letter}
            </div>
        );
    }

    return <div className="row">{letterTiles}</div>;
}

export default Row;
