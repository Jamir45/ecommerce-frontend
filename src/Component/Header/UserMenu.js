import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import StyledBadge from '@material-ui/core/Badge';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Fab } from '@material-ui/core';
import { useAuth } from '../UseAuth/useAuth';

const UserMenu = ({classes}) => {
   const history = useHistory()

   const auth = useAuth()
   const user = auth.user
   const cart = auth.cart

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   
   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };
   
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div className='text-center d-flex'>
         <Link to="/review">
            <IconButton className="mx-3" aria-label="cart">
               <StyledBadge className='shoppingCartIcon' badgeContent={cart && cart.length} color="secondary">
               <AddShoppingCartIcon className={classes.cart} />
               </StyledBadge>
            </IconButton>
         </Link>
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
   );
};

export default UserMenu;