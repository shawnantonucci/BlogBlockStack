import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { POST_FILENAME } from "utils/contants";
import generateUUID from "utils/generateUUID";

class PostForm extends Component {
    constructor(props) {
        super(props);

        const { post = {} } = props;

        this.state = {
            title: post.title || "", // returns an edited post or starting a new post
            description: post.description || "", // returns an edited post or starting a new post
            posts: []
        };
    }

    static propTypes = {
        userSession: PropTypes.object.isRequired,
        username: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const { userSession } = this.props;
        const options = { decrypt: false };

        const result = await userSession.getFile(POST_FILENAME, options);

        if (result) {
            return this.setState({ posts: JSON.parse(result) });
        }

        return null;
    };

    seeRandom = async () => {
        const { userSession } = this.props;
        await userSession.getFile("random.json", { decrypt: false });
    };

    createPost = async () => {
        const options = { encrypt: false };
        const { title, description, posts } = this.state;
        const { history, userSession, username } = this.props;
        const id = generateUUID();

        // for posts.json
        const params = {
            id,
            title,
        };

        // for post-${post-id}.json
        // { id, title, description }
        const detailParams = {
            ...params,
            description
        };

        try {
            await userSession.putFile(
                POST_FILENAME,
                JSON.stringify([...posts, params]),
                options
            );
            await userSession.putFile(
                `post-${id}.json`,
                JSON.stringify(detailParams),
                options
            );
            this.setState(
                {
                    title: "",
                    description: ""
                },
                () => history.push(`/admin/${username}/posts`)
            );
        } catch (e) {
            console.log(e);
        }
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
        console.log(this.state.posts);
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
