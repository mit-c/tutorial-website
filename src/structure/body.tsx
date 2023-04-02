import React, { useEffect, useState } from "react"
import styled from "styled-components"
import colours from "../colours";
import ReactMarkdown from 'react-markdown';
import pythonTutorial1 from '../tutorials/python-tutorial-1.md'
const bodyGridName = "body";

interface BodyProps {
  className?: string;
}

const Body = ({ className }: BodyProps) => {
  const [pythonTutorialText, setPythonTutorialText] = useState('');
  useEffect(() => {
    fetch(pythonTutorial1).then((res) => res.text())
      .then((text) => setPythonTutorialText(text))
  }, [])
  return <div className={className}>
      <ReactMarkdown>
        {pythonTutorialText}
      </ReactMarkdown>

  </div>;
};

export { bodyGridName };
export default styled(Body)`
  grid-area: ${bodyGridName};
  background-color: ${colours.cream};
  color: white;
  border-radius: 4px 0px 0px 4px;
`;