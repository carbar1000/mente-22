import { getSupabase } from "./supabase-config.js"

// Function to show flash messages
function showFlashMessage(message, type = "info") {
  const flashMessage = document.getElementById("flashMessage")
  flashMessage.textContent = message
  flashMessage.className = `flash-message ${type} show`

  // Hide the message after 5 seconds
  setTimeout(() => {
    flashMessage.className = "flash-message"
  }, 5000)
}

// Function to collect all form data
function collectFormData(form) {
  const formData = new FormData(form)
  const timestamp = new Date().toISOString()
  formData.set("timestamp", timestamp)

  // Convert FormData to a regular object
  const data = {}
  for (const [key, value] of formData.entries()) {
    data[key] = value
  }

  return data
}

// Function to submit form data to Supabase
async function submitToSupabase(data) {
  try {
    // Obter cliente Supabase
    const supabase = await getSupabase()

    if (!supabase) {
      throw new Error("Cliente Supabase não inicializado")
    }

    console.log("Enviando dados para a tabela respostas:", data)

    // Send data to the "respostas" table
    const { data: insertedData, error } = await supabase.from("respostas").insert([data])

    if (error) {
      console.error("Erro do Supabase:", error)
      throw error
    }

    console.log("Dados inseridos com sucesso:", insertedData)
    return { success: true, data: insertedData }
  } catch (error) {
    console.error("Error submitting to Supabase:", error)
    return { success: false, error: error.message }
  }
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault()

  const form = event.target
  const submitButton = form.querySelector('button[type="submit"]')

  // Disable submit button during submission
  if (submitButton) {
    submitButton.disabled = true
    submitButton.textContent = "Enviando..."
  }

  try {
    // Collect form data
    const formData = collectFormData(form)

    // Log the data being sent (for debugging)
    console.log("Preparando para enviar dados:", formData)

    // Submit to Supabase
    const result = await submitToSupabase(formData)

    if (result.success) {
      showFlashMessage("Formulário enviado com sucesso!", "success")
      form.reset()

      // Redirect to thank you page
      setTimeout(() => {
        window.location.href = "obrigado.html"
      }, 1000)
    } else {
      showFlashMessage(`Erro ao enviar formulário: ${result.error}`, "error")

      // Re-enable submit button
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = "Enviar formulário"
      }
    }
  } catch (error) {
    console.error("Form submission error:", error)
    showFlashMessage("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.", "error")

    // Re-enable submit button
    if (submitButton) {
      submitButton.disabled = false
      submitButton.textContent = "Enviar formulário"
    }
  }
}

// Add event listener to the form when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm")

  if (form) {
    form.addEventListener("submit", handleFormSubmit)

    // Set timestamp when form is submitted
    form.addEventListener("submit", () => {
      document.getElementById("timestamp").value = new Date().toISOString()
    })
  }
})

// Export functions for potential use in other modules
export { showFlashMessage, submitToSupabase }

