/* 
Tabla call tiene llaves foraneas 
*/

import { Model } from "sequelize";

const fkName = "call_id";

interface ModelAttributes {
  call_id: number;
  duration: number;
  video_url: string;
  transcription_url: string;
  rating: number;
  processed: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Call extends Model<ModelAttributes> implements ModelAttributes {
    call_id!: number;
    duration!: number;
    video_url!: string;
    transcription_url!: string;
    rating!: number;
    processed!: Date;

    static associate(models: any) {
      Call.belongsToMany(models.Problem_category, {
        through: "Call-Problem_category",
        foreignKey: fkName,
      });

      Call.belongsTo(models.Client, { foreignKey: "client_id" });
      Call.belongsTo(models.User, { foreignKey: "agent_id" });
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
        validate: {
          min: 1,
        },
      },
      video_url: {
        type: DataTypes.TEXT,
      },
      transcription_url: {
        type: DataTypes.TEXT,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      processed: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Call",
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
  return Call;
};
