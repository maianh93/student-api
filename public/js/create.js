const saveBtnElement = document.querySelector("#btn-save");
const nameInputElement = document.querySelector("#name");
const birthdayInputElement = document.querySelector("#birthday");
const emailInputElement = document.querySelector("#email");
const phoneInputElement = document.querySelector("#phone");

// Random Id
// const createId = () => {
//     return Math.floor(Math.random() * 100000);
// }


// API thêm user
function createUserAPI(user) {
    return axios({
        method: "post",
        url: `/users`,
        data: user,
    })
}

//Hàm xử lý việc thêm
async function createUser(newUser) {
    try {
        const res = await createUserAPI(newUser);
        //Render lại giao diện

    } catch (error) {
        console.log(error);
    }
}



// Thêm thông tin học viên
saveBtnElement.addEventListener("click", () => {
    if (nameInputElement.value === "" || birthdayInputElement.value === "" || emailInputElement.value === "" || phoneInputElement.value == "") {
        alert("Hãy nhập đủ thông tin!");
        return
    } else {
        alert("Đã cập nhật thành công!");
        let newUser = {
            // id: createId(),
            name: nameInputElement.value,
            email: emailInputElement.value,
            phone: phoneInputElement.value,
            birthday: birthdayInputElement.value,
        }
        createUser(newUser);
        nameInputElement.value = "";
        birthdayInputElement.value = "";
        emailInputElement.value = "";
        phoneInputElement.value = "";
    }
})