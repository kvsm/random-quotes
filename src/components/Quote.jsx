import React, { PropTypes } from 'react'
import classNames from 'classnames'

class Quote extends React.Component {
  constructor (props) {
    super(props)
    this.state = { faded: true }
  }

  render () {
    const quote =  this.props.quote || Quote.defaultProps.quote
    const author = this.props.author || Quote.defaultProps.author
    const quoteClasses = classNames({
      'faded': this.state.faded
    })
    const authorClasses = classNames({
      'pull-right': true,
      'faded': this.state.faded
    })
    return (
      <blockquote className="blockquote">
        <p id="quote" ref={(el) => this.quoteElement = el } className={quoteClasses}>"{quote}"</p>
        <footer id="author" className={authorClasses}>- {author}</footer>
      </blockquote>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.refreshing && !prevProps.refreshing) {
      this.setState({ faded: true })
      const listener = () => {
        this.quoteElement.removeEventListener('transitionend', listener)
        this.props.onTransitionEnd()
      }
      this.quoteElement.addEventListener('transitionend', listener)
    } else if (prevProps.quote !== this.props.quote) {
      this.setState({ faded: false })
    }
  }

  static propTypes = {
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onTransitionEnd: PropTypes.func.isRequired
  }

  static defaultProps = {
    quote: '"I\'m all out of inspiration right now :("',
    author: 'Some broken API',
    refreshing: false
  }
}

export default Quote
