module.exports = function (sequelize, DataTypes) {
    return sequelize.define('score', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        score:{
            type: DataTypes.STRING(255),
            allowNull: false, defaultValue: '0'
        },
        member:{
            type: DataTypes.STRING(255),
            allowNull: false, defaultValue: 'member-1'
        }
    }, {
      tableName: 'score'
    })
  }
  