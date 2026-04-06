// DATE
function getTodayDate(){
    let today = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return today.toLocaleDateString() + " (" + days[today.getDay()] + ")";
}

window.onload = function(){
    document.getElementById("daydate").innerText = getTodayDate();
};

// INPUTS
for(let i=1;i<=6;i++){
    document.getElementById("inputs").innerHTML += `
        <div>
            <b>Period ${i}</b><br>

            <select id="sub${i}">
                
                <option>Select Subject</option>
                <option>Math</option>
                <option>Mental Math</option>
                <option>English</option>
                <option>English Grammar</option>
                <option>Hindi</option>
                <option>Hindi Grammar</option>
                <option>Computer</option>
                <option>Science</option>
                <option>E.V.S</option>
                <option>S.S.T</option>
                <option>G.K.</option>
                <option>Oral</option>
                <option>Rhymes</option>
                <option>Activity</option>
                <option>Drawing</option>
                <option>Hindi Writing Book</option>
                <option>English Writing Book</option>
                <option>English Rhymes</option>
                <option>English Alphabet Book</option>
                <option>Hindi Book(अक्षर ज्ञान)</option>
                <option>Math Book(Numbers 1-100)</option>
                <option>Hindi Writing Book(अक्षर लेखन)</option>
            </select>

            <input id="cw${i}" placeholder="Class Work">
            <input id="hw${i}" placeholder="Home Work">
        </div>
    `;
}

// SUFFIX
function getSuffix(i){
    if(i==1) return "st";
    if(i==2) return "nd";
    if(i==3) return "rd";
    return "th";
}

// GENERATE
function generate(){

    let worksheet = document.getElementById("worksheet");
    worksheet.style.display = "block";

    let selectedStyle = document.getElementById("styleSelect").value;
    worksheet.className = selectedStyle;

    let cls = document.getElementById("class").value;
    document.getElementById("outClass").innerText = cls;
    document.getElementById("outClass2").innerText = cls;

    document.getElementById("outFac").innerText =
        document.getElementById("facilitator").value;

    document.getElementById("outDate").innerText = getTodayDate();

    let total = +document.getElementById("totalStudents").value || 0;
    let present = +document.getElementById("presentStudents").value || 0;
    let absent = total - present;

    document.getElementById("outTotal").innerText = total;
    document.getElementById("outPresent").innerText = present;
    document.getElementById("outAbsent").innerText = absent;

    let remarks = document.getElementById("remarksInput").value || "All Students Were Present";

    let data = "";

    for(let i=1;i<=6;i++){

        let subject = document.getElementById("sub"+i).value;
        let cw = document.getElementById("cw"+i).value;
        let hw = document.getElementById("hw"+i).value;

        data += `
        <tr>
            <td rowspan="2">${i}<sup>${getSuffix(i)}</sup></td>
            <td rowspan="2">${subject}</td>

            <td>Class Work</td>
            <td>${cw}</td>

            ${i === 1 ? `<td rowspan="12" class="remarks1">${remarks}</td>` : ""}
        </tr>

        <tr>
            <td>Home Work</td>
            <td>${hw}</td>
        </tr>
        `;
    }

    document.getElementById("tableData").innerHTML = data;
}

// DOWNLOAD
function downloadImage(){
    html2canvas(document.getElementById("worksheet")).then(canvas=>{
        let link = document.createElement("a");
        link.download = "worksheet.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
