const parentList = document.querySelector(".datas")
const findStudentById = document.querySelector(".search-input")
const searchButton = document.querySelector(".search-button")
const showAllStudents = document.querySelector(".show-all-student")
const showCourseStatistics = document.querySelector(".show-course-stats")
const nameInput = document.querySelector(".name-input")
const nameSearch = document.querySelector(".find-name")
const addStudentInput = document.querySelector(".add-student-input")
const addCourseInput = document.querySelector(".add-course-input")
const removeInput = document.querySelector(".remove-input")
const removeStudentBtn = document.querySelector(".remove-student-btn")
const addStudentBtn = document.querySelector(".add-student-btn")

let students = [];
let id = 1;

function addNewStudent(){
    const name = addStudentInput.value.trim()
    const course = addCourseInput.value.trim()

    if(course === "" || name === ""){
        renderedList("Invalid Course / Name.")
        return;
    }
    students.push({
        student_id: id++,
        name, 
        course
    });

    addStudentInput.value = ""
    addCourseInput.value = ""   
}

function removeStudent(){
    const idToFound = Number(removeInput.value.trim());
    
    if(isNaN(idToFound)){
        renderedList("Invalid ID, Student not found.")
        return;
    }

    const index = students.findIndex(s => s.student_id === idToFound)
    
    if(index !== -1){
        students.splice(index, 1);
        removeInput.value = ""
    }else{
        renderedList("Invalid ID, Student not found.")
        removeInput.value = ""
    }
}

function renderedList(text) {
    const newList = document.createElement("li")
    newList.textContent = text
    parentList.appendChild(newList)
}

function searchStudent() {
    const searchID = Number(findStudentById.value)
    findStudentById.value = ""

    if (isNaN(searchID) || searchID <= 0) {
        renderedList("Invalid ID.")
        return;
    }
    const student = students.find(id => id.student_id === searchID)

    if(student){
        renderedList(renderedData(student))
    } else {
        renderedList("Student ID not found.")
    }
}

function renderedData(student){
     return `${student.student_id} - ${student.name} : ${student.course}`
}

function searchStudentName(){
    const findName = nameInput.value.toLowerCase().trim()
    nameInput.value = ""


    if(findName === ""){
        renderedList("Invalid name.")
        return;
    }

    const student = students.find(s => s.name.toLowerCase() === findName)

    if(student){
        renderedList(renderedData(student))
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
            renderedList(renderedData(s))
        }
   })
}

function displayAllStudents() {
    parentList.textContent = ""

    if(students.length <= 0){
        renderedList("No student in the record.")
        return;
    }

    for (let student of students) {
        renderedList(renderedData(student))
    }
}

function displayCourseStats() {
    const coursesCount = {}

    if(students.length <= 0){
        renderedList("No course in the record.")
        return;
    }

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

addStudentBtn.addEventListener("click", (e) => {
    e.preventDefault()
    parentList.textContent = ""
    addNewStudent()
})

removeStudentBtn.addEventListener("click", (e) => {
    e.preventDefault()
    parentList.textContent = ""
    removeStudent()
})


















