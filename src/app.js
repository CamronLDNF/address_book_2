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
        <div class ="card max-w-sm rounded overflow-hidden shadow-md mt-5">
          <div class="content px-6 py-4">
            <p class="font-bold text-xl mb-2">${ contact.name }</h1>
            <p class="text-grey-darker text-base font-semibold mb-1">${ contact.company }</h2>
            <p class="text-grey-darker text-base">${ contact.notes }</p>
          </div>
          <div class="px-6 py-4 text-sm text-grey-darkest">
            ${ contact.email } |
            <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
          </div>
        </div>
      `
      ul.className = 'list-reset'; 
      ul.appendChild(li)
    })

    div.appendChild(ul)
  } else {
    div.innerHTML = '<p class="mt-5 italic text-grey-darker text-base font-normal">You have no contacts in your address book</p>'
  }

}

document.addEventListener('DOMContentLoaded', () => {
  renderContacts()
  const contactForm = document.querySelector('.new-contact-form')

  contactForm.addEventListener('submit', event => {
    event.preventDefault()

    // NOTE: this is destructuring, assigning variable names to the corresponding elements
    const { name, email, phone, company, notes, twitter } = contactForm.elements

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

