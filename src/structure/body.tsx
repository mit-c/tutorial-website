import { Fragment, ReactElement } from "react"
import styled from "styled-components"
import colours from "../colours";
import { Route, Routes } from "react-router-dom";
import PythonTutorialOne from "../pages/tutorial-python-1";
import Home from "../pages/home";
import pagesData from "../data/pages-data";
const bodyGridName = "body";

interface BodyProps {
  className?: string;
}

const Body = ({ className }: BodyProps) => {
  return <Routes>
      <Route index element={<Home />} />
      {pagesData.map(pageData => 
        <Route path={pageData.link} element={<div className={className}>{pageData.component}</div>} />
      )}
    </Routes>
};
export { bodyGridName };
export default styled(Body)`
  grid-area: ${bodyGridName};
  background-color: ${colours.cream};
  border-radius: 4px 0px 0px 4px;
`;