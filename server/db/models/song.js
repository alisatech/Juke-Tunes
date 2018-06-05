'use strict';

const _ = require('lodash');

const db = require('../db');
const DataTypes = db.Sequelize;

const Song = db.define('song', {
  name: {
    type: DataTypes.STRING(1e4),
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  genre: {
    type: DataTypes.STRING
  },
  audioUrl: {
    type: DataTypes.VIRTUAL,
    get: function () {
      return `/api/songs/${this.id}/audio`
    }
  },

  url: {
    type: DataTypes.STRING(1e4),
    allowNull: false
  },
}, {
    defaultScope: {
      attributes: {
        include: ['albumId'],
      },
    },
    scopes: {
      populated: () => ({
        include: [{
          model: db.model('artist')
        }]
      })
    }
  });

Song.prototype.toJSON = function () {
  return _.omit(this.get(), ['url']);
}

module.exports = Song;
