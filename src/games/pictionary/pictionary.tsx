import React, { useEffect } from "react";
import { Fragment, useRef, useState } from "react"
import styled from "styled-components"
import { FlexBox, FlexItem } from "../../ui/flex";


const Box = styled.canvas`
    background-color: white;
`

interface CircleProps {
    x: number;
    y: number;
}

const Circle = React.memo(styled.div.attrs<CircleProps>(props => ({
    style: {
        top: props.y,
        left: props.x,
    },
}))`
    position: absolute;
    width:16px;
    height:16px;
    border-radius: 50%;
    background-color: black;
    pointer-events: none;
`);

const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mouseDown: boolean,
    mouseDownPositions: any,
) => {
    if (!mouseDown) {
        return;
    }
    mouseDownPositions.current = [...mouseDownPositions.current,computePosition(e)].slice(-20);

}

const computePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
    const { clientX, clientY } = e;
    return { x: clientX - e.currentTarget.offsetLeft, y: clientY - e.currentTarget.offsetTop }
}

interface Position {
    x: number;
    y: number;
}



const Pictionary = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isPainting, setIsPainting] = useState(false);

    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
      });

    const startPainting = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(!ctxRef.current) { return; }
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
            e.nativeEvent.offsetX, 
            e.nativeEvent.offsetY
          );
          setIsPainting(true);
    }

    const endPainting = () => {
        if(!ctxRef.current) return;
        ctxRef.current.closePath();
        setIsPainting(false);
    }

    const paint = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(!isPainting) {
            return
        }
        if(!ctxRef.current) return;
        ctxRef.current.lineTo(
            e.nativeEvent.offsetX, 
            e.nativeEvent.offsetY
          );
            
        ctxRef.current.stroke();
    }

    return <Fragment>
        <h2>Pictionary</h2>
        <FlexBox justifyContent="center">
        <Box 
            ref={canvasRef}
            onMouseDown={(e) => startPainting(e)}
            onMouseUp={() => endPainting()}
            onMouseMove={(e) => paint(e)}
            width='300px'
            height='300px'
            >
        </Box>
        </FlexBox>
    </Fragment>
}


export default Pictionary;