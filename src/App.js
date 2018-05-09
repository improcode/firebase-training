import React, {Component} from 'react';


class App extends Component {
    state = {
        counter: 0
    }

    componentDidMount() {
        fetch('https://jfddl4-sandbox.firebaseio.com/artur/counter/.json')
            .then(response => response.json())
            .then(acctualCounterValFromDb => this.setState({
                counter: acctualCounterValFromDb
            }))
    }

    saveToDb = () => fetch(
        'https://jfddl4-sandbox.firebaseio.com/artur/counter/.json',
        {
            method: 'PUT',
            body: JSON.stringify(this.state.counter)
        }
    )


    decHandler = () => this.setState(
        {
            counter: this.state.counter - 1
        },
        this.saveToDb
    )
    incHandler = () => this.setState(
        {
            counter: this.state.counter + 1
        },
        this.saveToDb
    )


    render() {
        return (
            <div>
                <h1>
                    {this.state.counter}
                </h1>
                <button onClick={this.decHandler}>-</button>
                <button onClick={this.incHandler}>+</button>
            </div>
        );
    }
}

export default App;
