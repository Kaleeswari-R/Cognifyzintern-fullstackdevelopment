// app.js
document.addEventListener('DOMContentLoaded', () => {
  const studentForm = document.getElementById('student-form');
  
  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(studentForm);
    const studentData = {};
    formData.forEach((value, key) => {
      studentData[key] = value;
    });
    fetch('/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to add student');
      }
    })
    .then(data => {
      alert('Student added successfully!');
      studentForm.reset();
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
  };

  // Event listener for form submission
  studentForm.addEventListener('submit', handleFormSubmit);
});
