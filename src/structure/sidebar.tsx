import React, { Fragment } from "react"
import styled, { css, keyframes } from "styled-components"
import colours from "../colours";
import { faAirFreshener, faAmbulance, faAnchor, faAnglesLeft, faAnglesRight, faTShirt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { isObjectExpression } from "@babel/types";
import { icon, IconProp } from "@fortawesome/fontawesome-svg-core";
import {faPython } from '@fortawesome/free-brands-svg-icons'
const sidebarGridName = "sidebar";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const MarginContainer = styled.div`
    margin: 8px 8px 8px 8px;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const FadeInText = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  overflow: hidden;
  white-space: nowrap;
`;

const rotateAnimation = (isOpen: boolean) => keyframes`
  0% { transform: rotate(${isOpen ? "0" : "180deg"}); }
  100% { transform: rotate(${isOpen ? "180deg" : "0"}); }
`;

const shakeAnimation = (isOpen: boolean) => keyframes`
  0% { transform: transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0)'}
   translateY(20%);}
  50% { transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0)'} translateY(20%);}
  100% { transform: translateY(0) ${isOpen ? 'rotate(180deg);' : 'rotate(0);' }
`;


const FontAwesomeSingleIterationIcon = styled(
    FontAwesomeIcon
  )<FontAwesomeIconWithAnimationAndPaddingProps>`
    transform: ${({isOpen}) => isOpen ? 'rotate(180deg)' : 'rotate(0)' };
    &:hover {
      animation: ${({ isOpen }) =>
      css`${shakeAnimation(isOpen)} 0.3s ease-in-out forwards`};
    }
      `;
  
interface FontAwesomeIconWithAnimationAndPaddingProps extends FontAwesomeIconProps {
    isOpen: boolean;
}

const FontAwesomeIconWithPadding = (props: FontAwesomeIconWithAnimationAndPaddingProps) => {
    return <MarginContainer>
        <FontAwesomeIcon {...props}/>
    </MarginContainer>
}

const FontAwesomeIconWithPaddingAndTransition = (props: FontAwesomeIconWithAnimationAndPaddingProps) => {
    return <MarginContainer>
        <FontAwesomeSingleIterationIcon {...props}/>
    </MarginContainer>
}

const Sidebar = ({ className, isOpen, setIsOpen }: SidebarProps) => {
   return <FlexColumn className={className}>
    <FlexRow>
            {isOpen && <MarginContainer><FadeInText>Tutorials</FadeInText></MarginContainer>}
                    <MarginContainer>   
                    <FontAwesomeIconWithPaddingAndTransition isOpen={isOpen} icon={faAnglesRight} onClick={() => setIsOpen((prev) => !prev)} size='lg'/>
                    </MarginContainer>
    </FlexRow>
    {renderSidebarItems(isOpen)}
  </FlexColumn>;
};

const renderSidebarItems = (isOpen: boolean) => {
    const iconByDescription: Record<string, any> = {
        'I am a ambulance': faPython,
        'Anchor':faAnchor,
        'T-shirt':faTShirt,
        'I want to have nicer smelling air, this is long text':faAirFreshener,
    };

    return Object.keys(iconByDescription).map((description) => (
            <FlexRow>
                    {isOpen && <MarginContainer><FadeInText>{description}</FadeInText></MarginContainer>}
                    <MarginContainer>   
                    <FontAwesomeIconWithPadding isOpen={isOpen} icon={iconByDescription[description]} size='lg'/>
                    </MarginContainer>
            </FlexRow>
        ));
}


export { sidebarGridName };
export default styled(Sidebar)`
  grid-area: ${sidebarGridName};
  background-color: ${colours.lightblue};
  color: white;
  border-radius: 0px 4px 0 0px;
`;