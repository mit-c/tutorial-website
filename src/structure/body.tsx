import React from "react"
import styled from "styled-components"
import colours from "../colours";

const bodyGridName = "body";

interface BodyProps {
  className?: string;
}

const Body = ({ className }: BodyProps) => {
  return <div className={className}>Body
  </div>;
};

export { bodyGridName };
export default styled(Body)`
  grid-area: ${bodyGridName};
  background-color: ${colours.cream};
  color: white;
`;