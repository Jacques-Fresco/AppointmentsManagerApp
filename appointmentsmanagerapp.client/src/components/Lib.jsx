export const testData = [
    { id: 1, Title: "Tile 1", Description: "Description 1", LevelOfImportance: 3, Date: "14-04-2023", Time: "17:32", Adress: "Be 8500" },
    { id: 2, Title: "Tile 2", Description: "Description 2", LevelOfImportance: 4, Date: "14-04-2023", Time: "17:32", Adress: "Be 8500" },
    { id: 3, Title: "Tile 3", Description: "Description 3", LevelOfImportance: 5, Date: "14-04-2023", Time: "17:32", Adress: "Be 8500" },
    { id: 4, Title: "Tile 4", Description: "Description 4", LevelOfImportance: 0, Date: "14-04-2023", Time: "17:32", Adress: "Be 8500" },
]

export const entry = {
    Title: "Test title",
    Description: "Test description",
    Address: "Test address",
    Date: new Date(),
    Time: formatedTimeToStr(),
    Done: false,
    Deleted: false,
    LevelOfImportance: 2,
}

export const filter = {
    LevelOfImportance: null,
    All: false,
    Deleted: false,
    Done: false,
    StartDate: null,
    EndDate: null,
    SpecifiedDate: null,
    SpecifiedTime: null
}

export const activeId = {
    id: 0
}

const url = "api/appointment"

export async function getDefault() {
    const res = await fetch(url)

    if(!res.ok && !res.status !== 200) {
        console.log("It sucked at getting default data: ", res)
        notifyUser("Something went wrong, please refresh the page.")
        return []
    }

    return await res.json()
}

export async function postAppointment(newApp) {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newApp),
        headers: {
            "content-type": "application/json"
        }
    })

    if(!res.ok) {
        console.log("It sucked at creating new appointment: ", res)
        notifyUser("We could not create your appoinment, please try again.")
        return {msg: res}
    }

    return await res.json()
}

export async function getDefault() {
    const res = await fetch(url + "/" + "id", {
        method: "DELETE"
    })

    if(!res.ok && !res.status !== 200) {
        console.log("It sucked at getting default data: ", res)
        notifyUser("Something went wrong, please refresh the page.")
        return []
    }

    return await res.json()
}

export function notifyUser(msg){
    const notificationEl = document.qwerySelector(".notifications")
    notificationEl.innerHTML = msg ? msg : ""

    if(msg)
    setTimeout(() => {

    }, 12000)
}

export function openModal(modal){
    const modal_ = document.querySelector("."+modal)
    if(modal_){
        modal_.classList.remove("hidden")
    }
}

export function closeModal(modal){
    const modal_ = document.querySelector("."+modal)
    if(modal_){
        modal_.classList.add("hidden")
    }
}

export function formatedDateToStr(d){
    const nd = d ? new Date(d) : new Date()
    const month_ = nd.getMonth() + 1;
    const monthStr = month_ > 9 ? month_ : 0 + "" + month_;
    const day_ = nd.getDate() > 9 ? nd.getDate() : 0 + "" + nd.getDate();
    return nd.getFullYear() + "-" + monthStr + "-" + day_;
}

export function formatedTimeToStr(d){
    const nd = d ? new Date(d) : new Date()
    const hr_ = nd.getHours() < 9 ? 0 + '' + nd.getHours() : nd.getHours()
    const min_ = nd.getMinutes() < 9 ? 0 + '' + nd.getMinutes() : nd.getMinutes()
    return hr_ + ':' + min_
}