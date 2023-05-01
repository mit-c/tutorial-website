import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ReactMarkdown from 'react-markdown';
import pythonTutorial1 from '../tutorials/python-tutorial-1.md'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';



const CodeContainer = styled.div`
    margin-right: 2px;
`


const PythonTutorialOne = () => {
  const [pythonTutorialText, setPythonTutorialText] = useState('');
  useEffect(() => {
    fetch(pythonTutorial1).then((res) => res.text())
      .then((text) => setPythonTutorialText(text))
  }, [])

  return <CodeContainer>
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
    </CodeContainer>
};

export default PythonTutorialOne