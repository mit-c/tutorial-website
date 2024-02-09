import styled from "styled-components";
import { FlexBox } from "../../ui/flex";

const Box = styled.canvas`
    background-color: white;
`
const StyledButton = styled.button`
    width: 12rem;
    height: 3rem;
`;

// todo move into Canvas component
const CanvasContainer = styled(FlexBox)`
`

export {
    Box,
    StyledButton,
    CanvasContainer
}