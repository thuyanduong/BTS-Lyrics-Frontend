import React from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'semantic-ui-react'
import textColor from '../../_helpers/textColor'
import {submit} from '../../redux/actionCreators'
import {connect} from 'react-redux'
import Speech from 'react-speech'
const ReactMarkdown = require('react-markdown/with-html')

class FlashCardDetails extends React.Component {
  redirect = (url) => {
    this.props.history.push(url)
  }

  confirmDelete = () => {
    return window.confirm("Are you sure you want to delete this flash card?")
  }

  deleteCard = () => {
    if(this.confirmDelete()){
      this.props.submit("card", {
        id: this.props.card.id
      }, {
        method: "DELETE",
        callback: ()=>{this.props.history.push('/')}
      })
    }
  }

  render(){
    let {language, card: {korean, english, notes, id}} = this.props
    return (
      <Modal size="large" open={true} onClose={()=>this.props.history.push('/')}>
        <Modal.Content>
          <Modal.Description>
            {this.props.card ?
              <div className="ui form">
                <div className="field" style={{margin:"auto", display: "block", textAlign: "center"}}>
                  <div style={{margin: "0em 2em", display:"inline-block"}}>
                    <p style={{fontWeight: "700"}}>{language === "Korean" ? "Korean:" : "English:"}</p>
                    <div className="ui flash-card-modal">
                      <span>
                        {language === "Korean" ? korean : english}
                      </span>
                    </div>
                  </div>
                  <div style={{margin: "0em 2em", display:"inline-block"}}>
                    <p style={{fontWeight: "700"}}>{language === "Korean" ? "English:" : "Korean:"}</p>
                    <div className="ui flash-card-modal">
                      <span>
                        {language === "Korean" ? english : korean}
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{textAlign:"center"}}>
                  <Speech
                    lang="ko-KR"
                    voice="Yuna"
                    text={this.props.card.korean}
                    textAsButton
                    displayText="Play Pronounciation"
                  />
                </p>
                <div className="field" style={{marginTop: "1em"}}>
                  <label>Notes:</label>
                  <div className="ui segment" style={{overflow: 'auto', maxHeight: 200 }}>
                    <ReactMarkdown
                      source={notes}
                      escapeHtml={false}
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Categories:</label>
                  {this.props.card.categories.map(category => (
                    <div key={category.id} className="ui label" style={{backgroundColor: category.color, color: textColor(category.color)}}>{category.name}</div>
                  ))}
                </div>
                <div className="field" style={{textAlign:"right"}}>
                  <button onClick={this.deleteCard} className="ui negative basic button">
                    Delete
                  </button>
                  <button onClick={()=>this.redirect('/')} className="ui button">
                    Close
                  </button>
                  <button onClick={()=>this.redirect(`/flash-cards/edit/${id}`)} className="ui primary button">
                    Edit
                  </button>
                </div>
              </div> :
              null
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  language: state.flashCardFront
})

export default withRouter(connect(mapStateToProps, {submit})(FlashCardDetails))
