const fs = require("fs").promises;
const { writeFile } = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function loadData() {
  const file = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(file) || [];
}

async function saveData(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await loadData();
  return data;
}

async function getContactById(contactId) {
  const data = await loadData();
  const contact = data.find((el) => el.id === String(contactId));
  return contact || null;
}

async function removeContact(contactId) {
  const data = await loadData();
  const index = data.findIndex(({ id }) => id === String(contactId));
  if (index === -1) return null;
  const [contact] = data.splice(index, 1);
  await saveData(data);
  return contact;
}

async function addContact(name, email, phone) {
  const data = await loadData();
  const id = uuidv4();
  const contact = { id, name, email, phone };
  data.push(contact);
  await saveData(data);
  return contact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
