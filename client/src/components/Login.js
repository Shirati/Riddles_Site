import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, login } from '../store/userActions';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export default function Login(props) {
    const { mes } = useParams();
    const dispatch = useDispatch();
    const [ok, setOk] = useState(false);
    const isUser = useSelector(state => state.users.isUser)

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userLogIn = {
            username: formData.get('username'),
            // email: formData.get('email'),
            password: formData.get('password')
        };
        console.log(userLogIn);

        // if (mes === "true") {
        //     dispatch(addUser(newUser));
        //     setOk("donate");
        // }
        // else {
            dispatch(login(userLogIn));
            setOk(true);
      //  }
    }

// if (!isUser)
// return <Navigate to={`/register`} replace />;

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
                onSubmit={(event) => handleSubmit(event)}
            >
                <TextField htmlFor="username" label="username" id="username" name="username" color="primary" focused required />
                {/* <TextField htmlFor="email" type='email' id="email" name="email" label="email" color="primary" focused required /> */}
                <TextField htmlFor="password" type='password' id="password" name="password" label="password" color="primary" focused required />
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
                    אישור
                </Button>
            </Stack>

            {/* {mes === "t" && <h1 style={{ fontFamily: 'Segoe Print,Arial', textAlign: 'center', color: 'gray' }}>before update user details, you have to log in</h1>} */}

            {/* {ok === "donate" && !isManager && <Navigate to={`/donate`} replace />}
        //    ?  */}
{ok&& <Navigate to={`/`} replace />}
        </>
    )


}