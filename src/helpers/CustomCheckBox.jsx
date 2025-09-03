import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import HelpIcon from '@mui/icons-material/Help';
import Collapse from '@mui/material/Collapse';

export default function CustomCheckBox(props) {
    const [checkboxState, setCheckboxState] = useState(props.defaultState);
    const [clicked, setClicked] = React.useState(false);


    const handleCheckboxState = (event) => {
        setCheckboxState(event.target.checked);
    };

    const handleClick = () => {
        setClicked((prev) => !prev);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCheckboxState(prev => !prev);
        }
    };

    useEffect(() => {
        props.updateState(checkboxState);
    }, [checkboxState]);

    return (
        <div className='custom-checkbox'>
            <Stack direction="row" spacing={0.5}>
                <FormControlLabel className='form-control-label' control={
                    <Checkbox onKeyDown={handleEnter} checked={checkboxState} color="primary" onChange={handleCheckboxState} />
                } label={props.checkboxLabel} />

                {props.collapseContent ?
                    <HelpIcon onClick={handleClick} sx={{ color: "#00a69d" }} fontSize="small" className='help-icon' /> : null
                }
            </Stack>

            {props.collapseContent ?
                <Collapse in={clicked} timeout="auto" className='collapse-content'>
                    {props.collapseContent}
                </Collapse> : null
            }

        </div>
    );
}