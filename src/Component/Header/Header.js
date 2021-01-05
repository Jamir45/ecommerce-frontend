import { AppBar, Avatar, Container, Divider, Drawer, Fab, IconButton, List, ListItem, ListItemIcon, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import StyledBadge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MailIcon from '@material-ui/icons/Mail';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import logo from '../../images/logo.png'
import { Link, useHistory } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../UseAuth/useAuth';
import { useContext } from 'react';
import { DataContext } from '../../App';


const Header = () => {
   const history = useHistory()

   const auth = useAuth()
   const user = auth.user
   const cart = auth.cart

   // Make Material UI Custom Style
   const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      list: {
         width: 250,
      },
      fullList: {
      width: 'auto',
      },
      profileIcon:{
         fontSize:40
      },
      cart:{
         color:"white"
      }
    }));
   const classes = useStyles();

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
              <ListItemIcon><MailIcon/> <Link className="ml-3" >Profile</Link> </ListItemIcon>
            </ListItem>
            <ListItem button>
               <ListItemIcon><MailIcon/> <Link to="" className="ml-3" >My Account</Link> </ListItemIcon>
            </ListItem>
         </List>
         <Divider />
         <List>
            <ListItem button>
              <ListItemIcon><MailIcon/> <Link to="shop" className="ml-3" >Shop</Link> </ListItemIcon>
            </ListItem>
            <ListItem button>
               <ListItemIcon><MailIcon/> <Link to="/review" className="ml-3" >Order Review</Link> </ListItemIcon>
            </ListItem>
            <ListItem button>
              <ListItemIcon><MailIcon/> <Link to="/manage-cart" className="ml-3" >Inventory</Link> </ListItemIcon>
            </ListItem>
         </List>
      </div>
   );
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   
   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };
    

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Container>
            <Toolbar>
               <IconButton edge="start" className={classes.menuButton + "d-block d-md-none"} color="inherit" aria-label="menu">
               <React.Fragment key={"left"}>
                  <MenuIcon onClick={toggleDrawer("left", true)} />
                  <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                     {list("left")}
                  </Drawer>
               </React.Fragment>
               </IconButton>

               <Typography variant="h6" className={classes.title}>
               <img style={{width:'120px'}} src={logo} alt="e-commerce"/>
               </Typography>

               <div className="menu d-none d-md-block">
                  <nav className="">
                     <Link className="link" to="/shop">Shop</Link>
                     <Link className="link" to="/review">Order Review</Link>
                     <Link className="link" to="/manage-cart">Inventory</Link>
                     <Link to="/review">
                        <IconButton className="mx-3" aria-label="cart">
                           <StyledBadge badgeContent={cart && cart.length} color="secondary">
                           <AddShoppingCartIcon className={classes.cart} />
                           </StyledBadge>
                        </IconButton>
                     </Link>
                  </nav>
               </div>

               <div className='text-center'>
                  {
                     user ? 
                     <div onClick={handleMenu}>
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
                        onClick={handleMenu} 
                        size="medium" 
                        variant="extended"
                     >
                        Login
                     </Fab>
                  }
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorEl}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={open}
                     onClose={handleClose}
                  >
                     <MenuItem onClick={handleClose}>
                        {
                           user ? <Link> Profile </Link> : 
                           <Link to="/sign-in"> Sign In </Link>
                        }
                     </MenuItem>
                     <MenuItem onClick={handleClose}>
                        {
                           user ? <Link onClick={() => auth.signOut(history)}> Sign Out </Link> : 
                           <Link to="/sign-up"> Sign Up </Link>
                        }
                     </MenuItem>
                  </Menu>
               </div>
               
            </Toolbar>
            </Container>
         </AppBar>
      </div>
   );
};

export default Header;