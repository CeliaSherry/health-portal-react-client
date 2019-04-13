import React from 'react'

class Login extends React.Component {
    render() {
        return (
            <h1>{this.props.match.params.criteria}</h1>
        )
    }
}

export default Login;
