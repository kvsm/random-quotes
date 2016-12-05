import React, { PropTypes } from 'react'
import classNames from 'classnames'

class RefreshButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { faded: true }
  }

  render () {
    const onClick = this.props.onClick
    const classes = classNames({
      'btn': true,
      'faded': this.state.faded
    })
    return (
      <button id="refresh-button" className={classes} onClick={onClick}>
        <i className="fa fa-refresh"></i>
      </button>
    )
  }

  componentDidMount() {
    window.requestAnimationFrame(() => {
      this.setState({ faded: false })
    })
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired
  }
}

export default RefreshButton
