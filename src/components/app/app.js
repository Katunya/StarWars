import React, {Component} from 'react';

import Header from '../header';
import ErrorBoundry from "../error-boundry";

import './app.css';
import ItemDetails from "../item-details";
import Row from "../row";
import SwapiService from "../../services/swapi-service";
import {Record} from "../item-details/item-details";

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
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender"/>
        <Record field="eyeColor" label="Eye color"/>
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails itemId={5}
                   getData={getStarship}
                   getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model"/>
        <Record field="length" label="Length"/>
        <Record field="costInCredits" label="Cost"/>
      </ItemDetails>

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
