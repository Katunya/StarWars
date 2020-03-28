import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import './person-details.css';
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true
  };

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      });
      this.updatePerson()
    }
  }

  updatePerson() {
    const {personId} = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError)
  };

  render() {
    const {person, error, loading} = this.state;
    const hasData = !(loading || error);
    const errorMessages= error? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/>  :null;
    const content = hasData ? <PersonView person = {person} /> : null;

    if(!this.state.person){
      return <span>Select a person from a list</span>;
    }
    return (
      <div className="person-details card">
        {errorMessages}
        {spinner}
        {content}
      </div>
    )
  }
}

const PersonView = ({person}) => {
  const {id, name, gender, birthYear, eyeColor} = person;
  return (
    <React.Fragment> <img className="person-image"
                          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
      <div className="card-body">
        <h4>{name} {id}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span> <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span> <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span> <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
