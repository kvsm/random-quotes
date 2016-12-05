import React, { PropTypes } from 'react'
import QuoteBox from './components/QuoteBox'

class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <QuoteBox />
      </div>
    )
  }
}

export default App
