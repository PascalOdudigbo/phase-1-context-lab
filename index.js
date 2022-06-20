/* Your Code Here */
function createEmployeeRecord(employeeDatailsArray){
    const employeeObject = {
        firstName: employeeDatailsArray[0],
        familyName: employeeDatailsArray[1],
        title: employeeDatailsArray[2],
        payPerHour: employeeDatailsArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObject;
}

function createEmployeeRecords(arrayOfEmployeeDetailsArrays){
    let index = 0;
    const employeeObjectsArray = [];
    for(const elements of arrayOfEmployeeDetailsArrays){
        const employeeObject = createEmployeeRecord(elements)
        employeeObjectsArray[index] = employeeObject;
        index += 1;
    }
    return employeeObjectsArray;
}

function createTimeInEvent(timeInStamp){
    const extractedHour = timeInStamp.slice(11, timeInStamp.length);
    const extractedDate = timeInStamp.slice(0, 10)
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(extractedHour, 10),
        date: extractedDate
    };
    this.timeInEvents.push(timeInObject);
    return this; 
}

function createTimeOutEvent(timeOutStamp){
    const extractedHour = timeOutStamp.slice(11, timeOutStamp.length);
    const extractedDate = timeOutStamp.slice(0, 10)
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(extractedHour, 10),
        date: extractedDate
    };
    this["timeOutEvents"].push(timeOutObject);
    return this; 
}

function hoursWorkedOnDate(timeInStamp){
    let hoursWorked = 0;
    const timeInEventsArray = this.timeInEvents;
    for(let i = 0; i < timeInEventsArray.length; i++){
        if(timeInEventsArray[i].date === timeInStamp){
            let timeInEventHours = this.timeInEvents[i].hour;
            let timeOutEventHours = this.timeOutEvents[i].hour;
            hoursWorked = Math.floor((timeOutEventHours - timeInEventHours) / 100);
        }

    }
    return hoursWorked;
}

function wagesEarnedOnDate(timeInStamp){
    const hoursWorked = this.hoursWorkedOnDate(timeInStamp);
    const payPerHour = this.payPerHour;
    const wages = Math.floor(hoursWorked * payPerHour);
    return wages;

}

function findEmployeeByFirstName(srcArray, firstName){
    for(const employeeObject of srcArray){
        if(employeeObject.firstName === firstName){
            return employeeObject;
        }
    }
    return undefined;
}

function calculatePayroll(employeeDatailsArray){
    let payroll = 0;
    for(let employeeObject of employeeDatailsArray){
        payroll += allWagesFor().call(this) 
    }
    return payroll;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

