import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useSelector } from 'react-redux';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logo from '../images/logo.jpg'
import IsoIcon from '@mui/icons-material/Iso';

function NavBar() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isUser = useSelector(state => state.users.isUser)
    console.log(isUser);
    return (
        <>
            <BottomNavigation value={value} onChange={handleChange} sx={{ marginBottom: '40px', backgroundImage: `url(${logo})` }} >
                <BottomNavigationAction
                    color='primary'
                    label="Home"
                    value="/"
                    icon={<HomeOutlinedIcon color='secondary' />}
                    component={Link}
                    to="/"
                />
                <BottomNavigationAction
                    color='primary'
                    label="Login"
                    value="Login"
                    icon={<PersonAddAltOutlinedIcon color='secondary' />}
                    component={Link}
                    to="/login"
                />
                <BottomNavigationAction
                    color='primary'
                    label="Register"
                    value="Register"
                    icon={<PersonAddAltOutlinedIcon color='secondary' />}
                    component={Link}
                    to="/register"
                />
                <BottomNavigationAction
                    color='primary'
                    label="riddles"
                    value="riddles"
                    icon={<VolunteerActivismOutlinedIcon color='secondary' />}
                    component={Link}
                    to="/riddles"
                />
                {/* <BottomNavigationAction color='primary'
                    label="items"
                    value="items"
                    icon={<ProductionQuantityLimitsOutlinedIcon color='secondary' />}
                    component={Link}
                    to="/riddles"
                /> */}
             {isUser&& <BottomNavigationAction
                    color='primary'
                    label="update user"
                    value="UpUser"
                    icon={<PersonOutlineOutlinedIcon color='secondary' />}
                    component={Link}
                    to="/UpUser"
                />}
                   {isUser&& <BottomNavigationAction
                    color='primary'
                    label="ActionCategory"
                    value="Action_Category"
                    icon={<IsoIcon color='secondary' />}
                    component={Link}
                    to="/action_category"
                />}
               
                {isUser&&<BottomNavigationAction
                    color='primary'
                    label="add riddle"
                    value="add riddle"
                    icon={<AddCircleOutlineIcon color='secondary' />}
                    component={Link}
                    to="/addriddle"
                />}
            </BottomNavigation>
        </>);
};

export default NavBar;