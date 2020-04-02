import React, {Component} from 'react';

import './app.css';
import Header from '../header';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";


import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header/>

            <PersonDetails itemId={11}/>
            <PlanetDetails itemId={5}/>
            <StarshipDetails itemId={5}/>


            <PersonList>
              {({name}) => <span>{name}</span>}
            </PersonList>

            <StarshipList>
              {({name}) => <span>{name}</span>}
            </StarshipList>

            <PlanetList>
              {({name}) => <span>{name}</span>}
            </PlanetList>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
