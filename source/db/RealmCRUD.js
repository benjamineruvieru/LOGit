import {Logs} from './schema';
import Realm from 'realm';

export const getDb = async () => {
  const realm = await Realm.open({
    schema: [Logs],
  });

  const logs = realm.objects('Logs');
  return {logs, realm};
};

export const createLog = async ({
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
  const realm = await Realm.open({
    schema: [Logs],
  });
  realm.write(() => {
    realm.create('Logs', {
      _id: date,
      message: message,
      date: date,
      isEditting: isEditting,
      picture: picture,
      video: video,
      latitude: latitude,
      longitude: longitude,
      placename: placename,
      section: section,
      group: group,
    });
  });
};

export const updateLog = async ({
  id,
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
  const realm = await Realm.open({
    schema: [Logs],
  });
  const entry = realm.objects('Logs').filtered('_id == ' + id);
  console.log(entry);
  realm.write(() => {
    entry[0].message = message;
    entry[0].picture = picture;
    entry[0].video = video;
    entry[0].latitude = latitude;
    entry[0].longitude = longitude;
    entry[0].placename = placename;
    entry[0].section = section;
    entry[0].group = group;
    entry[0].picture = picture;
    entry[0].date = date;
    entry[0].isEditting = isEditting;
  });
};

export const deleteEntireDB = async () => {
  const realm = await Realm.open({
    schema: [Logs],
  });
  realm.write(() => {
    Realm.deleteAll();
  });
};
