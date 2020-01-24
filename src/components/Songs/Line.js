import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withRouter} from 'react-router-dom'
import removeWhiteSpace from '../../_helpers/removeWhiteSpace'
import { Popup } from 'semantic-ui-react'

class Line extends React.Component {

  constructor(){
    super()
    this.state = {
      showLeftOptions: false,
      showRightOptions: false
    }
  }

  renderHighLightedSpan = (type, line) => {
    if(!line){
      return '<span>&nbsp;</span>'
    }else if(type === this.props.queryType){
      let reg = `(${removeWhiteSpace(this.props.searchTerm).split('').join('\\s*')})`
      let regExp = new RegExp(reg, 'gi');
      return line.replace(regExp, '<span class="highlight">$1</span>');
    }
    return line
  }

  textToCopy = () => {
    let {index, lyricsArray, transArray, title} = this.props
    return `[[${title}](${this.props.location.pathname}?line=${lyricsArray[index].trim().replace(/ /g,"%20")})] ${lyricsArray[index]} / ${transArray[index]}`
  }

  render(){
    let {index, lyricsArray, transArray, queryType, searchTerm} = this.props
    let match
    if(queryType === 'line'){
      let searchText = removeWhiteSpace(searchTerm)
      let lyrics = removeWhiteSpace(lyricsArray[index])
      let trans = removeWhiteSpace(transArray[index])
      match = (searchText === lyrics || searchText === trans) ? true : false
    }
    return (
      <React.Fragment>
        <span
          className={`eight wide column lyrics lyrics-row ${match? "line" : ""}`}
          onMouseEnter={()=>this.setState({showLeftOptions: true})}
          onMouseLeave={()=>this.setState({showLeftOptions: false})}
        >
          <span dangerouslySetInnerHTML={{__html: this.renderHighLightedSpan('lyrics', lyricsArray[index])}}>
          </span>
          {
            this.state.showLeftOptions ?
            <div style={{float: "right"}}>
              <div>
                <CopyToClipboard text={this.textToCopy(index, lyricsArray, transArray)}>
                  <div>
                    <Popup
                      basic
                      trigger={<i className="grey copy icon"></i>}
                      on="click"
                      content="Copied to Clipboard"
                      className={`transition fade out`}
                      position="top center"
                    />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            :
            null
          }
        </span>
        <span
          className={`eight wide column translation lyrics-row ${match? "line" : ""}`}
          onMouseEnter={()=>this.setState({showRightOptions: true})}
          onMouseLeave={()=>this.setState({showRightOptions: false})}
        >
          <span dangerouslySetInnerHTML={{__html: this.renderHighLightedSpan('translation', transArray[index])}}>
          </span>
          {
            this.state.showRightOptions ?
            <div style={{float: "right"}}>
              <div>
                <CopyToClipboard text={this.textToCopy(index, lyricsArray, transArray)}>
                  <div>
                    <Popup
                      basic
                      trigger={<i className="grey copy icon"></i>}
                      on="click"
                      content="Copied to Clipboard"
                      className={`transition fade out`}
                      position="top center"
                    />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            :
            null
          }
        </span>
      </React.Fragment>
    )
  }
}

export default withRouter(Line)
