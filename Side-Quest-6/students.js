const students = [
    { student_id: 1, name: "Jericho", course: "BSIT" },
    { student_id: 2, name: "Jj", course: "BSCS" },
    { student_id: 3, name: "Merry", course: "BSBA" },
    { student_id: 4, name: "Anna", course: "BSIT" },
    { student_id: 5, name: "Mark", course: "BSCS" }
];

const parentList = document.querySelector(".datas")
const findStudentById = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")
const showAllStudents = document.querySelector(".show-all-student ")
const showCourseStatistics = document.querySelector(".show-course-stats")
const nameInput = document.querySelector(".name-input")
const nameSearch = document.querySelector(".find-name")

function renderedList(text) {
    const newList = document.createElement("li")
    newList.textContent = text
    parentList.appendChild(newList)
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    parentList.textContent = ""
    searchStudent()
})

showAllStudents.addEventListener("click", (e) => {
    e.preventDefault()
    parentList.textContent = ""
    displayAllStudents()
})

showCourseStatistics.addEventListener("click", (e) => {
    e.preventDefault()
    parentList.textContent = ""
    displayCourseStats()
})

nameSearch.addEventListener("click", (e) => {
    e.preventDefault()
    parentList.textContent = ""
    searchStudentName()
})

nameInput.addEventListener("keyup", (e) => {
    parentList.textContent = ""
    liveDataSearch()
})

function searchStudent() {
    const searchID = Number(findStudentById.value)
    findStudentById.value = ""

    if (isNaN(searchID) || searchID <= 0) {
        parentList.textContent = "Invalid ID"
        return;
    }
    const student = students.find(id => id.student_id === searchID)

    if(student){
        renderedList(`${student.student_id} - ${student.name} : ${student.course}`)
    } else {
        renderedList("Student ID not found.")
    }
}

function searchStudentName(){
    const findName = nameInput.value.toLowerCase().trim()
    nameInput.value = ""

    if(findName === null){
        parentList.textContent = "Invalid Name!"
        return;
    }

    const student = students.find(s => s.name.toLowerCase() === findName)

    if(student){
        renderedList(`${student.student_id} - ${student.name} : ${student.course}`)
    } else {
        renderedList("Student name not found.")
    }

}

function liveDataSearch(){
    const findName = nameInput.value.toLowerCase().trim()
    parentList.textContent = ""

    const student = students.filter(s => 
        s.name.toLowerCase().includes(findName))

    student.forEach((s) => {
        if(s){
            renderedList(`${s.student_id} - ${s.name} : ${s.course}`)
        }
   })
}

function displayAllStudents() {
    for (let student of students) {
        renderedList(`${student.student_id} ${student.name} - ${student.course}`)
    }
}

function displayCourseStats() {
    const coursesCount = {}
    for (let student of students) {
        if (coursesCount[student.course]) {
            coursesCount[student.course] += 1
        } else {
            coursesCount[student.course] = 1
        }
    }
    for (let course in coursesCount) {
        renderedList(`${course}: ${coursesCount[course]}`)
    }
}
























