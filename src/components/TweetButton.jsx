import React, { PropTypes } from 'react'
import classNames from 'classnames'

class TweetButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { faded: true }
  }

  render () {
    const classes = classNames({
      'btn': true,
      'faded': this.state.faded
    })
    return (
      <a href={this.props.url} target="_blank">
        <button id="tweet-button" className={classes}>
          <i className="fa fa-twitter"></i>
        </button>
      </a>
    )
  }

  componentDidMount() {
    window.requestAnimationFrame(() => {
      this.setState({ faded: false })
    })
  }

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  static defaultProps = {
    url: '#'
  }
}

export default TweetButton
