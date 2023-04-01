import React from "react"
import styled, { css, keyframes } from "styled-components"
import colours from "../colours";
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

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
    justify-content: space-between;
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

const FadeInText = styled.span`
  animation: ${fadeIn} 300ms ease-in-out;
`;
const FontAwesomeSingleIterationIcon = styled(FontAwesomeIcon)<FontAwesomeIconWithAnimationAndPaddingProps>`
    transition: all 300ms ease-in-out;  
    transform: ${({isOpen}) => isOpen ? 'rotate(180deg)' :'rotate(0)'}
  `
interface FontAwesomeIconWithAnimationAndPaddingProps extends FontAwesomeIconProps {
    isOpen: boolean;
}

const FontAwesomeIconWithPadding = (props: FontAwesomeIconWithAnimationAndPaddingProps) => {
    return <MarginContainer>
        <FontAwesomeSingleIterationIcon {...props}/>
    </MarginContainer>
}



const Sidebar = ({ className, isOpen, setIsOpen }: SidebarProps) => {
   return <FlexColumn className={className}>
    <FlexRow>
        {isOpen && 
            <MarginContainer><FadeInText>Tutorials</FadeInText></MarginContainer>
        }
        <FontAwesomeIconWithPadding isOpen={isOpen} onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)} icon={faAnglesRight} size='lg'/>
    </FlexRow>
  </FlexColumn>;
};


export { sidebarGridName };
export default styled(Sidebar)`
  grid-area: ${sidebarGridName};
  background-color: ${colours.lightblue};
  color: white;
`;