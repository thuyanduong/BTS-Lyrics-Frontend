import React from 'react'
import CategoryItem from './CategoryItem'
import {connect} from 'react-redux'

const CategoriesList = (props) => {
  return (
    <React.Fragment>
      {props.categories.map(category => <CategoryItem
        key={category.id}
        category={category}/>)}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(mapStateToProps)(CategoriesList)
