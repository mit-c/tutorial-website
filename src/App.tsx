import React, {useState } from 'react';
import styled from 'styled-components';
import Body, { bodyGridName } from './structure/body';
import Footer, { footerGridName } from './structure/footer';
import Header, { headerGridName } from './structure/header';
import Sidebar, { sidebarGridName } from './structure/sidebar';

interface WebsiteContainerProps {
  isSideBarOpen: boolean
}

// Prefer styled components over css
const WebsiteContainer = styled.div<WebsiteContainerProps>`
  display: grid;
  grid-template-areas: 
  "${headerGridName} ${headerGridName} ${headerGridName}"
  "${sidebarGridName} ${bodyGridName} ${bodyGridName}"
  "${sidebarGridName} ${footerGridName} ${footerGridName}";
  grid-gap: 8px;
  grid-template-columns: ${({isSideBarOpen}) => isSideBarOpen ? '5fr 27fr;' : '1fr 27fr'};
  grid-template-rows: 4rem 1fr 4rem;
  transition: 100ms;
  @supports (height: 100dvh) {
    height: 100dvh;
  }
  
  @supports not (height: 100dvh) {
    height: 100vh;
  }
`;

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <WebsiteContainer isSideBarOpen={isSideBarOpen}>
      <Header />
      <Sidebar setIsOpen={setIsSideBarOpen} isOpen={isSideBarOpen}/>
      <Body />
      <Footer />
    </WebsiteContainer>
  );
}


export default App;
