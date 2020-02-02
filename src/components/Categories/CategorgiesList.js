import React from 'react'
import CategoryItem from './CategoryItem'
import {connect} from 'react-redux'

class CategoriesList extends React.Component {
  sortFunction = () => {
    switch (this.props.sortBy) {
      case "Newest":
        return (a, b) => b.created_at.localeCompare(a.created_at)
      case "Oldest":
        return (a, b) => a.created_at.localeCompare(b.created_at)
      case "Recently Updated":
        return (a, b) => b.updated_at.localeCompare(a.updated_at)
      case "Alphabetical":
        return (a, b) => a.name > b.name
      default:
        return (a, b) => 0
    }
  }

  sortedCategories = () => {
    return [...this.props.categories].sort(this.sortFunction())
  }

  render(){
    return (
      <React.Fragment>
        {this.sortedCategories().map(category => <CategoryItem
          key={category.id}
          category={category}/>)}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories.filter(category => (
    category.name.toLowerCase().includes(ownProps.categorySearchText.toLowerCase())
  )),
  sortBy: state.sortCategories
})

export default connect(mapStateToProps)(CategoriesList)
