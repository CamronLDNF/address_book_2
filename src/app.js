document.addEventListener('DOMContentLoaded', () => {

  const addContactForm = document.querySelector('.new-contact-form')

  addContactForm.addEventListener('submit', event => {
    event.preventDefault()
    const storage = window.localStorage

    const {    // NOTE: this is destructuring, assigning variable names to the corresponding elements
      name,
      email,
      phone,
      company,
      notes,
      twitter,
    } = addContactForm.elements

    const contact = {   // NOTE: and this creates a hash object, with key:value pairs
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value,
    }

    console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
    storage.setItem('contacts', JSON.stringify([contact]))
  })

})