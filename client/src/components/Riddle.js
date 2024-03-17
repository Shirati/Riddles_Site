
import React, { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BottomNavigationAction } from '@mui/material';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';







const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})
  (({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Riddle(props) {

  const [expanded, setExpanded] = React.useState(false);
  const [time,setTime]=useState(false);
  const [ans,setAns]=useState(false);
  const riddleStore = useSelector(state =>state.riddles.riddles );
  const isUser = useSelector(state =>state.users.isUser );


  const { id } = useParams();
  const it = riddleStore.find(a => a.id == id)

  const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
  
    useEffect(() => {
      const interval = isRunning && setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [isRunning]);
  
    const stopTimer = () => {
      setIsRunning(false);
      setAns(true)
    };
  
    const convertToMinutes = (seconds) => {
      return Math.floor(seconds / 60);
    };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
                //time
                  <BottomNavigationAction
                    label="time"
                    value="time"
                    icon={<HourglassTopIcon color='third' />}
                   onClick={setTime(true)}

                />
            {time&& <div>
      <h1>Timer: {seconds} seconds</h1>
      <h2>Time in minutes: {convertToMinutes(seconds)} minutes</h2>
      {isRunning && <button onClick={stopTimer}>select ans</button>}
    </div>

}
      <Card sx={{
        maxWidth: 345,
        alignContent: 'center',
        position: 'center',
        color: 'orange',
        justifyContent: 'center', alignItems: 'center',
        margin: 'auto',
        marginTop: '100px',
      }}>
        <CardHeader

          action={
            <BottomNavigationAction
              label="Update Item"
              value="Update Item"
              icon={<CloseOutlinedIcon color="third" />}
              component={Link}
              to={"/riddles/"} />
          }
          title={it.riddlename}
         
        />
        <CardMedia
          component="img"
          height="194"
          image={it.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {it.question}
          </Typography>
         {(ans||!time)&& <Typography variant="body2" color="text.secondary">
            {it.solution}
          </Typography>}
        </CardContent>
    
              
        <CardActions disableSpacing>
        <IconButton aria-label="share">
  <BottomNavigationAction
                    label="regular"
                    value="regular"
                    title=''
                    icon={<HelpSharpIcon color='third' />}
                    onClick={setAns(true)} onclick={stopTimer}
/>
</IconButton>
          <IconButton aria-label="share">
            {isUser && <BottomNavigationAction
              label="Update riddle"
              value="Update riddle"
              icon={<ModeOutlinedIcon />}
              component={Link}
              to={`/UpdateRiddle/${id}`} />}
          </IconButton>
          <IconButton aria-label="share">
            {time &&ans&& <BottomNavigationAction
              label="statistic"
              value="statistic"
              icon={<ModeOutlinedIcon />}
              component={Link}
              to={`/UpdateRiddle/${id}`} />}
          </IconButton>
        </CardActions>

      </Card>

             </>
 ) }}


