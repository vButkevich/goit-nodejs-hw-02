import cors from 'cors';
import pino from 'pino-http';
import express from 'express';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));
  const app = express();

  app.use((req, res, next) => {
    console.log('-^-'.repeat(33));
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'goit-nodejs-hw-02',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      // count: contacts.length,
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    if (contactId.length != 24) {
      res.status(400).json({
        status: 400,
        message: `ContactId:[${contactId}] is invalid`,
        data: [],
      });
      return;
    }

    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: 404,
        message: `Contact not found with id:[${contactId}]`,
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id:[${contactId}]`,
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 400,
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port:[${PORT}]`);
  });
};
