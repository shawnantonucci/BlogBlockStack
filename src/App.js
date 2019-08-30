import React, { Component } from "react";
import "stylesheets/main.scss";
import { Container } from "react-bulma-components";
import { appConfig } from "utils/contants";
import { UserSession } from "blockstack";
import Login from "components/Login";
import Navbar from "components/NavBar";

class App extends Component {
    state = {
        userSession: new UserSession({ appConfig })
    };

    componentDidMount = async () => {
        const { userSession } = this.state;

        if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
            const userData = await userSession.handlePendingSignIn();

            if (!userData.username) {
                throw new Error("This app requires a username");
            }

            window.location = "/";
        }
    };

    render() {
        const { userSession } = this.state;

        return (
            <div className="App">
                <Navbar userSession={userSession} />
                <Container>
                    {userSession.isUserSignedIn() ? (
                        <div>You are signed in</div>
                    ) : (
                        <Login userSession={userSession} />
                    )}
                </Container>
            </div>
        );
    }
}

export default App;
