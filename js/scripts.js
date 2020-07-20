// Scripts
// Author: Ombajo

// Business Logic
// _______________________________________________________________________________________

//define Akan Names
const akanNames = {
    male: [
        "Kwasi",
        "Kwadwo",
        "Kwabena",
        "Kwaku",
        "Yaw",
        "Kofi",
        "Kwame",
    ],
    female: [
        "Akosua",
        "Adwoa",
        "Abenaa",
        "Akua",
        "Yaa",
        "Afua",
        "Ama",
    ],
}

let database = []
let gender

const addData = (event) => {
    event.preventDefault();  //to stop the form submitting	

    if (document.getElementById("male").checked)
        gender = document.getElementById("male").value;
    else if (document.getElementById("female").checked)
        gender = document.getElementById("female").value;

    var date = document.getElementById('day').value
    var date_new = date.split("-")
    var month = parseInt(date_new[1])
    var day = parseInt(date_new[1])
    var year = parseInt(date_new[0])

    console.log(date_new)
    console.log(day)
    console.log(month)
    console.log(year)

    let data = {
        id: Date.now(),
        date: date_new,
        day: day,
        month: month,
        year: year,
        gender: gender
    }

    function splitNum(year, pos) {
        cc = year.toString();
        return [cc.substring(0, pos), cc.substring(pos)];
    }

    var year_split = splitNum(year, 2)
    var CC = year_split[0]
    console.log(CC)

    //var mainForm = document.getElementById("mainForm")
    //document.forms[0].reset(); // to clear the form for the next entries
    //mainForm.reset()

    // Database
    database.push(data)

    var DD = day
    var MM = month
    var YY = year_split[1]

    console.log(YY)

    // Day of the week (d) = ( ( (CC/4) -2*CC-1) + ((5*YY/4) ) + ((26*(MM+1)/10)) + DD ) mod 7
    var dy = Math.abs(Math.trunc(((CC / 4) - 2 * CC - 1) + ((5 * YY / 4)) + ((26 * (MM + 1) / 10)) + DD) % 7);

    console.log(dy)
    // where;

    // CC - is the century digits. For example 1989 has CC = 19
    // YY - is the Year digits (1989 has YY = 89)
    // MM -  is the Month
    // DD - is the Day of the month 
    // mod - is the modulus function ( % )

    // Get the akan name from the akanNames object
    // Get the right gender by using square brackets notation to access object properties
    const akanNameList = akanNames[gender];
    console.log(akanNameList)
    // Filter through the list of Akan Names match the index with the day of the week calculated above.
    const akanNameFiltered = akanNameList.filter(function (name, index) {
        return index === dy;
    });
    const akanName = akanNameFiltered[0];

    console.log(akanName)


    //for display purposes only
    console.log('added', { data });
    let well = document.querySelector('#msg #well');
    //well.textContent = '\n' + JSON.stringify(data, '\t', 2);
    alert(' Your Akan name is: ' + akanName)

    //saving to localStorage
    localStorage.setItem('Akan_Names_Stored', JSON.stringify(akanName));

    // Output back to the user
    return well.innerHTML = akanName 

    // saving to a text file
    // function download(content, fileName, contentType) {
    //     var a = document.createElement("a");
    //     var file = new Blob([content], {type: contentType});
    //     a.href = URL.createObjectURL(file);
    //     a.download = fileName;
    //     a.click();
    // }
    // download(data, 'json.txt', 'text/plain');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', addData);
});

