import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Components
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import InstructionsCard from './components/HomePage/HomeInstructionsCard';
import LogInPage from './pages/LogInPage/LogInPage';
import CreateAccountPage from './pages/CreateAccountPage/CreateAccountPage';
import NoMatch from './components/404Page/NoMatch';
import WeatherPage from './pages/WeatherPage/WeatherPage';
import UserPage from "./pages/UserPage/UserPage"
import TravelSearch from "./pages/TravelSearch/TravelSearch";
import HotelSearchPage from './pages/HotelSearchPage/HotelSearchPage';
import Footer from './components/Footer/Footer';
import './style.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null,
      userId: null,
      results: []
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  // callApi = async () => {
  //   const response = await fetch("/airport/DEN");
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  componentDidMount() {
    this.getUser();
    // this.callApi()
    //   .then(res => this.setState({ results: res.data }))
    //   .then(res2 => console.log(this.state.results))
    //   .catch(err => console.log(err));
  }

  updateUser(userObject) {
    this.setState(userObject);
    console.log(userObject);
    console.log(this.state);
  }

  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          email: response.data.user.email
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          email: null
        });
      }
    });
  }

 componentDidMount(){
   console.log(this.state);
 }
  
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

          <Header />
          {this.state.loggedIn && <h2 className="welcome-user">Hi, {this.state.email}!</h2>}

          <Switch>
            {/* routes to different components */}
            <Route exact path="/" component={InstructionsCard} />
            <Route
              path="/login"
              render={() => <LogInPage updateUser={this.updateUser} />}
            />
            <Route path="/createaccount" render={() => <CreateAccountPage />} />
            <Route path="/weather" component={WeatherPage} />
            <Route path="/userpage" component={UserPage} />
            <Route path="/flightSearchPage" component={TravelSearch} user={this.state.userId} />
            <Route path="/hotelSearchPage" component={HotelSearchPage} />
            <Route component={NoMatch} />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
