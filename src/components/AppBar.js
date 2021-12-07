import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

import MenuIcon from '@mui/icons-material/Menu';

import { withStyles } from "@material-ui/core/styles";
import { 
  IconButton, 
  ListItemText, 
  ListItem, 
  List, 
  Drawer,
  Typography,
  Toolbar,
  AppBar,
  Button
} from '@mui/material';

import InstituteCreate from "../pages/InstituteCreate";

import institute_logo from '../images/institute_logo.png';
const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Inicio")}
          >
            <ListItemText>Cerrar sesión</ListItemText>
          </ListItem>
          
          <ListItem
            button
            component={Link}
            to="/login"
            onClick={onItemClick("Iniciar sesión")}
          >
            <ListItemText>Iniciar sesión</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/users"
            onClick={onItemClick("Usuarios")}
          >
            <ListItemText>Usuarios</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/applications"
            onClick={onItemClick("Aplicaciones")}
          >
            <ListItemText>Aplicaciones</ListItemText>
          </ListItem>

        </List>
        
        {/* <img src={institute_logo} width="30%" alt="Logo Instituto" /> */}

        <Typography variant="h6" >
          NQN Institute
        </Typography>        
      </Drawer>

 
      <main className={classes.content}>
      <Routes>
        <Route path='/' exact element={
          <div>
            <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    localStorage.setItem('token', '');
                    alert('Sesión finalizada');
                  }}
                >
                  Cerrar la sesión
            </Button>      
            <Typography>
            {/* <img src={institute_logo} width="200px" alt="Logo Instituto" /> */}
            </Typography>       
          </div>
        }>
          

        </Route>
        <Route path='/create-institute' exact element={<InstituteCreate />}/>
        {/* <Route path='/login' component={LoginUserFormik} />
        <Route path='/users' component={UsersListPage} />
        <Route path='/user-update/:entityid/:random' component={UserUpdate} />
        <Route path='/user-create' component={UserCreate} />
        <Route path='/applications' component={ApplicationsListPage} />
        <Route path='/application-update/:entityid/:random' component={ApplicationUpdate} />
        <Route path='/application-create' component={ApplicationCreate} />
        <Route path='/application-detail/:entityid/:random' component={ApplicationDetail} />
        <Route path='/user-detail/:entityid/:random' component={UserDetail} /> */}
      </Routes>
      </main>
    </Router>
  )
);


function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Servidor de autorizaciones");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };


  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);
