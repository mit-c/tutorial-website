import { JSXElement } from "@babel/types";
import React from "react"
import styled from "styled-components"
import colours from "../colours";
import sidebar, { sidebarGridName } from "./sidebar";

const footerGridName = 'footer';

interface FooterProps {
    className?: string;
}

const Footer = ({ className }: FooterProps) => {
    return <div className={className}>Footer</div>
}

export {footerGridName};
export default styled(Footer)`
    grid-area: footer;
    background-color: ${colours.black};
    color: white;
    border-radius: 4px 0 0 0;
`