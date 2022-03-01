import { useState, Fragment } from "react";

import { useQuery } from "@apollo/client";
import { GET_USER_FROM_TOKEN_RV } from "./userSessionReactVarQuery";

import { LOGGED_USER } from "./LoggedUserQuery";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
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
import InstituteCreate from "../../pages/institute/InstituteCreate";

import {LevelsPage} from "../../pages/levels/LevelsPage";
import LevelCreatePage from "../../pages/levels/LevelCreatePage"
import LevelUpdatePage from "../../pages/levels/LevelUpdate"

import UsersPage from "../../pages/users/UsersPage";
import UserCreatePage from "../../pages/users/UserCreatePage";
import UserUpdatePage from "../../pages/users/UserUpdatePage";

import StudentsPage from "../../pages/students/StudentPage";
import StudentCreatePage from "../../pages/students/StudentCreatePage";
import StudentUpdatePage from "../../pages/students/StudentUpdate";

import CoursesPage from "../../pages/courses/CoursePage";
import CourseCreatePage from "../../pages/courses/CourseCreatePage";
import CourseUpdatePage from "../../pages/courses/CourseUpdate";

import Login from "../../pages/access/Login"
import ChangePassword from "../../pages/access/ChangePasswordPage";
import institute_logo from '../../images/institute_logo.png';
import { userSessionReactVar, userSessionReactVar_initialvalue } from '../../cache';
import { getUserMenu } from "./userMenu";

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
  
function AppBarInteraction({ 
  classes,
  variant,
  user_from_token
}) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Institute App");

  const userSession = userSessionReactVar()
  const MenuItems = (userSession && userSession.roles) 
    ? getUserMenu(userSession.roles)
    : []
  
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  const RequireAuth = ( props ) => {
    const { data: user_from_token_data } = useQuery(
      GET_USER_FROM_TOKEN_RV
    );

    // return <div>aaa</div>
    if (user_from_token_data &&
      user_from_token_data &&
      user_from_token_data.userSessionReactVar &&
      user_from_token_data.userSessionReactVar.email) {
        return < AppCheckPassword toRender={props.children} />
    } 
    return <Navigate to={'/login'} />
  }


  const AppCheckPassword = ( props ) => {
    const { data: loggeduserdata, loading, error } = useQuery(LOGGED_USER,
       {fetchPolicy: "network-only"});

    // return (<div>{JSON.stringify(loggeduserdata)}</div>)

    if (error) return <div style={{ color: "red" }}>{error.message}</div>;
    if (!loggeduserdata) return <p> No hay información sobre la sesión </p>;
    if (loading) return <p>verificando su sesión...</p>;
  
    const loggeduser = loggeduserdata.LoggedUser;
    if (loggeduser.success === false)
      return <div style={{ color: "red" }}>{loggeduser.message}</div>;
  
    if (loggeduser.user.mustChangePassword) 
      return (<Navigate to='/change-password' />)
    return props.toRender
  }

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
            { MenuItems && MenuItems.map((menuItem, index)=> 
              <ListItem key={`menu-item-${index}`}
                button
                component={Link}
                to={menuItem.to}
                onClick={onItemClick(`${menuItem.title}`)}
              >
                <ListItemText>{`${menuItem.optionText}`}</ListItemText>
            </ListItem>
            )
            }
            
          </List>
          
          <img src={institute_logo} width="30%" alt="Logo Instituto" />
  
          <Typography variant="h6" >
            NQN Institute
          </Typography>    
          <div>
            {JSON.stringify(user_from_token)}-
            {JSON.stringify(localStorage.getItem('token'))}
            </div> 
        </Drawer>
  
   
        <main className={classes.content}>
        <Routes>
        <Route path='/' exact element={
            <div>
              <Typography>
              <img src={institute_logo} width="200px" alt="Logo Instituto" />
              </Typography>       
            </div>
          }>
          </Route>
          <Route path='/create-institute' exact element={
          <RequireAuth>
            <InstituteCreate />
          </RequireAuth>
          }/>
          <Route path='/level-create' exact element={
          <RequireAuth><LevelCreatePage /></RequireAuth>} /> 
          <Route path='/levels' exact element={<RequireAuth><LevelsPage /></RequireAuth>} /> 
          <Route path='/level-update/:entityid/:random' element={<RequireAuth><LevelUpdatePage /></RequireAuth>} />

          <Route path='/user-create' exact element={<RequireAuth><UserCreatePage /></RequireAuth>} />
          <Route path='/users' exact element={<RequireAuth><UsersPage /></RequireAuth>} />
          <Route path='/user-update/:entityid/:random' element={<RequireAuth><UserUpdatePage /></RequireAuth>} />

          
          <Route path='/course-create' exact element={<RequireAuth><CourseCreatePage /></RequireAuth>} />
          <Route path='/courses' exact element={<RequireAuth><CoursesPage /></RequireAuth>} />
          <Route path='/course-update/:entityid/:random' element={<RequireAuth><CourseUpdatePage /></RequireAuth>} />

          <Route path='/student-create' exact element={<RequireAuth><StudentCreatePage /></RequireAuth>} />
          <Route path='/students' exact element={<RequireAuth><StudentsPage /></RequireAuth>} />
          <Route path='/student-update/:entityid/:random' element={<RequireAuth><StudentUpdatePage /></RequireAuth>} />

          <Route path='/login' exact element={<Login />} /> 
          <Route path='/change-password' exact element={<ChangePassword />} /> 
          <Route path='/logout' exact element={
            <div>
              <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      userSessionReactVar(userSessionReactVar_initialvalue)
                      localStorage.setItem('token', '');
                      alert('Sesión finalizada');
                    }}
                  >
                    Cerrar la sesión
              </Button>      
              <Typography>
              <img src={institute_logo} width="200px" alt="Logo Instituto" />
              </Typography>       
            </div>
          }>
          </Route>
        </Routes>
        </main>
      </Router>
    )
  );  
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
