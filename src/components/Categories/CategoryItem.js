import React from 'react'
import {withRouter} from 'react-router-dom'
import {submit} from '../../redux/actionCreators'
import {connect} from 'react-redux'
import {fetchActiveCategory} from '../../redux/actionCreators'
import {Modal, Grid} from 'semantic-ui-react'

class CategoryItem extends React.Component {
  constructor(){
    super()
    this.state = {
      showOptions: false,
      showConfirmation: false
    }
  }

  redirect = (e, url) => {
    e.stopPropagation()
    this.props.history.push(url)
  }

  deleteCategory = (e) => {
    e.stopPropagation()
    this.props.submit("category", {
      id: this.props.category.id
    }, {
      method: "DELETE",
      callback: ()=>{}
    })
  }

  toggleModal = () => {
    this.setState({showConfirmation: !this.state.showConfirmation})
  }

  renderModal = () => (
    <Modal open={this.state.showConfirmation} onClose={this.toggleModal}>
      <Modal.Content>
      <Grid>
        <Grid.Column textAlign="center">
          <h2>{`Are you sure you want to delete the ${this.props.category.name} category?`}`
            <br/>
            <br/>
            <button className="ui button"
            onClick={this.toggleModal}>Cancel</button>
            <button className="ui primary button"
            onClick={this.deleteCategory}>Yes, Delete!</button>
          </h2>
        </Grid.Column>
      </Grid>
      </Modal.Content>
    </Modal>
  )

  render(){
    let {category, fetchActiveCategory} = this.props
    return (
      <div
        className="ui segment category"
        style={{borderRight: `0.5em solid ${category.color}`, position: 'relative'}}
        onClick={() => fetchActiveCategory(category.id)}
        onMouseEnter={()=>this.setState({showOptions: true})}
        onMouseLeave={()=>this.setState({showOptions: false})}
      >
      {this.renderModal()}
      {
        this.state.showOptions ?
        <div className="hover-category" style={{position: 'absolute', top: 0, left: 0}}>
          <div>
            <i className="grey edit icon" onClick={(e)=>this.redirect(e, `/categories/edit/${category.id}`)}></i>
          </div>
          <div>
            <i className="grey trash icon" onClick={this.toggleModal}></i>
          </div>
        </div>
        :
        null
      }
        {category.name}
      </div>
    )
  }
}

export default withRouter(connect(null, {submit, fetchActiveCategory})(CategoryItem))
