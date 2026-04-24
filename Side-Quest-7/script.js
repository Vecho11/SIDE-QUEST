const form = document.getElementById("form")
const input = document.getElementById("user-input")
const statusContainer = document.getElementById("status-container")
const userContainer = document.getElementById("user-container")

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getUserData(){

    const searchValue = input.value.trim()
    const id = Number(searchValue)

    if(isNaN(id) || id <= 0){
        statusContainer.innerHTML = "<p>Invalid ID.</p>"
        userContainer.innerHTML = ""
        return;
    }   

    statusContainer.innerHTML = "<p>Loading...</p>"
    userContainer.innerHTML = ""
    await delay(1000)

    try{
        const response = await fetch(`users.json`)

        if(!response.ok){
            throw new Error("HTTP Request failed.")
        }

        const data = await response.json()
        const user = data.users.find(user => user.id === id)

        statusContainer.innerHTML = ""

        if(!user){
            statusContainer.innerHTML = "<p>Error. User not found</p>"
            return;
        }

        renderUser(user)
        input.value = ""

    }catch(error){
        console.log("Fetching failed, try again.", error)
        statusContainer.innerHTML = "<p>Fetching failed</p>"
    }
}

function renderUser(user){
    userContainer.innerHTML = `
        <div class="rounded-sm flex flex-col text-start gap-2 border border-gray-600 px-3 py-2">
            <p>Name: ${user.name}</p>
            <p>City: ${user.address.city}</p>
            <p>Email: ${user.email}</p>
            
            <p>Status: ${user.status}</p\
        </div>
    `
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getUserData()
})