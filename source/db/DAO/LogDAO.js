import {database} from '..';

export const logs = database.get('logs');

export const observeLogs = () => logs.query();
export const addLog = async ({
  message,
  picture,
  video,
  latitude,
  longitude,
  placename,
  section,
  group,
  date,
  isEditting,
}) => {
  const newLog = await database.write(async () => {
    const log = await database.get('logs').create(entry => {
      entry.message = message;
      entry.picture = picture;
      entry.video = video;
      entry.latitude = latitude;
      entry.longitude = longitude;
      entry.placename = placename;
      entry.section = section;
      entry.group = group;
      entry.picture = picture;
      entry.date = date;
      entry.isEditting = isEditting;
    });
    return log;
  });
  return newLog;
};

export const deleteLog = async id => {
  await database.write(async () => {
    database
      .get('logs')
      .find(id)
      .then(log => {
        log
          .destroyPermanently()
          .then(m => console.log('deleted ', m))
          .catch(e => console.log('delete error ', e));
      })
      .catch(e => console.log('find error ', e));
  });
};

export const updateLog = async ({
  message,
  picture,
  video,
  latitude,
  longitude,
  placename,
  section,
  group,
  date,
  isEditting,
  id,
}) => {
  const upLog = await database.write(async () => {
    const log = await database
      .get('logs')
      .find(id)
      .then(log => {
        log
          .update(entry => {
            entry.message = message;
            entry.picture = picture;
            entry.video = video;
            entry.latitude = latitude;
            entry.longitude = longitude;
            entry.placename = placename;
            entry.section = section;
            entry.group = group;
            entry.picture = picture;
            entry.date = date;
            entry.isEditting = isEditting;
          })
          .then(m => console.log('updated ', m))
          .catch(e => console.log('delete error ', e));
      })
      .catch(e => console.log('find error ', e));
    return log;
  });
  return upLog;
};
