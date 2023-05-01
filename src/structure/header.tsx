import React from "react";
import styled from "styled-components";
import colours from "../colours";
import {FlexBox, FlexItem} from "../ui/flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import letterT from '../images/letter-t.png'
const headerGridName = "header";

interface HeaderProps {
  className?: string;
}

const HomeImg = styled.div`
  width: 55px;
  height: 52px;
  line-height: 52px;
  font-weight: 700;
  font-size: 24px;
  margin: 4px;
  color: white;
  background-color:  ${colours.black};
  border: 2px solid black;
  border-radius: 8px;
  text-align: center;
`

const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  return <div className={className}><FlexBox flexDirection="row"> 
      <HomeImg 
        onClick={() => navigate('/')}
      >T</HomeImg>
  </FlexBox>
  </div>
};

export { headerGridName };
export default styled(Header)`
  grid-area: ${headerGridName};
  background-color: ${colours.lightblue};
  color: white;
`;