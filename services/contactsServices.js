import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.join("db", "contacts.json");

const getList = async () => {
    const response = await fs.readFile(contactsPath);
    return JSON.parse(response);
};

const getContact = async (contactId) => {
    const contact = (await getList()).find((contact) => contact.id === contactId);
    return contact;
};

export async function listContacts() {
    try {
        return await getList();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getContactById(contactId) {
    try {
        const responseId = await getContact(contactId);
        return responseId ? responseId : null;
    } catch (error) {
        console.log(error.message);
    }
}

export async function removeContact(contactId) {
    try {
        const contactToRemove = await getContact(contactId);
        const newContactList = (await getList()).filter((contact) => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newContactList));
        return contactToRemove ? contactToRemove : null;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addContact(name, email, phone) {
    const ID = crypto.randomUUID();
    try {
        const newContact = {
            id: ID,
            name: name,
            email: email,
            phone: phone,
        };
        let response = await getList();
        response.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(response));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
}