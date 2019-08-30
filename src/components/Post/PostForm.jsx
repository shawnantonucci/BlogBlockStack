import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { POST_FILENAME } from "utils/contants";
import generateUUID from "utils/generateUUID";

class PostForm extends Component {
    state = {
        title: "",
        description: ""
    };

    static propTypes = {
        userSession: PropTypes.object.isRequired,
        username: PropTypes.string.isRequired
    };

    seeRandom = async () => {
        const { userSession } = this.props;
        await userSession.getFile("random.json", { decrypt: false });
    };

    createPost = async () => {
        const options = { encrypt: false };
        const { title, description } = this.state;
        const { history, userSession, username } = this.props;

        const params = {
            title,
            description
        };

        await userSession.putFile(
            "random.json",
            JSON.stringify(params),
            options
        );
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.createPost();
    };

    render() {
        return (
            <div>
                <Button onClick={this.seeRandom}>See Random</Button>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <input
                            name="title"
                            onChange={this.onChange}
                            s
                            placeholder="Title of the Post"
                            value={this.state.title}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.TextArea
                            placeholder="Tell us more about you..."
                            name="description"
                            onChange={this.onChange}
                            placeholder="Create Posts here!"
                            rows={20}
                            value={this.state.description}
                        />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(PostForm);
