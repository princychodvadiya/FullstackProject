import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../../redux/reducer/slice/alert.silce';

function Alert(props) {

    const { color, message } = useSelector(state => state.alert)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const dispatch = useDispatch()
    useEffect(() => {
        if (message != '') {
            enqueueSnackbar(message, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
            
        }

        const timeRef = setTimeout(() => {
            dispatch(resetAlert())
        }, 2000)

        return () => {
            clearTimeout(timeRef)
        }

    }, [message])

    return (
        <div>

        </div>
    );
}

export default Alert;