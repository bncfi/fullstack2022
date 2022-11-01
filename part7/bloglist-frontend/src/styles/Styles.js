import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Navbar = styled.div`
  background-color: lightgrey;
  padding: 10px;
`

export const NavbarLink = styled(Link)`
  padding: 5px;
`

export const Tablediv = styled.div`
  padding-top: 10px;
  padding-left: 2px;
  border: solid;
  border-width: 1px;
  margin-bottom: 5px;
`
export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;

  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`
