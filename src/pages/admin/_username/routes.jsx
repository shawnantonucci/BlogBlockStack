import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import AdminUsernamePostsRoutes from "pages/admin/_username/posts/routes";

class AdminUsernameRoute extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    };

    render() {
        const { username } = this.props.match.params;

        return (
            <Switch>
                <Route
                    exact
                    path={this.props.match.url}
                    render={() => <div>Hello {username}</div>}
                />
                <Route
                    path={`${this.props.match.url}/posts`}
                    render={({ match }) => <AdminUsernamePostsRoutes match={match} />}
                />
            </Switch>
        );
    }
}

export default AdminUsernameRoute;
