import React from 'react'
import styled from 'styled-components/native'

export default function CardScrollView({ children }) {
  return <CustomScrollView>{children}</CustomScrollView>
}

const CustomScrollView = styled.ScrollView`
  margin: 15px;
  display: flex;
  background-color: #fffffe;
  border-radius: 4px;
`
