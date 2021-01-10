import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css'
import { Link } from 'react-router-dom';
import { Avatar, Container, Divider, Drawer, Fab, List, ListItem, ListItemIcon } from '@material-ui/core';
import UserMenu from './UserMenu';
import logo from '../../images/logo.png'
import MailIcon from '@material-ui/icons/Mail';
import { useAuth } from '../UseAuth/useAuth';
import { useContext } from 'react';
import { DataContext } from '../../App';
import { useStyles } from './HeaderStyle';

export default function Header() {
   const classes = useStyles();
   const auth = useAuth()
   const user = auth.user

   const store = useContext(DataContext)

   // Toggle Navigation Bar on Left
   const [state, setState] = React.useState({left: false});
   const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
   };

   const list = (anchor) => (
      <div
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
         <List>
            {
               user ? 
               <div className="my-3">
                  { user.picture ? <Avatar alt="Remy Sharp" src={user.picture} className={classes.large} />
                     : 
                  <Fab 
                     size="medium" 
                     variant="extended"
                  >
                     {user.name}
                  </Fab>}
               </div>
                  :
               <Fab 
                  size="medium" 
                  variant="extended"
               >
                  Login
               </Fab>
            }
            <ListItem button>
              <ListItemIcon>
                  <MailIcon/> 
                  <Link to="/profile" className="ml-3" >
                     Profile
                  </Link> 
               </ListItemIcon>
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                  <MailIcon/> 
                  <Link to="/profile" className="ml-3" >
                     My Account
                  </Link> 
               </ListItemIcon>
            </ListItem>
         </List>
         <Divider />
         <List>
            <ListItem button>
              <ListItemIcon>
                  <MailIcon/> 
                  <Link to="shop" className="ml-3" >
                     Shop
                  </Link> 
               </ListItemIcon>
            </ListItem>
            <ListItem button>
               <ListItemIcon>
                  <MailIcon/> 
                  <Link to="/review" className="ml-3" >
                     Order Review
                  </Link> 
               </ListItemIcon>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                  <MailIcon/> 
                  <Link to="/review" className="ml-3" >
                     Cart Page
                  </Link> 
               </ListItemIcon>
            </ListItem>
         </List>
      </div>
   );
   
  return (
    <div className={classes.grow}>
      <AppBar position="static">
         <Container>
            <Toolbar>
               <IconButton
                  edge="start"
                  className={classes.menuButton +"d-block d-md-none"}
                  color="inherit"
                  aria-label="open drawer"
               >
                  <React.Fragment key={"left"}>
                     <MenuIcon onClick={toggleDrawer("left", true)} />
                     <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                        {list("left")}
                     </Drawer>
                  </React.Fragment>
               </IconButton>

               <Typography className={classes.title} variant="h6" noWrap>
                  <img style={{width:'120px'}} src={logo} alt="e-commerce"/>
               </Typography>

               <div className={classes.search}>
                  <div className={classes.searchIcon}>
                     <SearchIcon />
                  </div>
                  <InputBase
                     placeholder="Search…"
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                     inputProps={{ 'aria-label': 'search' }}
                     onBlur={(e) => store.setSearchValue(e.target.value)}
                  />
               </div>

               <div className={classes.grow} />
               <div className="menu d-none d-md-block">
                  <nav className="">
                     <Link className="link" to="/shop">
                        Shop
                     </Link>
                     <Link className="link" to="/review">
                        Order Review
                     </Link>
                  </nav>
               </div>
               <UserMenu classes={classes}></UserMenu>
            </Toolbar>
         </Container>
      </AppBar>
    </div>
  );
}