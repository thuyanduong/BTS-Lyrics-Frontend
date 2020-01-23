import React from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'semantic-ui-react'
import textColor from '../../_helpers/textColor'
import {submit} from '../../redux/actionCreators'
import {connect} from 'react-redux'

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
      <Modal size="large" open={true}>
        <Modal.Content>
          <Modal.Description>
            {this.props.card ?
              <div>
                <p><b>Korean:</b> {korean}</p>
                <p><b>English:</b> {english}</p>
                <p><b>Notes:</b> {notes}</p>
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
