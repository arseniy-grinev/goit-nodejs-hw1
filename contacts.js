const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

// return all contacts
async function listContacts() {
  return await readDb();
}

// returns contact object by id or null (if id didn't find)
async function getContactById(contactId) {
  const db = await readDb();
  const findContact = db.find((contact) => contact.id === contactId);
  if (!findContact) {
    return null;
  }
  return findContact;
}

//returns object of contact deleted by id, owerwrite db or null
async function removeContact(contactId) {
  const db = await readDb();
  const delContact = db.find((contact) => contact.id === contactId);
  if (!delContact) {
    return null;
  }
  const editDb = db.filter((contact) => contact.id !== contactId);
  await writeDb(editDb);
  return delContact;
}

async function addContact(name, email, phone) {
  const id = nanoid(21);
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const db = await readDb();
  db.push(newContact);
  await writeDb(db);
  return newContact;
}

// reading & parse db file
async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  return JSON.parse(dbRaw);
}

// write db array to json file
async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
