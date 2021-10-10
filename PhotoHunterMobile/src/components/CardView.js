import React from 'react'
import styled from 'styled-components/native'

export default function CardView({ children }) {
  return <CustomView>{children}</CustomView>
}

const CustomView = styled.View`
  margin: 15px;
  display: flex;
  background-color: #fffffe;
  border-radius: 4px;
`
