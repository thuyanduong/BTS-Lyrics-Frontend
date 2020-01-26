import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Modal, Dropdown} from 'semantic-ui-react'

class FlashCardForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: this.props.match.params.id ? true : false
    }
  }

  dropDownCategories = () => {
    return this.props.categories.map(category => ({ key: category.id, text: category.name, value: category.id }))
  }

  getKoreanSide = () => {
    return (
      <div style={{margin: "0em 2em", display:"inline-block"}}>
        <p style={{fontWeight:700}}>Korean:</p>
        <input type="text" name="korean" value={this.props.card.korean} onChange={this.props.onChange}
          style={{width:"290px", height:"175px", textAlign:"center", fontSize:"2em"}}
        />
      </div>
    )
  }

  getEnglishSide = () => {
    return (
      <div style={{margin: "0em 2em", display:"inline-block"}}>
        <p style={{fontWeight:700}}>English:</p>
        <input type="text" name="english" value={this.props.card.english} onChange={this.props.onChange}
          style={{width:"290px", height:"175px", textAlign:"center", fontSize:"2em"}}
        />
      </div>
    )
  }

  render(){
    let {notes, categories} = this.props.card
    return (
      <Modal size="large" open={true} onClose={()=>this.props.history.push("/")}>
        <Modal.Content>
          <Modal.Description>
            <form className="ui form">
              <div className="field" style={{margin:"auto", display: "block", textAlign: "center"}}>
                {this.props.language === "Korean" ? this.getKoreanSide() : this.getEnglishSide()}
                {this.props.language === "English" ? this.getKoreanSide() : this.getEnglishSide()}
              </div>
              <div className="field">
                <label>Notes:</label>
                <textarea name="notes" value={notes} onChange={this.props.onChange}></textarea>
              </div>
              <div className="field" style={{display:"table", width:"100%"}}>
                <label style={{marginBottom:"0.5em"}}>Categories:</label>
                <div style={{display: "table-row"}}>
                  <div className="" style={{display: "table-cell"}}>
                    <Dropdown
                      placeholder='Categories'
                      fluid multiple selection search
                      value={categories.map(category => category.id)}
                      options={this.dropDownCategories()}
                      onChange={this.props.updateCategories}
                    />
                  </div>
                  <div style={{display: "table-cell", width: "1em"}}>
                  </div>
                  <div style={{display: "table-cell", width: "165px", verticalAlign:"middle"}}>
                    <div className="ui primary basic button" onClick={()=>this.props.onSave(this.state.editing)}>
                      Save
                    </div>
                    <div className="ui button" onClick={()=>this.props.onCancel(this.state.editing)}>
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </form>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  language: state.flashCardFront
})

export default withRouter(connect(mapStateToProps)(FlashCardForm))
