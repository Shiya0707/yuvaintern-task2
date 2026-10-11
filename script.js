
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const submitBtn = document.getElementById("submitBtn");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null;

// Display students
function displayStudents() {
    studentList.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");

        [student.name, student.email, student.course].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editStudent(student.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteStudent(student.id);

        actions.append(editBtn, deleteBtn);
        row.appendChild(actions);
        studentList.appendChild(row);
    });
}

// Add or update student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();

    if (!name || !email || !course) return;

    if (editId !== null) {
        const student = students.find(s => s.id === editId);

        if (student) {
            student.name = name;
            student.email = email;
            student.course = course;
        }

        editId = null;
        submitBtn.textContent = "Add Student";
    } else {
        students.push({
            id: crypto.randomUUID(),
            name: name,
            email: email,
            course: course
        });
    }

    saveStudents();
    form.reset();
});

// Edit student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;

    editId = id;
    submitBtn.textContent = "Update Student";
    window.scrollTo(0, 0);
}

// Delete student
function deleteStudent(id) {
    if (confirm("Delete this student?")) {
        students = students.filter(s => s.id !== id);

        if (editId === id) {
            editId = null;
            form.reset();
            submitBtn.textContent = "Add Student";
        }

        saveStudents();
    }
}

// Save to localStorage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Initial display
displayStudents();
