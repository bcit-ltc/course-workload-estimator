import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import createActivityString from '../helpers/createActivityString';
import components from '../helpers/components';
import MeetingCalculator from '../calculators/meetings/MeetingCalculator';
import LabsCalculator from '../calculators/practices/LabsCalculator';
import ClinicalCalculator from '../calculators/practices/ClinicalCalculator';
import ReadingCalculator from '../calculators/readings/ReadingCalculator';
import WatchingCalculator from '../calculators/watchings/WatchingCalculator';
import DiscussionCalculator from '../calculators/writings/DiscussionCalculator';
import WritingAssignmentCalculator from '../calculators/writings/WritingAssignmentCalculator';
import ProjectCalculator from '../calculators/projects/ProjectCalculator';
import PresentationCalculator from '../calculators/projects/PresentationCalculator';
import ExamCalculator from '../calculators/assessments/ExamCalculator';
import QuizCalculator from '../calculators/assessments/QuizCalculator';
import CustomAssignmentCalculator from '../calculators/customs/CustomAssignmentCalculator';


export default function CourseActivity(props) {
    const [activityName, setActivityName] = useState("");
    const [s_weeklyHours, set_s_weeklyHours] = useState(0);
    const [s_termHours, set_s_termHours] = useState(0);
    const [a_weeklyHours, set_a_weeklyHours] = useState(0);
    const [a_termHours, set_a_termHours] = useState(0);
    const [activityInputDetails, setActivityInputDetails] = useState({});
    const activityProps = {
        ...{ updateActivityName: setActivityName },
        ...{ update_s_weeklyHours: set_s_weeklyHours },
        ...{ update_s_termHours: set_s_termHours },
        ...{ update_a_weeklyHours: set_a_weeklyHours },
        ...{ update_a_termHours: set_a_termHours },
        ...{ reportInputDetails: setActivityInputDetails },
    };

    const renderCalculator = () => {
        switch (props.componentIndex) {
            case 0:
                switch (props.activityIndex) {
                    case 0:
                        return <MeetingCalculator meetingType="week" {...activityProps}></MeetingCalculator>;
                    case 1:
                        return <MeetingCalculator meetingType="term" {...activityProps}></MeetingCalculator>;
                }
            case 1:
                switch (props.activityIndex) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return <LabsCalculator {...activityProps}></LabsCalculator>;
                    case 6:
                    case 7:
                        return <ClinicalCalculator {...activityProps}></ClinicalCalculator>;
                }
            case 2:
                switch (props.activityIndex) {
                    case 0:
                        return <ReadingCalculator {...activityProps}></ReadingCalculator>;
                    case 1:
                        return <WatchingCalculator {...activityProps}></WatchingCalculator>;
                }
            case 3:
                switch (props.activityIndex) {
                    case 0:
                        return <DiscussionCalculator {...activityProps}></DiscussionCalculator>;
                    case 1:
                        return <WritingAssignmentCalculator {...activityProps}></WritingAssignmentCalculator>;
                }
            case 4:
                switch (props.activityIndex) {
                    case 0:
                    case 1:
                        return <ProjectCalculator {...activityProps}></ProjectCalculator>;
                    case 2:
                        return <PresentationCalculator {...activityProps}></PresentationCalculator>;
                }
            case 5:
                switch (props.activityIndex) {
                    case 0:
                        return <ExamCalculator {...activityProps}></ExamCalculator>;
                    case 1:
                        return <QuizCalculator {...activityProps}></QuizCalculator>;
                }
            case 6:
                switch (props.activityIndex) {
                    case 0:
                        return <CustomAssignmentCalculator {...activityProps}></CustomAssignmentCalculator>;
                }
        }
    };

    const addActivity = async () => {
        try {
            let newActivityString = createActivityString(props.componentIndex, props.activityIndex, activityName, s_weeklyHours, s_termHours, a_weeklyHours, a_termHours);
            await props.updateSummary(newActivityString);

            if (typeof window !== 'undefined' && window.plausible) {
                const componentKeys = Object.keys(components);
                const component = componentKeys[props.componentIndex] || 'Unknown';
                const activity = components[component]?.[props.activityIndex] || 'Unknown';
                const propsToSend = {
                    component,
                    activity,
                    activity_name: activityName || 'Unnamed',
                    hours_sync_weekly: String(s_weeklyHours),
                    hours_sync_term: String(s_termHours),
                    hours_async_weekly: String(a_weeklyHours),
                    hours_async_term: String(a_termHours),
                };
                if (Object.keys(activityInputDetails).length > 0) {
                    propsToSend.inputs = JSON.stringify(activityInputDetails);
                }
                window.plausible('Activity Added', { props: propsToSend });
                console.log('Activity Added (Plausible sent):', { event: 'Activity Added', props: propsToSend, inputDetails: activityInputDetails });
            }
        } catch (error) {
            console.error("Error in addActivity", error);
        }
    };

    return (
        <Box className='course-activity-container' key={"form-group-" + props.componentIndex + "-" + props.activityIndex}>
            <FormGroup className='calculator-text-field'>{renderCalculator()}</FormGroup>
            <Box textAlign='center'>
                <Button variant="contained" size="large" onClick={addActivity}>Add Activity</Button>
            </Box>
        </Box>
    );
}
