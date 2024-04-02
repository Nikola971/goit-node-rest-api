import { listContacts, getContactById, removeContact, addContact, updateContact } from "../services/contactsServices.js";
import { validateBody } from '../helpers/validateBody';
import HttpError from '../helpers/HttpError';

export const getAllContacts = (req, res, next) => {
    try {
        const contacts = listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(new HttpError(500, error.message));
    }
};

export const getOneContact = (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = getContactById(id);
        if (!contact) {
            return next(new HttpError(404, 'Not found'));
        }
        res.status(200).json(contact);
    } catch (error) {
        next(new HttpError(500, error.message));
    }
};

export const deleteContact = (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedContact = removeContact(id);
        if (!deletedContact) {
            return next(new HttpError(404, 'Not found'));
        }
        res.status(200).json(deletedContact);
    } catch (error) {
        next(new HttpError(500, error.message));
    }
};

export const createContact = (req, res, next) => {
    try {
        validateBody(req.body, next);
        const { name, email, phone } = req.body;
        const newContact = addContact(name, email, phone);
        res.status(201).json(newContact);
    } catch (error) {
        next(new HttpError(400, error.message));
    }
};

export const updateContact = (req, res, next) => {
    try {
        const { id } = req.params;
        if (Object.keys(req.body).length === 0) {
            return next(new HttpError(400, 'Body must have at least one field'));
        }
        validateBody(req.body, next);
        const updatedContact = updateContact(id, req.body);
        if (!updatedContact) {
            return next(new HttpError(404, 'Not found'));
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(new HttpError(400, error.message));
    }
};
