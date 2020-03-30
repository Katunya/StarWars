import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import PeoplePage from '../people-page';
import ErrorBoundry from "../error-boundry";

import './app.css';
import ItemDetails from "../item-details";
import Row from "../row";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  render() {

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
    } = this.swapiService;
    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}/>
    );

    const starshipDetails = (
      <ItemDetails itemId={5} getData={getStarship} getImageUrl={getStarshipImage}/>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header/> <Row left={personDetails} right={starshipDetails}/>
        </div>
      </ErrorBoundry>
    );
  }
}
