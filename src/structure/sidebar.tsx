import React, { Fragment } from "react"
import styled, { css, keyframes } from "styled-components"
import colours from "../colours";
import { faAirFreshener, faAnchor, faAnglesLeft, faAnglesRight, faPaintBrush, faTShirt, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { isObjectExpression } from "@babel/types";
import { icon, IconProp } from "@fortawesome/fontawesome-svg-core";
import {faPython } from '@fortawesome/free-brands-svg-icons'
import { UUID } from "crypto";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import pagesData from "../data/pages-data";
const sidebarGridName = "sidebar";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlexColumn = styled.ul`
    margin-block-start: 0;
    padding-inline-start: 0;
    margin-block-end: 0;
    padding-inline-end: 0;
    display: flex;
    flex-direction: column;
`;

const FlexRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 2px solid black;
    border-radius: 8px;
    background-color: ${colours.black};
    margin: 4px;
    
`;
// todo refactor this code to use the flex component
const MarginContainer = styled.div`
    margin: 8px;
`;

const IconContainer = styled.div`
  display: flex;  
  justify-content: center;
  margin: 8px;
`
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

const shakeAnimationWithRotation = (shouldRotate: boolean) => keyframes`
  0% { transform: ${shouldRotate ? 'rotate(180deg)' : 'rotate(0)'};}
  25% { transform: ${shouldRotate ? 'rotate(200deg)' : 'rotate(-20deg)'};}
  50% { transform: ${shouldRotate ? 'rotate(160deg)' : 'rotate(20deg)'}}
  100% { transform: ${shouldRotate ? 'rotate(180deg);' : 'rotate(0);'}
`;

const ChevronRotateAndShake = styled(
    FontAwesomeIcon
  )<FontAwesomeIconWithAnimationAndPaddingProps>`
    transform: ${({isOpen}) => isOpen ? 'rotate(180deg)' : 'rotate(0)' };
    &:hover {
      animation: ${({ isOpen }) =>
      css`${shakeAnimationWithRotation(isOpen)} 0.3s ease-in-out forwards`};
    }
      `;

// todo move this code to separate styling place and clean it up

const ShakeIcon = styled(FontAwesomeIcon)<any>`
  &:hover {
    animation: ${() =>
    css`${shakeAnimationWithRotation(false)} 0.3s ease-in-out forwards`};
  }
`

interface FontAwesomeIconWithAnimationAndPaddingProps extends FontAwesomeIconProps {
    isOpen: boolean;
}

const FontAwesomeIconWithPaddingAndShake = (props: FontAwesomeIconWithAnimationAndPaddingProps) => {
    return <IconContainer>
        <ShakeIcon {...props}/>
    </IconContainer>
}

const FontAwesomeIconWithPaddingAndTransition = (props: FontAwesomeIconWithAnimationAndPaddingProps) => {
    return <IconContainer>
        <ChevronRotateAndShake {...props}/>
    </IconContainer>
}

const Sidebar = ({ className, isOpen, setIsOpen }: SidebarProps) => {
   let navigate = useNavigate();
   return <FlexColumn className={className}>
    <FlexRow>
            {isOpen && <MarginContainer><FadeInText>Menu</FadeInText></MarginContainer>}
                    <MarginContainer>   
                    <FontAwesomeIconWithPaddingAndTransition 
                      isOpen={isOpen} 
                      icon={faAnglesRight} 
                      onClick={() => setIsOpen((prev) => !prev)} 
                      size='lg'
                      fixedWidth
                    />
                    </MarginContainer>
    </FlexRow>
    {renderSidebarItems(isOpen, navigate)}
  </FlexColumn>;
};



const renderSidebarItems = (isOpen: boolean, navigate: NavigateFunction) => {
    // todo store data seperate file
    // Consider storing this on db 
    return pagesData.map((pageData) => (
            <FlexRow 
            as='li'
            onClick={() => navigate('/' + pageData.link)}
            >
                    {isOpen && <MarginContainer><FadeInText>{pageData.title}</FadeInText></MarginContainer>}
                    <MarginContainer>   
                        <FontAwesomeIconWithPaddingAndShake 
                          isOpen={isOpen} 
                          icon={pageData.icon} 
                          size='lg'
                          fixedWidth
                          
                        />
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