import { useEffect, useState } from "react";
import subjectService from "./service/subjectService";
import difficultyService from "./service/difficultyService";
import ageService from "./service/ageService";
import riddleService from "./service/riddleService";
import SmallRiddle from "./SmallRiddle";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRiddles, updateRiddle } from "../store/riddleActions";
import { TextField, Button, Stack, List, Divider } from '@mui/material';

function RiddleList() {
  const [subjects, setSubjects] = useState([]);
  const [difficulties, setdifficulties] = useState([]);
  const [ages, setAges] = useState([]);
  const [riddles, setRiddles] = useState([]);
  const [ok, setOk] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getSubject();
    getAge();
    getDifficulty();
  }, [])

  async function getSubject() {
    const subjects = await subjectService.getSubject();
    console.log(subjects);
    setSubjects(subjects);
  }
  async function getDifficulty() {
    const difficulties = await difficultyService.getDifficulty();
    console.log(difficulties);
    setdifficulties(difficulties);
  }
  async function getAge() {
    const ages = await ageService.getAge();
    console.log(ages);
    setAges(ages);
  }
  async function searchRiddles(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const parametrim = {
      subject: formData.get('subject'),
      difficulty: formData.get('difficulty'),
      age: formData.get('age')
    };
    console.log(parametrim);
    dispatch(getAllRiddles(parametrim));
    //const riddles = await riddleService.getRiddle(parametrim);
    setRiddles(riddles);
    setOk(true);

  }



  return (
    <>
      <Stack
        component="form"
        sx={{
          width: '25ch', '& .MuiTextField-root': { m: 1, width: '25ch' },
          alignContent: 'center',
          position: 'center',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          margin: 'auto',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={(event) => searchRiddles(event)}
      >



        <TextField
          htmlFor="subject"
          id="subject"
          name="subject"
          select
          label="Choose an option"
          color="primary" focused required
          SelectProps={{ native: true }}
        >
          {subjects && subjects.map((subject) => (
            <option key={subject._id} value={subject}>{subject.subject_riddle}</option>
          ))}
        </TextField>



        <TextField
          htmlFor="difficulty"
          id="difficulty"
          name="difficulty"
          select
          label="Choose an option"
          color="primary" focused required
          SelectProps={{ native: true }}
        >
          {difficulties && difficulties.map((difficulty) => (
            <option key={difficulty._id} value={difficulty}>{difficulty.difficulty_riddle}</option>
          ))}
        </TextField>

        <TextField
          htmlFor="age"
          id="age"
          name="age"
          select
          label="Choose an option"
          color="primary" focused required
          SelectProps={{ native: true }}
        >
          {ages && ages.map((age) => (
            <option key={age._id} value={age}>{age.age_range}</option>
          ))}
        </TextField>
        <Button sx={{
          alignContent: 'center',
          position: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          borderWidth: "2px",
          marginTop: '14px',
        }}
          variant="outlined"
          type="submit"
          color='third'
        >
          תן חידה
        </Button>
      </Stack>

      {ok && <List sx={{ width: '100%', maxWidth: 360, margin: 'auto' }} >
        {riddles.map(i => <SmallRiddle key={i._id} id={i._id} name={i.riddlename} img={i.image} />)}
        <Divider variant="inset" component="li" />

      </List>

      }


    </>
  )
}
export default RiddleList



