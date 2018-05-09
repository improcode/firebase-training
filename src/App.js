import React, {Component} from 'react';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class App extends Component {
    state = {
        newTask: '',
        tasks: null
    }

    newTaskHandler = (event, newValue) => {
        this.setState({
            newTask: newValue
        })
    }

    componentDidMount() {
        this.loadTasks()
    }

    loadTasks = () => (
        fetch('https://jfddl4-sandbox.firebaseio.com/artur/tasks/.json')
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                const dataInArray = (
                    Object.entries(data || {})
                        .map(el => ({
                            key: el[0],
                            value: el[1]
                        }))
                )
                this.setState({
                    tasks: dataInArray
                })
            })
    )

    saveNewTask = () => {
        fetch(
            'https://jfddl4-sandbox.firebaseio.com/artur/tasks/.json',
            {
                method: 'POST',
                body: JSON.stringify(this.state.newTask)
            }
        ).then(this.loadTasks)

    }

    deleteTask = (taskUid) => (
        fetch('https://jfddl4-sandbox.firebaseio.com/artur/tasks/' + taskUid + '/.json',
            {method: 'DELETE'}
        ).then(this.loadTasks)
    )

    render() {
        return (
            <div>
                <TextField
                    value={this.state.newTask}
                    onChange={this.newTaskHandler}
                />
                <RaisedButton
                    label={'SAVE'}
                    onClick={this.saveNewTask}
                />

                {
                    !this.state.tasks ?
                        'Ładowanie..'
                        :
                        <ul>
                            {
                                this.state.tasks.map(
                                    task => <li
                                        key={task.key}
                                        onClick={() => this.deleteTask(task.key)}
                                    >
                                        {task.value}</li>
                                )
                            }
                        </ul>
                }

            </div>

        )
            ;
    }
}

export default App;
