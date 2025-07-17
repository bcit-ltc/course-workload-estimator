import React, { useState, useEffect, Fragment } from 'react';
import CustomTextField from '../../helpers/CustomTextField';
import CustomCheckBox from '../../helpers/CustomCheckBox';
import FormGroup from '@mui/material/FormGroup';

export default function ProjectCalculator(props) {
    const [activityName, setActivityName] = useState("");
    const [weeksPerProject, setWeeksPerProject] = useState(1);
    const [projectSize, setProjectSize] = useState(2);
    const [manualAdjust, setManualAdjust] = useState(false);
    const [manualPagesPerHour, setManualPagesPerHour] = useState(1);
    const [synchronous, setSynchronous] = useState(true);


    useEffect(() => {
        props.update_s_weeklyHours(0);
        props.update_s_termHours(0);
        props.update_a_weeklyHours(0);
        props.update_a_termHours(0);

        let hoursPerWeek = projectSize;
        if (manualAdjust) {
            hoursPerWeek = manualPagesPerHour;
        }

        let totalTermHours = weeksPerProject * hoursPerWeek;

        if (synchronous) {
            props.update_s_termHours(totalTermHours);
        } else {
            props.update_a_termHours(totalTermHours);
        }

        props.updateActivityName(activityName);
    }, [activityName, weeksPerProject, projectSize, manualAdjust, manualPagesPerHour, synchronous]);

    return (
        <Fragment>
            <CustomTextField fieldLabel="Project Name (Optional)" defaultState={""} updateState={setActivityName} />
            <CustomTextField fieldLabel="Number of Weeks per Project" defaultState={1} updateState={setWeeksPerProject} fieldType="number" inputProps={{ inputProps: { min: 0 }, endAdornment: "weeks" }} />
            <CustomTextField fieldLabel="Project Size" defaultState={2} updateState={setProjectSize} selectContent={[
                { value: 2, text: 'Small' },
                { value: 7, text: 'Medium' },
                { value: 13, text: 'Large' }
            ]} />
            <FormGroup className='form-group-toggle'>
                <CustomCheckBox checkboxLabel="Adjust Manually" defaultState={false} updateState={setManualAdjust} />
                {
                    manualAdjust &&
                    <CustomTextField fieldLabel="Hours per Week" defaultState={1} updateState={setManualPagesPerHour} fieldType="number" inputProps={{ inputProps: { min: 0 }, endAdornment: "hours/week" }} />
                }
            </FormGroup>
            <CustomCheckBox checkboxLabel="Synchronous Time" defaultState={false} updateState={setSynchronous} collapseContent={<p>Checking Synchronous Time means that the Reading & Watching Activity is part of scheduled Synchronous Meeting Time (e.g. an in-class activity) and will be calculated with the synchronous time instead of the asynchronous time.</p>} />
        </Fragment>
    );
}
