import { baseUrl } from "../../app/baseurl";
import { AppThunk } from '../../app/store';
import { logout } from './studentSlice';
import axios from "axios";


export const studentPayload = (payload:any) => {
    return payload;
}



export const fetchStudent = (name: string)/*: AppThunk => (dispatch)*/ => {

    const cred = { name: name}
    console.log('fetching ', {cred})

    return fetch(baseUrl + 'students/student', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(cred)
    })
    .then(response => {
        console.log({response})
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.message = response.statusText;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => {
        //console.log(response.json())
        return studentPayload(response.json())
    })
    //.then(response => dispatch(login(response.data)))
    .catch(error => console.log(error.message));
}


export const logoutHandler = (): AppThunk => (dispatch) => {
    return dispatch(logout())
}
