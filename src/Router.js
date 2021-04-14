import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Details from './pages/Details/Details'
import Home from './pages/Home/Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:id" component={Details} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
