import { Model } from "sequelize";

interface ModelAttributes {
  id: number;
  duration: number;
  video_url: string;
  transcription: string;
  rating: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Call extends Model<ModelAttributes> implements ModelAttributes {
    id!: number;
    duration!: number;
    video_url!: string;
    transcription!: string;
    rating!: number;

    static associate(models: any) {
      //Call.belongsTo(models.Client);
      //Call.belongsTo(models.Agent);
    }
  }

  Call.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video_url: {
        type: DataTypes.TEXT,
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
