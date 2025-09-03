import React, { useState, useEffect, Fragment } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import CustomTextField from '../../helpers/CustomTextField';
import CustomCheckBox from '../../helpers/CustomCheckBox';

export default function CustomAssignmentCalculator(props) {
    const [activityName, setActivityName] = useState("");
    const [assignmentQuantity, setAssignmentQuantity] = useState(1);
    const [assignmentPrepHours, setAssignmentPrepHours] = useState(0);
    const [assignmentLength, setAssignmentLength] = useState(1);
    const [postAssignmentHours, setPostAssignmentHours] = useState(1);
    const [synchronous, setSynchronous] = useState(false);


    useEffect(() => {
        props.update_s_weeklyHours(0);
        props.update_s_termHours(0);
        props.update_a_weeklyHours(0);
        props.update_a_termHours(0);

        let aTermHours = (assignmentQuantity * assignmentPrepHours) + (assignmentQuantity * postAssignmentHours);
        let totalAssignmentLength = assignmentQuantity * assignmentLength;

        if (synchronous) {
            props.update_s_termHours(totalAssignmentLength);
        } else {
            aTermHours += totalAssignmentLength;
        }

        props.update_a_termHours(aTermHours);
        props.updateActivityName(activityName);
    }, [activityName, assignmentQuantity, assignmentPrepHours, assignmentLength, postAssignmentHours, synchronous]);

    return (
        <Fragment>
            <CustomTextField fieldLabel="Assignment Name (Optional)" defaultState={""} updateState={setActivityName} />
            <CustomTextField fieldLabel={"Custom Assignments per Course"} defaultState={1} updateState={setAssignmentQuantity} fieldType="number" inputProps={{ inputProps: { min: 0 }, endAdornment: (<InputAdornment position="end">/course</InputAdornment>) }} />
            <CustomTextField fieldLabel="Preparation Time per Assignment (Hours)" defaultState={0} updateState={setAssignmentPrepHours} fieldType="number" inputProps={{ inputProps: { min: 0 }, endAdornment: "hours" }} collapseContent={<p>Optional. This time will be added to the asynchronous category in the Workload Summary.</p>} />
            <CustomTextField fieldLabel="Hours per Assignment" defaultState={1} updateState={setAssignmentLength} fieldType="number" inputProps={{ inputProps: { min: 0 }, endAdornment: "hours" }} collapseContent={<p>When the Synchronous box is checked, the hours are assigned to the synchronous totals. If the check is removed, all hours are assigned to the asynchronous category in the Workload Summary.</p>} />
            <CustomCheckBox checkboxLabel="Synchronous Time" defaultState={false} updateState={setSynchronous} />
            <CustomTextField fieldLabel="Post-Activity Reporting Time per Assignment (Hrs)" defaultState={1} updateState={setPostAssignmentHours} fieldType="number" inputProps={{ inputProps: { min: 0 }, endAdornment: "hours" }} collapseContent={<p>Optional. This time will be added to the asynchronous category in the Workload Summary.</p>} />

        </Fragment>
    );
}
