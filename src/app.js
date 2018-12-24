const storage = window.localStorage

const renderContacts = () => {
  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts) {     // i.e. if this evaluates to true and there are contacts, then...
    div.innerHTML = ''

    const ul = document.createElement('ul')

    contacts.forEach(contact => {
      let li = document.createElement('li')
      li.innerHTML = `
        <div class ="card">
          <div class="content">
            <h1>${ contact.name }</h1>
            <h2>${ contact.company }</h2>
            <p>${ contact.notes }</p>
            ${ contact.email } |
            <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
          </div>
        </div>
      `
      ul.appendChild(li)
    })

    div.appendChild(ul)
  } else {
    div.innerHTML = '<p>You have no contacts in your address book</p>'
  }

}

document.addEventListener('DOMContentLoaded', () => {
  renderContacts()

  const addContactForm = document.querySelector('.new-contact-form')

  addContactForm.addEventListener('submit', event => {
    event.preventDefault()

    // NOTE: this is destructuring, assigning variable names to the corresponding elements
    const { name, email, phone, company, notes, twitter } = addContactForm.elements

    const contact = {   // NOTE: and this creates a hash object, with key:value pairs
      id: Date.now(),
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value,
    }

    let contacts = JSON.parse(storage.getItem('contacts')) || []
    contacts.push(contact)

    // console.log(`Saving the following contact: ${JSON.stringify(contact)}`)
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
    contactForm.reset()
  })

})
