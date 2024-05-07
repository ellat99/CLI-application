// sunt importate pentru a lucra cu sistemul de fisiere si pentru a gestiona caile de fisiere
const fs = require("fs");
const path = require("path");

//se creează calea catre fisierul de contacte folosind path.join
const contactsPath = path.join(__dirname, "db", "contacts.json");

//citeste fișierul de contacte, folosind fs.readFile()
const listContacts = function () {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);

      return;
    }
    //cand cititrea e gata se converteste din ofrmatul json intr un obiect js
    const contacts = JSON.parse(data);

    console.table(contacts);
  });
};

//functia primeste un ID de contact si cauta in fisierul de contacte contactul corespunzator.
//Daca gaseste contactul, il afiseaza folosind console.table(), altfel afiseaza un mesaj ca contactul nu a fost gasit.
const getContactById = function (contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);

      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);

    if (contact) console.table([contact]);
    else console.log("Contact not found!");
  });
};

//Această funcție citește fișierul de contacte și filtrează contactele pentru a elimina contactul cu ID-ul specificat.
//Apoi, reatribuie ID-urile contactelor rămase pentru a asigura o ordine consecutivă.
//După aceea, rescrie fișierul de contacte cu contactele rămase și afișează lista actualizată a contactelor.
const removeContact = function (contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);

      return;
    }

    const contacts = JSON.parse(data);
    const removeContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    removeContacts.forEach((contact, i) => (contact.id = `${i + 1}`));

    fs.writeFileSync(
      contactsPath,
      JSON.stringify(removeContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);

          return;
        }

        console.log(
          `Contact with the id ${contactId} has been removed successfully!`
        );
      }
    );

    listContacts();
  });
};

//Această funcție citește fișierul de contacte, adaugă un nou contact cu informațiile primite ca parametri și rescrie fișierul de contacte cu lista actualizată de contacte.
// Apoi, afișează lista actualizată a contactelor.

const addContact = function (name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);

      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    const updatedContacts = [...contacts, newContact];

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error(err);

          return;
        }

        console.log("Contact added successfully");
      }
    );

    listContacts();
  });
};

module.exports = { listContacts, getContactById, removeContact, addContact };
