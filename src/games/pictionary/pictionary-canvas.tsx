import { useRef, useState } from "react";
import { Box, CanvasContainer } from "./styles";


interface PictionaryCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}
const PictionaryCanvas = ({
    canvasRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
}: PictionaryCanvasProps) => {
    return (
        <CanvasContainer justifyContent="center">
            <Box
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                height='612px'
                width='1024px'
            >
            </Box>
        </CanvasContainer>
    );
}

class CanvasUtils {
    private canvasRef;
    private ctxRef;
    
    constructor(canvasRef: React.RefObject<HTMLCanvasElement>, ctxRef: React.RefObject<CanvasRenderingContext2D>) {
        this.canvasRef = canvasRef;
        this.ctxRef = ctxRef;
    }

    public startPaintingCoord(x: number, y: number) {
        if (!this.ctxRef.current) {return;}
        this.ctxRef.current.beginPath();
        this.ctxRef.current.moveTo(x,y);
    }

    public startPainting(e: React.MouseEvent<HTMLCanvasElement>) {
        const {offsetX, offsetY} = e.nativeEvent;
        this.startPaintingCoord(offsetX, offsetY)
        return { x: offsetX, y: offsetY};
    }   
    
    public paintCoord(x: number, y: number) {
        if (!this.ctxRef.current) {return;}
        this.ctxRef.current.lineTo(x,y);
        this.ctxRef.current.stroke();
    }

    public paint(e: React.MouseEvent<HTMLCanvasElement>) {
        const {offsetX, offsetY} = e.nativeEvent;
        this.paintCoord(offsetX, offsetY)
        return { x: offsetX, y: offsetY};
    }

    public endPainting() {
        if (!this.ctxRef.current) return;
        this.ctxRef.current.closePath();
    }

    public clearPainting() {
        if(this.canvasRef.current) {
            this.ctxRef.current?.clearRect(0, 0, this.canvasRef.current?.width, this.canvasRef.current?.height) 
        }
    }
}
export default PictionaryCanvas;
export {CanvasUtils}
