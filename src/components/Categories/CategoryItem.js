import React from 'react'
import {withRouter} from 'react-router-dom'
import {submit} from '../../redux/actionCreators'
import {connect} from 'react-redux'
import {fetchActiveCategory} from '../../redux/actionCreators'

class CategoryItem extends React.Component {
  constructor(){
    super()
    this.state = {
      showOptions: false
    }
  }

  redirect = (e, url) => {
    e.stopPropagation()
    this.props.history.push(url)
  }

  confirmDelete = () => {
    return window.confirm("Are you sure you want to delete this category?")
  }

  deleteCategory = (e) => {
    e.stopPropagation()
    if(this.confirmDelete()){
      this.props.submit("category", {
        id: this.props.category.id
      }, {
        method: "DELETE",
        callback: ()=>{}
      })
    }
  }

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
      {
        this.state.showOptions ?
        <div className="hover-category" style={{position: 'absolute', top: 0, left: 0}}>
          <div>
            <i className="grey edit icon" onClick={(e)=>this.redirect(e, `/categories/edit/${category.id}`)}></i>
          </div>
          <div>
            <i className="grey trash icon" onClick={this.deleteCategory}></i>
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
