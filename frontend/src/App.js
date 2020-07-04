import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Home from './screens/Home';
import SignIn from './screens/Signin';
import SignUp from './screens/SignUp';
import ManagerLinks from './screens/Manager/Links';
import ManagerLinksCreate from './screens/Manager/Links/Create';
import ManagerLinksEdit from './screens/Manager/Links/Edit';



const App = () => {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item"> <Link to="/sign-in"> Sign-in  </Link> </li>
                        <li className="list-group-item"> <Link to="/sign-up"> Sign-up  </Link> </li>
                        <li className="list-group-item"> <Link to="/manager/links/create"> Create Link  </Link> </li>
                        <li className="list-group-item"> <Link to="/manager/links/edit"> Edit LInk  </Link> </li>
                        <li className="list-group-item"> <Link to="/manager/links"> Links </Link> </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/sign-in">
                        <SignIn />
                    </Route>
                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
                    <Route path="/manager/links/create">
                        <ManagerLinksCreate />
                    </Route>
                    <Route path="/manager/links/edit">
                        <ManagerLinksEdit />
                    </Route>
                    <Route path="/manager/links">
                        <ManagerLinks />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>

                </Switch>
            </div>
        </BrowserRouter>
    )
};

export default App;

