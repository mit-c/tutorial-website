import React, { useEffect, useState } from "react"
import styled, { CSSProperties } from "styled-components"
import colours from "../colours";
import ReactMarkdown from 'react-markdown';
import pythonTutorial1 from '../tutorials/python-tutorial-1.md'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
const bodyGridName = "body";

interface BodyProps {
  className?: string;
}

const CodeContainer = styled.div`
  padding: 4px;
`

const Body = ({ className }: BodyProps) => {
  const [pythonTutorialText, setPythonTutorialText] = useState('');
  useEffect(() => {
    fetch(pythonTutorial1).then((res) => res.text())
      .then((text) => setPythonTutorialText(text))
  }, [])

  return <CodeContainer className={className}>
    <ReactMarkdown
      children={pythonTutorialText}
      components={{
        code({ node, inline, className, style, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              showLineNumbers
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )

        }
      }
      }
    />
  </CodeContainer>;
};
export { bodyGridName };
export default styled(Body)`
  grid-area: ${bodyGridName};
  background-color: ${colours.cream};
  border-radius: 4px 0px 0px 4px;
`;