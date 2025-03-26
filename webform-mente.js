// This file contains general utility functions for the form

// Function to set the current date and time in the timestamp field
function setTimestamp() {
  const timestampField = document.getElementById("timestamp")
  if (timestampField) {
    timestampField.value = new Date().toISOString()
  }
}

// Function to validate email format
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(String(email).toLowerCase())
}

// Function to validate name (only letters and spaces)
function validateName(name) {
  const re = /^[A-Za-z\s]+$/
  return re.test(String(name))
}

// Function to validate the entire form
function validateForm() {
  // Get form values
  const colorValue = document.querySelector('input[name="A"]:checked')?.value
  const animalValue = document.querySelector('input[name="B"]:checked')?.value
  const hobbyValue = document.querySelector('input[name="C"]:checked')?.value
  const nameValue = document.getElementById("nome")?.value
  const emailValue = document.getElementById("email")?.value

  // Check if all required fields are filled
  if (!colorValue) {
    alert("Por favor, selecione uma cor favorita.")
    return false
  }

  if (!animalValue) {
    alert("Por favor, selecione um animal favorito.")
    return false
  }

  if (!hobbyValue) {
    alert("Por favor, selecione um hobby favorito.")
    return false
  }

  if (!nameValue || !validateName(nameValue)) {
    alert("Por favor, insira um nome válido (apenas letras e espaços).")
    return false
  }

  if (!emailValue || !validateEmail(emailValue)) {
    alert("Por favor, insira um email válido.")
    return false
  }

  return true
}

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial timestamp
  setTimestamp()

  // Add form validation before submission
  const form = document.getElementById("myForm")
  if (form) {
    form.addEventListener("submit", (event) => {
      if (!validateForm()) {
        event.preventDefault()
      } else {
        // Update timestamp before submission
        setTimestamp()
      }
    })
  }
})

