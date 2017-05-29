import React from "react";
import ImageProvider from "../modules/ImageProvider";
import Loading from "./Loading";

const Start = React.createClass({
    getInitialState() {
        return {
            isLoading: true,
            resource: {},
        };
    },
    componentDidMount() {
        ImageProvider.provide(1)[0].then(this.setResource);
    },
    setResource(resource) {
        const newState = {
            isLoading: false,
            resource: resource,
        };
        this.setState(newState);
    },
    render() {
        return this.state.isLoading
            ? <Loading />
            : <img src={this.state.resource.data} />;
    },
});

export default Start;
