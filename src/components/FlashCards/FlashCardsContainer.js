import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import NotFound from '../NotFound'
import CategoriesList from '../Categories/CategorgiesList'
import FlashCardsList from './FlashCardsList'
import CategoryFilter from '../Categories/CategoryFilter'
import FlashCardFilter from './FlashCardFilter'
import CategoryForm from '../Categories/CategoryForm'
import FlashCardModal from './FlashCardModal'
import {Button} from 'semantic-ui-react'
import {fetchingFlashCards, resetFilter} from '../../redux/actionCreators'

class FlashCardsContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      flashCardSearchText: "",
      categorySearchText: ""
    }
  }

  componentDidMount(){
    if(this.props.allFlashCards.length === 0){
      this.props.fetchingFlashCards()
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  resetFilter = () => {
    this.setState({
      flashCardSearchText: "",
      categorySearchText: ""
    })
    this.props.resetFilter()
  }

  filteredCards = () => {
    let filteredCards = this.flashCards()
    if(this.state.flashCardSearchText !== ""){
      filteredCards = this.flashCards().filter((card) => {
        if(card.english.toLowerCase().includes(this.state.flashCardSearchText.toLowerCase())){
          return true
        }else if(card.korean.includes(this.state.flashCardSearchText)){
          return true
        }else{
          return false
        }
      })
    }
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

  MainComponent = () => {
    let cards = this.filteredCards()
    return (
      <div>
      <div className="ui grid segment flash-card-container">
        <div className="ui four wide column" style={{padding: "0em"}}>
          <CategoryFilter
            onChange={this.onChange}
            categorySearchText={this.state.categorySearchText}
          />
        </div>
        <div className="ui twelve wide column" style={{padding: "0em"}}>
          <FlashCardFilter
            flashCardSearchText={this.state.flashCardSearchText}
            onChange={this.onChange}
            count={cards.length}
            resetFilter={this.resetFilter}
          />
        </div>
        <div className="ui four wide column" style={{padding: "0em"}}>
          <div className="ui segments">
            <CategoriesList
              categorySearchText={this.state.categorySearchText}
            />
          </div>
          <Button onClick={() => this.props.history.push("/categories/new")} style={{marginBottom: "1em"}}>
            <i className="plus icon"></i>
            Add Category
          </Button>
        </div>
        <div className="ui twelve wide column" style={{padding: "0em"}}>
          <div className="ui cards">
            <FlashCardsList
              flashCards={[...cards]}
            />
          </div>
        </div>
      </div>
      </div>
    )
  }

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

export default withRouter(connect(mapStateToProps, {fetchingFlashCards, resetFilter})(FlashCardsContainer))
