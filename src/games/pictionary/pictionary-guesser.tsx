import { Fragment, useEffect, useRef, useState } from "react";
import { DrawingEvent, REQUESTORS, doEveryMs } from "../../api/utils";
import PictionaryCanvas, { CanvasUtils } from "./pictionary-canvas";
import { FlexBox } from "../../ui/flex";
import { StyledButton, CanvasContainer, Box } from "./styles";
import { workerData } from "worker_threads";

// TODO chunk server data by sending an array index
interface PictionaryGuesserProps {
    roundId: string;
    wordData: string[];
    wordIndex: number;
    swapTurn: () => void;
    newWord: () => void;
    newGame: () => void;
}
const PictionaryGuesser = ({
    roundId,
    wordData,
    wordIndex,
    swapTurn,
    newWord,
    newGame,
}: PictionaryGuesserProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [serverDrawingData, setServerDrawingData] = useState<DrawingEvent>([]);
    const [canvasUtils, setCanvasUtils] = useState<CanvasUtils>();
    const dataIndexPointer = useRef<number | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        setServerDrawingData([]);
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctxRef.current = ctx;
        setCanvasUtils(new CanvasUtils(canvasRef, ctxRef));
    }, [])

    useEffect(() => {
        console.log('start painting')
        if (serverDrawingData.length === 0) { return; }
        let isPainting = false;
        // We are painting serverDrawingData so we can reset it
        if(dataIndexPointer.current) {
            dataIndexPointer.current += serverDrawingData.length;
        } else {
            dataIndexPointer.current = serverDrawingData.length;
        }
        const copyOfServerDrawingData = [...serverDrawingData]
        setServerDrawingData([]);
        for (let i = 0; i < copyOfServerDrawingData.length; i++) {
            const { x, y } = copyOfServerDrawingData[i];
            // todo consider sending/recieving a null point to the backend 
            if (x === null || y === null) {
                canvasUtils?.endPainting();
                isPainting = false;
                continue;
            }
            if (!isPainting) {
                canvasUtils?.startPaintingCoord(x, y);
                isPainting = true;
                continue;
            }
            canvasUtils?.paintCoord(x, y);


        }
        canvasUtils?.endPainting();
    }, [serverDrawingData])

    useEffect(() => {
        dataIndexPointer.current = 0;
        if (canvasRef.current) ctxRef.current?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)

        const intervalFunction = doEveryMs(() => {
            if (roundId === "") return;
            console.log(serverDrawingData)
            if(dataIndexPointer.current === null) {
                dataIndexPointer.current = 0;
            }
            REQUESTORS.drawingRequestor.getDrawingFlat(
                roundId,
                dataIndexPointer.current,
                (res) => setServerDrawingData(res)
            );
        }, 5000);
        return () => clearInterval(intervalFunction);
    }, [roundId])

    return <Fragment>
        <FlexBox
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <PictionaryCanvas
                canvasRef={canvasRef}
            />

        </FlexBox>
    </Fragment>
}


export default PictionaryGuesser;