import { useEffect, useState } from "react";
import { Player, REQUESTORS } from "../../api/utils";
import PictionaryDrawer from "./pictionary-drawer";
import PictionaryGuesser from "./pictionary-guesser";
import { StyledButton } from "./styles";
import { FlexBox } from "../../ui/flex";

const PictionaryContainer = () => {
    const [isMyTurn, setIsMyTurn] = useState<boolean>(true);
    const [gameId, setGameId] = useState<string>("");
    const [roundId, setRoundId] = useState<string>("");
    const [lobbyId, setLobbyId] = useState<string>("");
    const [wordData] = useState(["hello", "apple"]);
    const [wordIndex, setWordIndex] = useState(0);
    const [displayGame, setDisplayGame] = useState(false);
    const [player, setPlayer] = useState<Player>();
    const swapTurn = () => setIsMyTurn(prev => !prev);
    const newWord = () => setWordIndex((prev) =>
        ((prev + Math.ceil(Math.random() * (wordData.length - 1))) % (wordData.length))
    );
    const [userInput, setUserInput] = useState("");
    const newGame = () => REQUESTORS.gameRequestor.putGame((id) => setGameId(id));
    useEffect(() => {
        // newGame();
    }, [])

    useEffect(() => {
        console.log(gameId)
        if (gameId !== "") {
            REQUESTORS.lobbyRequestor.getLobbyId(gameId, (id) => setLobbyId(id))
            REQUESTORS.gameRequestor
                .getRoundId(
                    gameId,
                    (res) => {
                        setRoundId(res);
                        setDisplayGame(true);
                    }
                );
        }
    }, [gameId])

    useEffect(() => {
        if(lobbyId !== ""){
            REQUESTORS.lobbyRequestor.joinLobby(lobbyId, (player) => setPlayer(player))
        }
    }, [lobbyId])


    useEffect(() => {
        if(player) setIsMyTurn(player.isDrawer)
    }, [player])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    }

    const handleJoinRoomClick = () => {
        console.log(userInput)
        setGameId(userInput);
    }

    const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === wordData[wordIndex]) {
            alert('winner!')
        }
    }

    return (<>
        <h2>Pictionary: {gameId}</h2>
        <FlexBox justifyContent="center">
            <FlexBox flexDirection="column">
            <input onChange={(e) => handleInput(e)}></input>
            <StyledButton
                onClick={handleJoinRoomClick}
            >
                Join room
            </StyledButton>
            </FlexBox>
            <StyledButton onClick={() => {
                    newGame();
                }}>
                    New game
                </StyledButton>
            {displayGame && <StyledButton onClick={() => {
                swapTurn()
                newWord()
            }}>
                Change turn
            </StyledButton>
            }
        </FlexBox>
        {
            displayGame
                ? isMyTurn
                    ? <FlexBox flexDirection="column" alignItems="center">
                    <span>
                
                        {wordData[wordIndex]}
                    </span>
                    <PictionaryDrawer
                        roundId={roundId}
                        wordData={wordData}
                        wordIndex={wordIndex}
                        swapTurn={swapTurn}
                        newWord={newWord}
                        newGame={newGame}
                    />
                    </FlexBox>
                    : <FlexBox flexDirection="column" alignItems="center">
      
                    <span>
                        Guess
            <input onChange={(e) => handleGuess(e)}></input>
        </span>
                    <PictionaryGuesser
                        roundId={roundId}
                        wordData={wordData}
                        wordIndex={wordIndex}
                        swapTurn={swapTurn}
                        newWord={newWord}
                        newGame={newGame}
                    /></FlexBox>
                : undefined
        }
        </>
    )
}

export default PictionaryContainer;