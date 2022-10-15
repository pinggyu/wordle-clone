function Row({ guess }) {
    const WORD_LENGTH = 5;
    let letterTiles = [];

    for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i];
        letterTiles.push(
            <div className="letter" key={i}>
                {letter}
            </div>
        );
    }

    return <div className="row">{letterTiles}</div>;
}

export default Row;
