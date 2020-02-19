import React from 'react'
import {connect} from 'react-redux'
import { Dropdown, Search, Icon } from 'semantic-ui-react'
import {sortCategories} from '../../redux/actionCreators'

const CategoryFilter = (props) => {
  let {onChange, categorySearchText, sortCategories, sortBy} = props
    return (
      <div className="ui form segment profile">
        <div className="field">
          <Search
            fluid
            type="text"
            name="categorySearchText"
            placeholder="Search Categories"
            value={categorySearchText}
            onSearchChange={(e)=>onChange(e.target.name, e.target.value)}
            showNoResults={false}
            icon={
              categorySearchText === "" ?
              <Icon name='search'/> :
              <Icon name='delete' link onClick={(e)=>onChange("categorySearchText", "")}/>
            }
          />
        </div>
        <div className="field">
          <Dropdown
            clearable
            placeholder='Sort Categories'
            selection
            onChange={(e, data) => sortCategories(data.value)}
            value={sortBy}
            options={[
                {
                  key: 'Newest',
                  text: 'Newest',
                  value: 'Newest'
                },
                {
                  key: 'Oldest',
                  text: 'Oldest',
                  value: 'Oldest'
                },
                {
                  key: 'Recently Updated',
                  text: 'Recently Updated',
                  value: 'Recently Updated'
                },
                {
                  key: 'Alphabetical',
                  text: 'Alphabetical',
                  value: 'Alphabetical'
                }
              ]}
          />
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
  user: state.currentUser,
  sortBy: state.sortCategories
})

export default connect(mapStateToProps, {sortCategories})(CategoryFilter)
