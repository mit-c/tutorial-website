import styled from "styled-components"
interface FlexBoxProps {
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    flexWrap?: string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
}
const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  align-content: ${props => props.alignContent || 'stretch'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  flex-grow: ${props => props.flexGrow || 0};
  flex-shrink: ${props => props.flexShrink || 1};
  flex-basis: ${props => props.flexBasis || 'auto'};
`;

interface FlexItemProps {
    flex?: string;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: string;
    alignSelf?: string;
    order?: number;
  }
  
  const FlexItem = styled.div<FlexItemProps>`
    flex: ${props => props.flex || '0 1 auto'};
    flex-grow: ${props => props.flexGrow || 0};
    flex-shrink: ${props => props.flexShrink || 1};
    flex-basis: ${props => props.flexBasis || 'auto'};
    align-self: ${props => props.alignSelf || 'auto'};
    order: ${props => props.order || 0};
  `;

export {FlexBox, FlexItem};