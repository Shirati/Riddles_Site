import { TextField, Button } from '@mui/material';
//import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import { addRiddle } from '../store/riddleActions';
import ageService from './service/ageService';
import difficultyService from './service/difficultyService';
import subjectService from './service/subjectService';
import { useSelector } from 'react-redux';
function ActionCategory() {
 const [subjects, setSubjects] = useState([]);
const [difficulties, setdifficulties] = useState([]);
const [ages, setAges] = useState([]);
const [ok, setOk] = useState(false);
const isUser = useSelector(state =>state.users.isUser );

//const dispatch = useDispatch();
useEffect(() => {
  getSubject();
  getAge();
  getDifficulty();
}, [])

async function getSubject() {
  const subjects = await subjectService.getSubject();
  setSubjects(subjects);
}
async function getDifficulty() {
    const difficulties = await difficultyService.getDifficulty();
    setdifficulties(difficulties);
  }
  async function getAge() {
    const ages = await ageService.getAge();
    setAges(ages);
  }

 async function add(event) { 
    event.preventDefault();
    const formData = new FormData(event.target);
    const parametrim = {
        subject: formData.get('subject'),
        difficulty: formData.get('difficulty'),
        age: formData.get('age')
    };
    console.log(parametrim);
   ageService.addAge(parametrim.age);
   difficultyService.addDifficulty(parametrim.difficulty)
   subjectService.addSubject(parametrim.subject)
    setOk(true);
 
}
async function deletesub(id) {
    await subjectService.deleteSubject(id);
   
  }
  async function updateSub(id,value) {
    await subjectService.setSubject(id,value);
   
  }

if (!isUser)
return <Navigate to={`/Home`} replace />;

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
            onSubmit={(event) => add(event)}
        >



<TextField 
   htmlFor="subject" 
   id="subject" 
   name="subject"  
  select 
  label="add an option" 
  color="primary" focused required
  SelectProps={{ native: true }}
>
  {subjects&&subjects.map((subject) => (
    <option key={subject._id} value={subject}>{subject.subject_riddle}<button onChange={(e)=>updateSub(subject._id,e.target)}   ></button><IconButton aria-label="delete" size="small" onClick={(e)=>deletesub(subject._id)}>
    <DeleteIcon fontSize="small"  />
  </IconButton>
  </option>
    
  ))}
</TextField>


<TextField 
   htmlFor="difficulty" 
   id="difficulty" 
   name="difficulty"  
  select 
  label="add an option" 
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
  label="add an option" 
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
    הוסף בחירה
            </Button>
        </Stack>

            {ok  &&  <Navigate to={`/Home`} replace />}
        </>
    );
};

export default ActionCategory
