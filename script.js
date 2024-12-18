document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("student-form");
    const tableBody = document.getElementById("table-body");
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let editIndex = null;

    // Function to render the table
    const renderTable = () => {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.class}</td>
                <td>${student.roll}</td>
                <td class="actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Handle form submission
    studentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const id = document.getElementById("student-id").value.trim();
        const classNam = document.getElementById("class").value.trim();
        const roll = document.getElementById("Roll-no").value.trim();

        const newStudent = { name, id, class: classNam, roll };

        if (editIndex !== null) {
            students[editIndex] = newStudent; // Update existing record
            editIndex = null;
        } else {
            students.push(newStudent); // Add new record
        }

        localStorage.setItem("students", JSON.stringify(students));
        studentForm.reset();
        renderTable();
    });

    // Working of Edit and Delete buttons
    tableBody.addEventListener("click", (event) => {
        const target = event.target;
        const index = target.getAttribute("data-index");

        if (target.classList.contains("edit-btn")) {
            // Edit record
            const student = students[index];
            document.getElementById("name").value = student.name;
            document.getElementById("student-id").value = student.id;
            document.getElementById("class").value = student.class;
            document.getElementById("Roll-no").value = student.roll;
            editIndex = index;
        } else if (target.classList.contains("delete-btn")) {
            // Delete record
            if (confirm("Are you sure you want to delete this record?")) {
                students.splice(index, 1); // Remove record
                localStorage.setItem("students", JSON.stringify(students));
                renderTable();
            }
        }
    });

    // start rendering the table
    renderTable();
});
