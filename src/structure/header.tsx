import React from "react";
import styled from "styled-components";
import colours from "../colours";

const headerGridName = "header";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return <div className={className}>Header</div>;
};

export { headerGridName };
export default styled(Header)`
  grid-area: ${headerGridName};
  background-color: ${colours.lightblue};
  color: white;
`;