module.exports = function (sequelize, DataTypes) {
    return sequelize.define('other_score', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        expert_score:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        computer_score:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        member:{
            type: DataTypes.STRING(255),
            allowNull: false, defaultValue: '1'
        }
    }, {
      tableName: 'other_score'
    })
  }
  