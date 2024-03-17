import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { addRiddle } from '../store/riddleActions';
import { useSelector } from 'react-redux';
function AddRiddle() {
    const dispatch = useDispatch();
    const [ok, setOk] = useState("false");
    const [dataURL, setDataURL] = useState("");
  const isUser = useSelector(state =>state.isUser );

    const handleAddItem = (event) => {
        event.preventDefault();

      // Get the form data
        const formData = new FormData(event.target);
        const riddle = {
            // id: id,
            name: formData.get('riddlename') ,
            question: formData.get('question')  ,
            solution: formData.get('solution') ,
            img: dataURL 
        };

        dispatch(addRiddle(riddle));
        setOk("riddle")
       
       
    };

    function handleUpload(event) {
        event.preventDefault();
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setDataURL(reader.result);
        };
        reader.onerror = (error) => {
            console.error('There was a problem with the file upload', error);
        };
    };
  
    return (
        <>
            <Stack
                component="form"
                sx={{
                    width: '25ch', '& .MuiTextFieldRoot': { m: 1, width: '25ch' },
                    alignContent: 'center',
                    position: 'center',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    margin: 'auto'
                }}
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={(event) => handleAddItem(event)}
            >
               
        <TextField htmlFor="riddlename"  label="riddlename" id="riddlename" name="riddlename" color="primary" focused />
        <TextField htmlFor="question"  label="question" id="question" name="question" color="primary" focused />
        <TextField htmlFor="solution"  label="solution" id="solution" name="solution" color="primary" focused />
        <TextField htmlFor="img" label="img" id="img" name="img" color="primary" type="file" onChange={handleUpload} focused />
        {dataURL != '' && <img src={dataURL} style={{
                    width: '25ch', '& .MuiTextField-root': { m: 1, width: '25ch' },
                    alignContent: 'center',
                    position: 'center',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    margin: 'auto'
                }} />}
                <Button variant="outlined" type="submit" color='third' sx={{ borderWidth: "2px" }}>add</Button>

            </Stack>
            {ok === "riddle" && <Navigate to={`/riddle`} replace />}
        </>
    );
};

export default AddRiddle
