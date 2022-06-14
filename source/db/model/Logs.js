// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, field, readonly} from '@nozbe/watermelondb/decorators';

export default class Logs extends Model {
  static table = 'logs';

  @field('message') message;
  @field('picture') picture;
  @field('video') video;
  @field('latitude') latitude;
  @field('longitude') longitude;
  @field('placename') placename;
  @field('section') section;
  @field('group') group;
  @field('date') date;
  @field('isEditting') isEditting;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
