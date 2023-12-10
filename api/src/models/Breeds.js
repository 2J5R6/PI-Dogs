const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('breeds', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    image: {
      type: DataTypes.JSON, // Imagen como objeto JSON
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.JSON, // Altura como objeto JSON (cm)
      allowNull: false
    },
    weight: {
      type: DataTypes.JSON, // Peso como objeto JSON (kg)
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING, // Años de vida como string
      allowNull: false,
    },
    description: { // La descripción
      type: DataTypes.TEXT, 
      allowNull: true // Hacerlo opcional
    }
  },{ timestamps: false });
};
