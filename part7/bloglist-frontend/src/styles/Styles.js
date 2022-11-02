import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = createGlobalStyle`
body {
  margin-top: 0px;
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
}
`

export const Navbar = styled.div`
  background-color: lightgrey;
  padding: 10px;
  color: black;
  margin: 0px;
`

export const NavbarLink = styled(Link)`
  padding-left: 5px;
  padding-right: 5px;
  color: palevioletred;
  text-decoration: none;
  font-size: 1.2em;
`

export const Title = styled.h2`
  font-size: 1.5em;
  color: palevioletred;
`

export const Forminput = styled.input`
  padding: padding: 0.25em 1em;
  border: 1.5px solid palevioletred;
  border-radius: 3px;
`

export const TabledivLink = styled(Link)`
  padding-left: 5px;
  padding-right: 5px;
  color: palevioletred;
  text-decoration: none;
  font-size: 1em;
`

export const Tablediv = styled.div`
  padding: 10px;
  border: solid;
  border-width: 0px;
  margin-bottom: 5px;
  background-color: ghostwhite;
  &:hover {
    border-left: 3px solid indianred;
    margin-left: -3px;
  }
`
export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 1.5px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`

export const Div = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
`
