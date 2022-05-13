import React, { useState } from 'react';
import { ClassState } from './studentSlice';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logoutHandler } from './studentAPI';
import { fetchStudentAsync, selectClasses, selectStatus } from './studentSlice';
import styles from './Student.module.css';



export function Student() {

    const students = useAppSelector(selectClasses);
    const status = useAppSelector(selectStatus);
    const [text, setText] = useState('')
    const dispatch = useAppDispatch();

    const handleChange = (e:any) => setText(e.target.value);

    const handleClick = async (e:any) => {

        const trimmedText = text.trim()

        // Create and dispatch the thunk function itself
        await dispatch(fetchStudentAsync(trimmedText))

        // And clear out the text input
        setText('')        
    }

    const handleLogout = async (e:any) => {
        await dispatch(logoutHandler())
    }
    
    

    return (      
        <div id={styles.main}>
            <div>
                {
                    students.map((student:ClassState, index:any) => {
                        return(
                            <div className={styles.student} key={index}>
                                <h4>Name</h4>
                                <p>{student.Name}</p>
                                <h4>Students</h4>
                                <p className={styles.students}>
                                {
                                    student.Students.map((item:string, index:any) => {
                                        
                                        if (index + 1 == student.Students.length) {
                                            return(
                                                <span key={index}>{item}&nbsp;</span>
                                            );
                                        }
                                        return(
                                            <span key={index}>{item},&nbsp;</span>
                                        );
                                        
                                        
                                    })
                                }
                                </p>
                                
                            </div>
                        );
                    })
                }
                
                {
                    students.length == 0 ?
                    <>
                        <div id={styles.input_div}>
                            {
                                status == "loading" ?
                                    <>
                                        <div>{status}...</div>
                                    </>
                                : null

                            }
                            <label htmlFor='student' >Student Name: </label>
                            <input type="text" 
                                placeholder="Search a student by name" 
                                value={text}
                                onChange={handleChange} 
                                id="student"
                                name='student'
                                required
                            />
                            
                            <div id={styles.login}>
                                <button type='button' onClick={handleClick}>Login</button>
                            </div>
                            
                        </div>
                    </>
                :
                    <>
                        <div id={styles.logout}>
                            <button type='button' onClick={handleLogout}>Logout</button>
                        </div>
                    </>
                }
                
            </div>
        </div>
    );
}