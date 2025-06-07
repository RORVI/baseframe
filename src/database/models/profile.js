const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: { type: Sequelize.STRING, allowNull: false },
        lastName: { type: Sequelize.STRING, allowNull: false },
        profession: { type: Sequelize.STRING, allowNull: false },
        balance: { type: Sequelize.DECIMAL(12, 2) },
        type: { type: Sequelize.ENUM('client', 'contractor') }
    });

    return Profile;
};
