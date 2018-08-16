module.exports = function (sequelize, DataTypes) {
    return sequelize.define('score', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        headimgurl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        openid:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        score:{
            type: DataTypes.STRING(255),
            allowNull: false, defaultValue: '0'
        },
        member:{
            type: DataTypes.STRING(255),
            allowNull: false, defaultValue: '1'
        }
    }, {
      tableName: 'score'
    })
  }
  