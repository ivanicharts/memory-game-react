import React from 'react';

export class ErrorBoundary extends React.PureComponent {
    state = {
        error: false,
        instance: null,
    }

    componentDidCatch(erorrInstance) {
        console.log('catch');
        
        this.setState({ error: true, instance: erorrInstance });
    }

    render() {
        console.log('this.state', this.state);
        
        return this.state.error
            ? (
                <h2><center>Something terrible has happened....</center></h2>
            )
            : (
                this.props.children
            );
    }
}