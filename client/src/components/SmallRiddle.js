import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigationAction } from '@mui/material';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function SmallRiddle(props) {
  
    return (
        <>

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={props.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.riddlename}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color='primary'
                            >
                        
                            </Typography>
                        </React.Fragment>
                    }


                    
                />
                 


                 <BottomNavigationAction
                    label="view"
                    value="view"
                    title=''
                    icon={<OpenInNewOutlinedIcon color='third' />}
                    component={Link}
                    to={`/riddle/${props.id}`}/>
            </ListItem>
            <Divider variant="inset" />

        </>
    )
}