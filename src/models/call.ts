/* 
Tabla call tiene llaves foraneas 
*/

import { Model } from "sequelize";

interface ModelAttributes {
  call_id: number;
  duration: number;
  video_url: string;
  transcription: string;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Call extends Model<ModelAttributes> implements ModelAttributes {
    call_id!: number;
    duration!: number;
    video_url!: string;
    transcription!: string;
    rating!: number;

    static associate(models: any) {
      
      Call.belongsToMany(models.Problem, { through: 'Call-Problem' })
      
      Call.belongsTo(models.Client);
      Call.belongsTo(models.Agent);
    
    }
  }

  Call.init(
    {
      call_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      video_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      transcription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Call",
    }
  );
  return Call;
};
