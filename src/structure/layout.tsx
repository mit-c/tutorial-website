import React, {useState } from 'react';
import styled from 'styled-components';
import Body, { bodyGridName } from './body';
import Footer, { footerGridName } from './footer';
import Header, { headerGridName } from './header';
import Sidebar, { sidebarGridName } from './sidebar';

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
  grid-gap: 2px;
  grid-template-columns: ${({isSideBarOpen}) => isSideBarOpen ? '12rem auto;' : '67px auto'};
  grid-template-rows: 4rem 1fr 4rem;
  transition: 300ms;
  @supports (height: 100dvh) {
    height: 100dvh;
  }
  
  @supports not (height: 100dvh) {
    height: 100vh;
  }
`;

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  
    return <WebsiteContainer isSideBarOpen={isSideBarOpen}>
    <Header />
    <Sidebar setIsOpen={setIsSideBarOpen} isOpen={isSideBarOpen}/>
    <Body />
    <Footer />
  </WebsiteContainer>
}
export default Layout;