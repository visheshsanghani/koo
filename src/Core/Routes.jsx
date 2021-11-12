import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

const Routes = (props) => {
    const { routes, redirectTo } = props
    
    const renderRoutes = () => {
        return routes.map(({
            component: Component,
            path,
            active = true,
            render,
            ...rest
        }) => {
            if (!active) return null
            return (
                <Route
                    key={path}
                    path={path}
                    component={Component}
                    render={render}
                    {...rest}
                />
            );
        })
    }
    return (
        <Fragment>
            <Switch>
                {renderRoutes()}
                {redirectTo && <Redirect to={redirectTo} />}
            </Switch>
        </Fragment>
    )
}

export default Routes
