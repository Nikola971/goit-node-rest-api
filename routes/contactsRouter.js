import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';
import { addContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';
import validateBody from '../decorators/validateBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:id', contactsControllers.getById);

contactsRouter.post('/', validateBody(addContactSchema), contactsControllers.addContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), contactsControllers.updateContact);

contactsRouter.delete('/:id', contactsControllers.deleteContact);

export default contactsRouter;
