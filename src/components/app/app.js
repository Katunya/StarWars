import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import {PeoplePage, PlanetsPage, StarshipsPage,LoginPage,SecretPage} from '../pages'
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";

import './app.css';

import {BrowserRouter as Router, Route , Switch , Redirect} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
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

  onLogin =() => {
    this.setState({
      isLoggedIn: true
    })
  };

  render() {

    const {isLoggedIn} = this.state;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet  />
              <Switch>
                <Route path="/" render={()=> <h2>Hello, my dear friend!</h2>} exact/>
                <Route path="/people/:id?" component={PeoplePage}/>
                <Route path="/planets" component={PlanetsPage}/>
                <Route path="/starships" component={StarshipsPage} exact/>

                <Route path="/starships/:id" render={({match})=> {
                  const { id } = match.params;
                  console.log(match);
                  return <StarshipDetails itemId={id}/>
                }}/>

                <Route path="/login" render={()=> (
                  <LoginPage
                    isLoggedIn={isLoggedIn}
                    onLogin={this.onLogin}/>
                    )}/>
                <Route path="/secret" render={()=> (
                  <SecretPage isLoggedIn={isLoggedIn}/>
                  )}/>
                  <Route render={()=>
                    <p> Page not found</p>
                  }/>
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
