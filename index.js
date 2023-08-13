const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const contactToRemove = await removeContact(id);
      console.log(contactToRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// async function allContacts() {
//   const contacts = await listContacts();
//   console.table(contacts);
// }

// async function contactById(id) {
//   const contact = await getContactById(id);
//   console.log(contact);
// }

// async function removeContactById(id) {
//   const contact = await removeContact(id);
//   console.log(contact);
// }

// async function addNewContact(name, email, phone) {
//   const newContact = await addContact(name, email, phone);
//   console.log(newContact);
// }

// allContacts();
