const students = [
    { student_id: 1, name: "Jericho", course: "BSIT" },
    { student_id: 2, name: "JJ", course: "BSCS" },
    { student_id: 3, name: "Merry", course: "BSBA" },
    { student_id: 4, name: "Anna", course: "BSIT" },
    { student_id: 5, name: "Mark", course: "BSCS" }
];

const parentList = document.querySelector(".datas")
const input = document.querySelector(".input")
const findId = document.querySelector(".id-input")
const button = document.querySelector(".event-button")

const coursesCount = {}
button.addEventListener("click", (e) => {
    e.preventDefault()
    studentFunc()
})

function studentFunc() {
    const choiceValue = Number(input.value);
    parentList.textContent = ""


    if (isNaN(choiceValue) || choiceValue <= 0) {
        parentList.textContent = "Invalid input"
        return;
    }
    if (choiceValue === 1) {
        for (let student of students) {
            const newList = document.createElement("li")
            newList.textContent = `${student.student_id} ${student.name} - ${student.course}`
            parentList.appendChild(newList)
        }
        input.value = ""
    }
    else if (choiceValue === 2) {
        const searchID = Number(findId.value)
        let found = false

        for (let student of students) {
            if (searchID === student.student_id) {
                const newList = document.createElement("li")
                newList.textContent = `${student.student_id} - ${student.name} : ${student.course}`
                parentList.appendChild(newList)
                found = true
            }
            input.value = ""
        }
        if (!found) {
            const newList = document.createElement("li")
            newList.textContent = "Student ID not found."
            parentList.appendChild(newList)
            input.value = ""
            findId.value = ""
        }
    } else if (choiceValue === 3) {

        for (let student of students) {
            if (coursesCount[student.course]) {
                coursesCount[student.course] += 1
            } else {
                coursesCount[student.course] = 1
            }
        }
        for (let course in coursesCount) {
            const newList = document.createElement("li")
            newList.textContent = `${course}: ${coursesCount[course]}`
            parentList.appendChild(newList)
        }
        input.value = ""
    }
    else if (choiceValue === 4) {
        console.log("Program ended.")
        parentList.textContent = "Program ended."
    }
}
























