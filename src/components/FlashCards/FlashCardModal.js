import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import FlashCardForm from './FlashCardForm'
import FlashCardDetails from './FlashCardDetails'
import {connect} from 'react-redux'
import URL from '../../_helpers/url'
import {submit} from '../../redux/actionCreators'

class FlashCardModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      card: {
        id: null,
        korean: '',
        english: '',
        notes: '',
        categories: []
      },
      oldState: null
    }
  }

  redirect = () => {
    this.cancelSave()
    if(this.state.editing){
      this.props.history.push(`/flash-cards/${this.props.card.id}`)
    }else{
      this.props.history.push('/')
    }
  }

  onChange = (e) => {
    if(e.constructor.name === "SyntheticEvent"){
      this.setState({
        card: {
          ...this.state.card,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  updateCategories = (e, data) => {
    this.setState({
      card: {
        ...this.state.card,
        categories: data.value.map(id => this.props.categories.find(category => category.id === id))
      }
    })
  }

  onSave = (editing) => {
    if(this.state.card.categories.length > 0){
      let options
      if(editing){
        options = {
          method: "PATCH",
          callback: () => {this.props.history.push(`/flash-cards/${this.state.card.id}`)}
        }
      }else{
        options = {
          method: "POST",
          callback: () => {this.props.history.push('/')}
        }
      }
      this.props.submit("card", {
        korean: this.state.card.korean,
        english: this.state.card.english,
        notes: this.state.card.notes,
        categories: this.state.card.categories,
        id: this.state.card.id
      }, options)
    }else{
      alert(`Error: Flash cards must belong to at least one category. Consider deleting the flash card if it has no category.`)
    }
  }

  onCancel = (editing) => {
    if(editing){
      this.setState({
        card: this.state.oldCard
      }, () => {
        this.props.history.push(`/flash-cards/${this.state.card.id}`)
      })
    }else{
      this.props.history.push('/')
    }
  }

  componentDidMount(){
    if(!(this.props.location.pathname === '/flash-cards/new')){
      fetch(`${URL}/cards/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(card => {
        this.setState({
          card,
          oldCard: card
        })
      })
    }
  }

  render(){
    return <Switch>
      <Route exact path={["/flash-cards/edit/:id", "/flash-cards/new"]} render={() => <FlashCardForm
        card={this.state.card}
        onChange={this.onChange}
        updateCategories={this.updateCategories}
        onSave={this.onSave}
        onCancel={this.onCancel}
        />}
      />
      <Route exact path="/flash-cards/:id" render={() => <FlashCardDetails
        card={this.state.card}
        />}
      />
    </Switch>
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default withRouter(connect(mapStateToProps, {submit})(FlashCardModal))
