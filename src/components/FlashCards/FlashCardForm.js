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

  render(){
    let {korean, english, notes, categories} = this.props.card
    return (
      <Modal size="large" open={true} onClose={()=>this.props.history.push("/")}>
        <Modal.Content>
          <Modal.Description>
            <form className="ui form">
              <div className="field">
                <label>Korean</label>
                <input type="text" name="korean" value={korean} onChange={this.props.onChange}/>
              </div>
              <div className="field">
                <label>English</label>
                <input type="text" name="english" value={english} onChange={this.props.onChange}/>
              </div>
              <div className="field">
                <label>Notes</label>
                <textarea name="notes" value={notes} onChange={this.props.onChange}></textarea>
              </div>
              <div className="field">
                <label>Categories</label>
                <Dropdown
                  placeholder='Categories'
                  fluid multiple selection search
                  value={categories.map(category => category.id)}
                  options={this.dropDownCategories()}
                  onChange={this.props.updateCategories}
                />
                <div style={{marginTop: "1em"}}>
                  <div className="ui primary basic button" onClick={()=>this.props.onSave(this.state.editing)}>
                    Save
                  </div>
                  <div className="ui button" onClick={()=>this.props.onCancel(this.state.editing)}>
                    Cancel
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
  categories: state.categories
})

export default withRouter(connect(mapStateToProps)(FlashCardForm))
