import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Div } from '../styles/Styles'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  Togglable.propTypes = {
    buttonLabelToShow: PropTypes.string.isRequired,
    buttonLabelToHide: PropTypes.string.isRequired,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <Div>
      <Div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabelToShow}</Button>
      </Div>
      <Div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>{props.buttonLabelToHide}</Button>
      </Div>
    </Div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
