import React from 'react';
import Paper from '@material-ui/core/Paper';
import NavBar from '../components/nav';
import TodoCard from '../components/todoCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import todoActions from '../actions/todoActions'


class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            title: '',
            description: '',
            state: 1,
            isAddNewFormOpen: false
        }
    }

    addTask = e => {

        let { tasks, title, description, state } = this.state;
        fetch('https://engine-staging.viame.ae/assessment/user/task', {
            method: 'POST',
            body: JSON.stringify({
                todolist: {
                    title: title,
                    description: description,
                    status: state,
                }

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": localStorage.token

            }
        }).then(async response => {

            let resJson = await response.json()
            console.log("check", resJson);
            tasks.push({ _id: resJson._id, title: title, description: description, status: state })
            this.setState({
                tasks: tasks,
                title: '',
                description: '',
                isAddNewFormOpen : false
            }, () => {
                
            })
        })




    }



    handleChange = e => {

        this.setState({

            [e.target.name]: e.target.value

        }, () => {
            
        })
    }

    //handleDropdownChange = (e, { value }) => this.setState({ task.status: value })
    updateTaskState = (value, task) => {
        let { tasks } = this.state;
        console.log("Value: ", value)
        console.log("Task: ", task)
        let index = tasks.findIndex(item => item._id === task._id)
        if (index == '-1') {
            console.log('notfound')
        }
        else {
            tasks[index].status = value
            console.log("task", tasks)
            fetch(`https://engine-staging.viame.ae/assessment/user/task/${tasks[index]._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    todolist: {
                        title: tasks[index].title,
                        description: tasks[index].description,
                        status: value,
                    }

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "x-access-token": localStorage.token

                }
            }).then(async response => {

                let resJson = await response.json()
                if (resJson.status == '4') {
                    await this.deleteTask(task)

                }
                else {
                    console.log("check json", resJson.status);
                    //tasks.push({ _id: resJson._id, title: title, description: description, state: state })
                    this.setState({
                        tasks
                    })
                }
            })
            console.log("log", tasks)
        }
    }

    logout = () => {
        localStorage.clear();
        this.setState({ redirectToReferrer: true });
    }


    renderTasks = () => {
        let { tasks } = this.state;
        
        return tasks.map(task => {
            return (
                <TodoCard task={task} updateTask={this.updateTaskState} />
            )
        })
    }

    componentDidMount = () => {
        fetch('https://engine-staging.viame.ae/assessment/user/list', {
            method: 'GET',

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": localStorage.token
            }
        }).then(async response => {

            let resJson = await response.json()
            this.setState({
                tasks: resJson

            })

            

        })

    }

    deleteTask = (task) => {

        let { tasks } = this.state;
        fetch(`https://engine-staging.viame.ae/assessment/user/task/${task._id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": localStorage.token

            }
        }).then(async response => {

            let resJson = await response.json()
            console.log("delete response", resJson);
            if (resJson) {
                tasks.splice(tasks.indexOf(task), 1);
                this.setState({
                    tasks
                })
            }

        })

    }

    toggleAddnewForm = () => {
        let { isAddNewFormOpen } = this.state
        this.setState({
            isAddNewFormOpen: !isAddNewFormOpen
        })
    }

    renderAddNewButton = () => {
        return (
            <Fab color="primary" aria-label="add" className="addNewTaskBtn" onClick={this.toggleAddnewForm} >
                <AddIcon />
            </Fab>
        )
    }

    renderAddNewForm = () => {
        let { isAddNewFormOpen } = this.state
        return (
            <div>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        name="title"
                        autoComplete="Title"
                        autoFocus
                        onChange={this.handleChange}
                        value={this.state.title}
                        className="textField"

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="description"
                        type="text"
                        autoComplete="Task Description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        className="textField"

                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={this.addTask}
                        className="accentColor"
                    >
                        Add New Task
                            </Button>
                </form>
            </div>

        )
    }




    render() {

        let { isAddNewFormOpen } = this.state

        return (
            <div>
                {this.renderAddNewButton()}
                <NavBar />
                <Paper className="todoArea">
                    {this.renderTasks()}

                </Paper>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isAddNewFormOpen}
                    onClose={this.toggleAddnewForm}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={isAddNewFormOpen}>
                        <div className="addNewFormContainer">
                            <h2 id="transition-modal-title">Add New Task</h2>
                            {this.renderAddNewForm()}
                        </div>
                    </Fade>
                </Modal>

            </div>
        );

    }

}

export default Todo;