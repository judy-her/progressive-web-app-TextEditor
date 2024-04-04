import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database, use POST
export const putDb = async (content) => {
  console.log('Putting data into the database');
  try {
    // Open the database
    const db = await openDB('jate', 1);

    // Open a transaction on the 'jate' object store with readwrite mode
    const tx = db.transaction('jate', 'readwrite');

    // Get the 'jate' object store
    const store = tx.objectStore('jate');

    // Add the content to the object store
    await store.add({ content });

    // Complete the transaction
    await tx.done;

    console.log('Data added to IndexedDB');
  } catch (error) {
    console.error('Error adding data to IndexedDB:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  try {
    // Create a connection to the database and specify the version.
    const contactDb = await openDB('contact', 1);

    // Create a new transaction and specify read-only privileges.
    const tx = contactDb.transaction('contact', 'readonly');

    // Open the desired object store.
    const store = tx.objectStore('contact');

    // Use the .getAll() method to retrieve all data in the database.
    const request = store.getAll();

    // Get the result of the request.
    const result = await request;
    console.log('Retrieved data:', result);

    // Return the result
    return result;
  } catch (error) {
    console.error('Error retrieving data from IndexedDB:', error);
    return null;
  }
};

initdb();
