import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { DrawingEvent, REQUESTORS, doEveryMs } from "../../api/utils";
import { FlexBox } from "../../ui/flex";
import { StyledButton, Box, CanvasContainer } from "./styles";
import PictionaryCanvas, { CanvasUtils } from "./pictionary-canvas";

interface PictionaryDrawerProps {
    roundId: string;
    wordData: string[];
    wordIndex: number;
    swapTurn: () => void;
    newWord: () => void;
    newGame: () => void;
}

const PictionaryDrawer = ({
    roundId,
    wordData,
    wordIndex,
    swapTurn,
    newWord,
    newGame,
}: PictionaryDrawerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawingData = useRef<DrawingEvent>([]);
    const [isPainting, setIsPainting] = useState(false);
    const [canvasUtils, setCanvasUtils] = useState<CanvasUtils>();

    useEffect(() => {
        console.log("draw", roundId);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctxRef.current = ctx;
        setCanvasUtils(new CanvasUtils(canvasRef, ctxRef));
        canvasUtils?.clearPainting();
        const intervalFunction = doEveryMs(() => {
            if (roundId === "") return;
            if (drawingData.current.length === 0) {
                return
            }
            REQUESTORS.drawingRequestor.putDrawingEvent(
                roundId,
                drawingData.current,
                () => drawingData.current = []
            );
        }, 5000);
        return () => clearInterval(intervalFunction);
    }, [roundId])

    const startPaintingMouseEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsPainting(true);
        if (!canvasUtils) return;
        const { x, y } = canvasUtils.startPainting(e);
        drawingData.current = [...drawingData.current, { x, y }]

    }

    const endPainting = () => {
        setIsPainting(false);
        drawingData.current = [...drawingData.current, { "x": null, "y": null }]
        if (!canvasUtils) return;
        canvasUtils?.endPainting();

    }

    const paintMouseEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isPainting || !canvasUtils) {
            return
        }
        const { x, y } = canvasUtils.paint(e);
        drawingData.current = [...drawingData.current, { x, y }];
    }

    return (
        <Fragment>
            <FlexBox
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <PictionaryCanvas
                    canvasRef={canvasRef}
                    onMouseDown={(e) => startPaintingMouseEvent(e)}
                    onMouseUp={() => endPainting()}
                    onMouseMove={(e) => paintMouseEvent(e)}
                />
            </FlexBox>
        </Fragment>
    )
}

export default PictionaryDrawer;