import components from "./components";

const createActivityString = (componentIndex, activityIndex, activityName, sWeeklyHours, sTermHours, aWeeklyHours, aTermHours) => {
    let newActivity = {};
    newActivity['Component'] = Object.keys(components)[componentIndex];
    newActivity['Activity'] = components[Object.keys(components)[componentIndex]][activityIndex];
    newActivity['Activity Name'] = activityName;
    newActivity['hours/week (S)'] = sWeeklyHours;
    newActivity['hours/term (S)'] = sTermHours;
    newActivity['hours/week (A)'] = aWeeklyHours;
    newActivity['hours/term (A)'] = aTermHours;

    let localSave = localStorage.getItem('bcitcourseworkloadestimator') || "null";
    let newActivityString;

    if (localSave != "null") {
        let currentSummary = JSON.parse(localSave);
        currentSummary.push(newActivity);
        newActivityString = JSON.stringify(currentSummary);
    } else {
        newActivityString = JSON.stringify([newActivity]);
    }

    return newActivityString;
};

export default createActivityString;
