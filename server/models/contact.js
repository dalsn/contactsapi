/* eslint quote-props: 0 */
/* eslint sort-keys: 0 */
/* eslint max-len: 0 */
/* eslint no-sync: 1 */
/* eslint no-magic-numbers: 1 */

"use strict";

module.exports = (sequelize, DataTypes) => {

    const Contact = sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starred: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER
        }
    }, {});
    Contact.associate = (models) => {

        Contact.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });

    };
    return Contact;

};
