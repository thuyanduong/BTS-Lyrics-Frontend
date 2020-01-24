import React from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'semantic-ui-react'
import textColor from '../../_helpers/textColor'
import {submit} from '../../redux/actionCreators'
import {connect} from 'react-redux'
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
    let {korean, english, notes, id} = this.props.card
    return (
      <Modal size="large" open={true} onClose={()=>this.props.history.push('/')}>
        <Modal.Content>
          <Modal.Description>
            {this.props.card ?
              <div>
                <p>Korean: {korean}</p>
                <p>English: {english}</p>
                <div>
                  <label>Notes:</label>
                  <div className="" style={{border: "solid grey"}}>
                    <ReactMarkdown
                      source={notes}
                      escapeHtml={false}
                    />
                  </div>
                </div>
                <p><b>Categories:</b></p>
                <div>
                  {this.props.card.categories.map(category => (
                    <div key={category.id} className="ui label" style={{backgroundColor: category.color, color: textColor(category.color)}}>{category.name}</div>
                  ))}
                </div>
                <div style={{marginTop: "1em"}}>
                  <button onClick={()=>this.redirect(`/flash-cards/edit/${id}`)} className="ui primary basic button">
                    Edit
                  </button>
                  <button onClick={this.deleteCard} className="ui negative basic button">
                    Delete
                  </button>
                  <button onClick={()=>this.redirect('/')} className="ui button">
                    Close
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

export default withRouter(connect(null, {submit})(FlashCardDetails))
