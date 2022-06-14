// model/schema.js
import {appSchema, tableSchema} from '@nozbe/watermelondb';

const schema = appSchema({
  version: 5,
  tables: [
    tableSchema({
      name: 'logs',
      columns: [
        {name: 'message', type: 'string', isOptional: true},
        {name: 'picture', type: 'string', isOptional: true},
        {name: 'video', type: 'string', isOptional: true},
        {name: 'latitude', type: 'string', isOptional: true},
        {name: 'longitude', type: 'string', isOptional: true},
        {name: 'placename', type: 'string', isOptional: true},
        {name: 'section', type: 'string', isOptional: true},
        {name: 'group', type: 'string', isOptional: true},
        {name: 'isEditting', type: 'boolean'},
        {name: 'date', type: 'number', isOptional: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
  ],
});

export default schema;
