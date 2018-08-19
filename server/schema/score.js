module.exports = function (sequelize, DataTypes) {
    return sequelize.define('score', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        openid:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        score:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        nickname:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        headimgurl:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        member:{
            type: DataTypes.STRING(255),
            allowNull: false, defaultValue: '1'
        }
    }, {
      tableName: 'score'
    })
  }
  