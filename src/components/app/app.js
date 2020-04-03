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
import DummySwapiService from "../../services/dummy-swapi-service";

export default class App extends Component {



  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {

      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;
      
      console.log("Switched", Service.name);
      return {
        swapiService: new Service()
      };
    });
  };



  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>

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
