import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import lang from './lang';
import Dialog from '../../../../../../components/Dialog';
import Loader from '../../../../../../components/Loader';

const initState = {
  mode: 'create',
  id: '',
  userId: '',
  password: '',
  name: '',
  location: '',
  phone: '',
  email: '',
  type: 'serviceManager',
  rootId: '',
};
const styles = theme => ({
  layout: {
    padding: theme.spacing.unit * 3,
  },
  select: {},
  field: {
    marginBottom: theme.spacing.unit,
  },
});
class Component extends React.Component {
  state = initState;
  componentWillReceiveProps(nextProps) {
    if (!nextProps.selected) {
      this.setState(initState);
    } else {
      const prevRow = JSON.stringify(this.props.selected);
      const nextRow = JSON.stringify(nextProps.selected);
      if (prevRow !== nextRow) {
        const {
          id,
          userId,
          name,
          password,
          phone,
          location,
          email,
          type,
          rootId,
        } = nextProps.selected;
        this.setState({
          id,
          mode: 'update',
          userId,
          password,
          name,
          location,
          phone,
          email,
          type,
          rootId: rootId ? rootId : '',
        });
      }
    }
  }
  handleChange = name => e => this.setState({
    [name]: e.target.value,
  });
  handleSubmit = () => {
    const {
      rootId,
      type,
      ...rest,
    } = this.state;
    this.props.handleSubmit({
      type,
      rootId: type !== 'franchisee' ? null : rootId,
      ...rest,
    });
  };
  isDisabled = () => {
    const { userId, password, type, rootId, name } = this.state;
    if (userId === '' || password.length < 8 || name === '') {
      return true;
    }
    if (type === 'supervisor' || type === 'franchisee') {
      if (type === 'franchisee' && rootId === '') {
        return true;
      }
    }
    return false;
  };
  render () {
    const {
      userId,
      password,
      name,
      phone,
      location,
      email,
      type,
      rootId,
    } = this.state;
    const { classes, loading, translate, rootList, ...props } = this.props;
    return (
      <Dialog
        title={"title"}
        onSubmit={this.handleSubmit}
        disabled={this.isDisabled()}
        {...props}
      >
        {loading ? <Loader/> : null}
        <div className={classes.layout}>
          <FormControl
            className={classes.field}
            fullWidth
          >
            <InputLabel htmlFor="type">{lang.Type[translate]}</InputLabel>
            <Select
              value={type}
              onChange={this.handleChange('type')}
              inputProps={{
                name: 'type',
                id: 'type',
              }}
            >
              <MenuItem value="serviceManager">{lang.ServiceManager[translate]}</MenuItem>
              <MenuItem value="supervisor">{lang.Supervisor[translate]}</MenuItem>
              <MenuItem value="franchisee">{lang.Franchisee[translate]}</MenuItem>
            </Select>
          </FormControl>
          {
            type === 'franchisee' ?
              <FormControl
                fullWidth
                className={classNames(classes.field, classes.select)}
              >
                <InputLabel htmlFor="rootId">{lang.SupervisorName[translate]}</InputLabel>
                <Select
                  value={rootId}
                  onChange={this.handleChange('rootId')}
                  inputProps={{
                    name: 'rootId',
                    id: 'rootId',
                  }}
                >
                  <MenuItem value="">
                    {lang.Select[translate]}
                  </MenuItem>
                  {
                    rootList.map(o => (
                      <MenuItem
                        key={o.id}
                        value={o.id}
                      >
                        {o.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl> : null
          }
          <TextField
            className={classes.field}
            label="ID"
            fullWidth
            value={userId}
            onChange={this.handleChange('userId')}
          />
          <TextField
            className={classes.field}
            label={lang.Password[translate]}
            fullWidth
            value={password}
            helperText={lang.PasswordChar[translate]}
            onChange={this.handleChange('password')}
          />
          <TextField
            className={classes.field}
            label={lang.Name[translate]}
            fullWidth
            value={name}
            onChange={this.handleChange('name')}
          />
          {
            type === 'franchisee' || type === 'supervisor' ?
              <TextField
                className={classes.field}
                label={lang.Location[translate]}
                fullWidth
                value={location}
                onChange={this.handleChange('location')}
              /> : null
          }
          <TextField
            className={classes.field}
            label={lang.Phone[translate]}
            fullWidth
            value={phone}
            onChange={this.handleChange('phone')}
          />
          <TextField
            className={classes.field}
            label={lang.Email[translate]}
            fullWidth
            type="email"
            value={email}
            onChange={this.handleChange('email')}
          />
        </div>
      </Dialog>
    );
  }
}
export default connect(state => ({ translate: state.data.language.selected }))(withStyles(styles)(Component));
