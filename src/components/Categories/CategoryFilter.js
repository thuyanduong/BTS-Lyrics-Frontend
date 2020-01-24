import React from 'react'
import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import {sortCategories} from '../../redux/actionCreators'

const CategoryFilter = (props) => {
    return (
      <div className="ui form segment profile">
        <div className="field">
          <div className="ui icon field input">
            <input
              className="prompt"
              type="text"
              name="categorySearchText"
              placeholder="Search Categories"
              onChange={props.onChange}
              value={props.categorySearchText}
            />
            <i className="search icon"></i>
          </div>
        </div>
        <div className="field">
          <Dropdown
            clearable
            placeholder='Sort Categories'
            selection
            onChange={(e, data) => props.sortCategories(data.value)}
            value={props.sortBy}
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
