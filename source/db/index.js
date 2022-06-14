import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import Logs from './model/Logs';
import schema from './schema';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  //migrations,
  dbName: 'logitdb',
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [Logs],
});
