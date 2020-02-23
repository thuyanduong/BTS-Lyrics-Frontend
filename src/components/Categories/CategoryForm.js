import React from 'react'
import {Header, Modal, Form} from 'semantic-ui-react'
import {ChromePicker} from 'react-color'
import {connect} from 'react-redux'
import {submit, addMessage} from '../../redux/actionCreators'
import {withRouter} from 'react-router-dom'
import URL from '../../_helpers/url'

class CategoryForm extends React.Component {
  constructor(props){
    super()
    this.state = {
      categoryName : "",
      color: "#000",
      id: null
    }
  }

  componentDidMount(){
    if(this.props.categoryId){
      fetch(`${URL}/categories/${this.props.categoryId}`)
      .then(res => res.json())
      .then(category => {
        this.setState({
          categoryName: category.name,
          color: category.color,
          id: category.id
        })
      })
      .catch(err => this.props.addMessage(err.toString(), "error"))
    }
  }

  handleChange = (color, event) => {
    this.setState({color: color.hex})
  }

  submit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if(this.state.categoryName === ""){
      this.props.addMessage("Please enter a category title.", "error")
    }else{
      this.props.submit("category", {
        user_id: this.props.user.id,
        color: this.state.color,
        name: this.state.categoryName,
        id: this.state.id
      }, {
        method: this.props.edit ? "PATCH" : "POST",
        callback: this.redirect
      })
    }
  }

  redirect = () => {
    this.props.history.push("/")
  }

  render(){
    return (
      <Modal size="small" open={true} onClose={()=>this.props.history.push('/')}>
        <Modal.Content>
          <Form onSubmit={this.submit}>
          <Modal.Description>
            <Header>{this.props.edit ? "Edit" : "Add"} Category
            <i className="large circle icon" style={{color: this.state.color, float: "right", marginRight:"0"}}></i>
            </Header>
            <div className="ui form">
              <div className="two fields">
                <div style={{display:"inline-block", marginLeft:"1em"}}>
                  <ChromePicker onChange={this.handleChange} color={this.state.color} disableAlpha={true}/>
                </div>
                <div style={{display:"inline-block", marginLeft:"1em", width: "100%", position:"relative"}}>
                  <div className={`field ${this.state.error}`}>
                    <Form.Input className="name-input" type="text" placeholder="Name" name="name" style={{marginBottom: "1em"}}
                    onChange={(e)=>{this.setState({categoryName: e.target.value})}} value={this.state.categoryName}/>
                  </div>
                  <div className="field" style={{position:"absolute", bottom: 0, right: 0, textAlign:"right"}}>
                    <div>
                      <button type="submit" className="ui primary button">
                        Save
                      </button>
                      <button type="button" onClick={this.redirect} className="ui button">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Description>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default withRouter(connect(mapStateToProps, {submit, addMessage})(CategoryForm))
