let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUserIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    document.getElementById('saveButton').addEventListener('click', addOrUpdateUser);
});

function renderTable() {
    const userTable = document.querySelector('#userTable tbody');
    userTable.innerHTML = '';
    users.forEach((user, index) => {
        userTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.age}</td>
                <td class="buttons">
                    <button onclick="viewUser(${index})">View</button>
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="removeUser(${index})">Remove</button>
                </td>
            </tr>
        `;
    });
}

function addOrUpdateUser() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;

    if (currentUserIndex === null) {
        users.push({ name, phone, age });
    } else {
        users[currentUserIndex] = { name, phone, age };
        currentUserIndex = null;
    }

    localStorage.setItem('users', JSON.stringify(users));
    renderTable();
    clearForm();
}

function viewUser(index) {
    const user = users[index];
    document.getElementById('viewDetails').innerText = `Name: ${user.name}, Phone: ${user.phone}, Age: ${user.age}`;
}

function editUser(index) {
    const user = users[index];
    currentUserIndex = index;
    document.getElementById('userId').value = index;
    document.getElementById('name').value = user.name;
    document.getElementById('phone').value = user.phone;
    document.getElementById('age').value = user.age;
}

function removeUser(index) {
    if (confirm('Delete this user?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        renderTable();
    }
}

function clearForm() {
    document.getElementById('userId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('age').value = '';
}
