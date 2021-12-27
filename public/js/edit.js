const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('id');
const nameInputElement = document.querySelector("#name");
const birthdayInputElement = document.querySelector("#birthday");
const emailInputElement = document.querySelector("#email");
const phoneInputElement = document.querySelector("#phone");
const saveBtnElement = document.querySelector("#btn-save");
const editFormElement = document.querySelector("#form");

const getUserByID = (id) => {
    return axios.get("/users/" + id);
}

let user = undefined;

async function editUsers () {
    try {
        const res = await getUserByID(userID);
        user = res.data;
        // Render ra ngoài giao diện
        renderEdit(user);
    } catch (error) {
        console.log(error);
    }
}

const renderEdit = (user) => {
    nameInputElement.value = user.name;
    birthdayInputElement.value = user.birthday;
    emailInputElement.value = user.email;
    phoneInputElement.value = user.phone;
}

saveBtnElement.addEventListener("click", () => {
    if (nameInputElement.value === "" || birthdayInputElement.value === "" || emailInputElement.value === "" || phoneInputElement.value == "") {
        alert("Chưa nhập hết thông tin!");
    } else {
        user.name = nameInputElement.value;
        user.birthday = birthdayInputElement.value;
        user.email = emailInputElement.value;
        user.phone = phoneInputElement.value;
        alert("Đã cập nhật thành công!");
        updateUsersAPI(user)
    }
})

// Gọi API
async function getUsersAPI() {
    try {
        let res = await axios.get(`http://localhost:3000/users/${userID}`);
        console.log(res);
        
    } catch (error) {
        console.log(error);
    }
}


// Cập nhật user
function updateUsersAPI(user) {
    return axios({
        method: "put",
        url: `/users/${userID}`,
        data: user,
    })
}


const main = () => {
    editUsers()
    getUsersAPI()
}

main();
