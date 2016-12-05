import React, { PropTypes } from 'react'
import ReactTimeout from 'react-timeout'
import Quote from './Quote'
import TweetButton from './TweetButton'
import RefreshButton from './RefreshButton'

class QuoteBox extends React.Component {
  constructor (props) {
    super (props)
    this.state = { quote: '', author: '', tweetUrl: '', refreshing: false }
  }

  render () {
    const { quote, author, tweetUrl, refreshing } = this.state
    return (
      <div className="row">
        <div id="quote-box" className="col-sm-6 offset-sm-3 col-xs-10 offset-xs-1">
          <div id="quote-buttons" className="row">
            <div className="col-xs-6">
              <TweetButton url={tweetUrl}/>
            </div>
            <div className="col-xs-6 text-xs-right">
              <RefreshButton onClick={this.getQuote} />
            </div>
            <Quote quote={quote} author={author} refreshing={refreshing}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.getQuote()
  }

  getQuote = () => {
    this.setState({ refreshing: true})
    this.props.setTimeout(() => {
      const url = 'https://andruxnet-random-famous-quotes.p.mashape.com/'
      const params = new URLSearchParams()
      params.append('cat', 'famous')
      fetch(url, {
        method: 'POST',
        headers: {
          "X-Mashape-Key": "jp8m6fQQCgmshVxMTUBJRjvDEKTQp1xuVbRjsnOfZ7BEPE2l88",
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
      }).then(res => res.json()).then(json => {
        const tweetUrl = 'https://twitter.com/intent/tweet?text="' + json.quote + '" - ' + json.author
        this.setState({
          quote: json.quote,
          author: json.author,
          tweetUrl: tweetUrl,
          refreshing: false
        })
      })
    }, 1000)
  }
}

export default ReactTimeout(QuoteBox)
