'use strict';

const Playlist = require('./playlist');
const Artist = require('./artist');
const Album = require('./album');
const Song = require('./song');


Song.belongsTo(Album);
Album.hasMany(Song);
Album.belongsTo(Artist);

Artist.belongsToMany(Song, { through: 'artistSong' });
Song.belongsToMany(Artist, { through: 'artistSong' });

Song.belongsToMany(Playlist, { through: 'playlistSong' });
Playlist.belongsToMany(Song, { through: 'playlistSong' });


module.exports = {
  Album: Album,
  Song: Song,
  Artist: Artist,
  Playlist: Playlist
};
