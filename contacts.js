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
  await fs.writeFile(contactsPath, data);
}

async function listContacts() {
  const data = await loadData();
  return data;
}

async function getContactById(contactId) {
  const data = await loadData();
  return data.find((el) => el.id === String(contactId)) || null;
}

async function removeContact(contactId) {
  const data = await loadData();
  await saveData(
    JSON.stringify(
      data.filter((el) => el.id !== String(contactId)),
      null,
      2
    )
  );
  return "done";
}

async function addContact(name, email, phone) {
  const data = await loadData();
  const id = uuidv4();
  data.push({ id, name, email, phone });
  const answer = await saveData(JSON.stringify(data, null, 2));
  return await getContactById(id);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
