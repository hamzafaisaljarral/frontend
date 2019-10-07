import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; // import without use
import clsx from 'clsx'; // import without use.
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia'; // import without use.
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'; // import without use
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors'; // import without use.
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const statusOptions = {
  "1": "Created",
  "2": "Working",
  "3": "Finished",
  "4": "Cancelled"
}

const options = [
  { key: 1, text: 'Created', value: 1 },
  { key: 2, text: 'Working', value: 2 },
  { key: 3, text: 'Finished', value: 3 },
  { key: 4, text: 'Cancelled', value: 4 },
]

export default class todoTask extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      task: this.props.task || {},
      isMenuOpen: false,
      anchorEl: null
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.task){
      this.setState({
        task : newProps.task
      })
    }
  }

  toggleMenu = (e) => {
    // anchorEl isn't being used
    let { isMenuOpen, anchorEl } = this.state

    this.setState({
      isMenuOpen: !isMenuOpen,
      anchorEl: e.target
    })
  }

  handleClose = () => {
    this.setState({
      isMenuOpen: false
    })
  }

  /**
   * you're passing the task property without using it.
   */
  handleSelect = (value, task) => {
    this.props.updateTask(value, this.props.task)
    this.setState({
      isMenuOpen: false
    })
  }

  renderMenu = () => {
    let {  isMenuOpen, anchorEl } = this.state
    let menuItems = options.map(option => <MenuItem value={option.value} onClick={() => {this.handleSelect(option.value, )}}>{option.text}</MenuItem>)

    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={this.handleClose}
              >
              {menuItems}
      </Menu>
    )
  }

  render() {
    // isMenuOpen and anchorEl extracting without use.
    let { task, isMenuOpen, anchorEl } = this.state
    return (
      <Card className="todoCard" >
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={this.toggleMenu}>
              <MoreVertIcon />
              
              {this.renderMenu()}
             
            </IconButton>
          }
          title={task.title}
        />

       
        <CardContent>
          <Typography variant="body2" className="cardText" component="p">
            <b>Description :</b>  {task.description}
          </Typography>
          <Typography variant="body2" className="cardText" component="p">
            <b>Status :</b>  {statusOptions[task.status]}
          </Typography>
        </CardContent>

      </Card>
    );
  }


}