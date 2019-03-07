import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const AnonRoute = ({ component: Component, authenticated,...rest }) => {
 return <Route render={(props) => (authenticated ?<Redirect to="/home" /> :<Component {...props} />  )} {...rest} />;
};
export default AnonRoute;