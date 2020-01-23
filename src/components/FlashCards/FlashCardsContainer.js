import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import NotFound from '../NotFound'
import CategoriesList from '../Categories/CategorgiesList'
import FlashCardsList from './FlashCardsList'
import Profile from './Profile'
import Filterbar from './Filterbar'
import CategoryForm from '../Categories/CategoryForm'
import FlashCardModal from './FlashCardModal'
import {Button} from 'semantic-ui-react'
import {fetchingFlashCards} from '../../redux/actionCreators'

class FlashCardsContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filters: {
        sortBy: "Created At", //Created At, Updated At, Alphabetically
        ascending: true,
        searchTerm: ""
      }
    }
  }

  componentDidMount(){
    if(this.props.allFlashCards.length === 0){
      this.props.fetchingFlashCards()
    }
  }

  changeFilter = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [event.target.name]: event.target.value
      }
    })
  }

  isFiltered = () => {
    let {filters: {sortBy, ascending, searchTerm}} = this.state
    if(sortBy === "Created At" && ascending === true && searchTerm === ""){
      return false
    }
    return true
  }

  filteredCards = () => {
    let filteredCards = this.flashCards().filter((card) => {
      if(card.english.toLowerCase().includes(this.state.filters.searchTerm.toLowerCase())){
        return true
      }else if(card.korean.includes(this.state.filters.searchTerm)){
        return true
      }else{
        return false
      }
    })
    return filteredCards
  }

  flashCards = () => {
    let cards
    if(this.props.activeCategory){
      cards = this.props.activeCategory.flashCards
    }else if(this.props.allFlashCards.length === 0){
      cards = this.props.recentFlashCards
    }else if(this.props.allFlashCards.length > 0){
      cards = this.props.allFlashCards
    }
    return cards
  }

  MainComponent = () => (
    <div className="ui grid segment flash-card-container">
      <div className="ui four wide column" style={{padding: "0em"}}>
        <Profile/>
      </div>
      <div className="ui twelve wide column" style={{padding: "0em"}}>
        <Filterbar
          filters={this.state.filters}
          isFiltered={this.isFiltered()}
          changeFilter={this.changeFilter}
        />
      </div>
      <div className="ui four wide column" style={{padding: "0em"}}>
        <div className="ui segments">
          <CategoriesList/>
        </div>
        <Button onClick={() => this.props.history.push("/categories/new")} style={{marginBottom: "1em"}}>
          <i className="plus icon"></i>
          Add Category
        </Button>
      </div>
      <div className="ui twelve wide column" style={{padding: "0em"}}>
        <div className="ui cards">
          <FlashCardsList
            flashCards={this.isFiltered() ? this.filteredCards() : this.flashCards()}
          />
        </div>
      </div>
    </div>
  )

  render(){
    return this.props.user ? (
      <React.Fragment>
        <this.MainComponent />
        <Switch>
          <Route exact path="/categories/new" render={() => <CategoryForm
            edit={false}
            categoryId={null}
            />}
          />
          <Route exact path="/categories/edit/:id" render={() => <CategoryForm
            edit={true}
            categoryId={this.props.match.params.id}
            />}
          />
          <Route exact path={["/flash-cards/new", "/flash-cards/edit/:id", "/flash-cards/:id"]} component={FlashCardModal} />
        </Switch>
      </React.Fragment>
    ) : <NotFound />
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    loading: state.loadingCurrentUser,
    categories: state.categories,
    recentFlashCards: state.recentFlashCards,
    allFlashCards: state.allFlashCards,
    activeCategory: state.activeCategory
  }
}

export default withRouter(connect(mapStateToProps, {fetchingFlashCards})(FlashCardsContainer))
