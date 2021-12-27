const getUsersAPI = () => {
    return axios.get("/users");
}

let users = [];

// Lấy danh sách users
async function refreshUsers () {
    try {
        const res = await getUsersAPI();
        users = res.data;
        users.sort((user1, user2) => {
            return user2.id - user1.id;
        })
        console.log(users)
        // Render ra ngoài giao diện
        renderUI(users);
    } catch (error) {
        console.log(error);
    }
}

const userListElement = document.querySelector("#users-list tbody");

// Render UI - Hiển thị danh sách user ra ngoài giao diện
function renderUI(arr) {
    userListElement.innerHTML = "";

    // Kiểm tra mảng rỗng
    if (arr.length == 0) {
        userListElement.innerHTML = "Không có học viên nào trong danh sách";
        return;
    }

    // Trường hợp có danh sách
    for (let i = 0; i < arr.length; i++) {
        const t = arr[i];
        userListElement.innerHTML += `
                    <tr>
                        <td>${t.name}</td>
                        <td>${t.birthday}</td>
                        <td>${t.email}</td>
                        <td>${t.phone}</td>
                        <td>
                            <a href="/edit.html?id=${t.id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
                            |
                            <a href="#" class="text-danger" onclick="deleteOrNot(${t.id}); return false;"><i class="fa fa-trash-alt"></i> Xóa</a>
                        </td>
                    </tr>
        `;
    }
}

// API xóa công việc
function deleteUserAPI(id) {
    return axios({
        method: "delete",
        url: `/users/${id}`,
    })
}

// Hàm xử lý việc xóa
async function deleteUser(id) {
    try {
        await deleteUserAPI(id) // Gọi API xóa

        // Xóa user trong mảng users ban đầu
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users.splice(i, 1);
            }
        }
        // Render ra ngoài giao diện
        renderUI(users);

    } catch (error) {
        console.log(error);
    }
}


const deleteOrNot = (id) => {
    let text = "Bạn có chắc chắn xóa không?"
    if (confirm(text) == true) {
        deleteUser(id);
    } else {
        console.log("No")
    }
}

refreshUsers();
