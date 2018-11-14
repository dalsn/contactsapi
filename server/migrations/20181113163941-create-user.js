/* eslint quote-props: 0 */
/* eslint sort-keys: 0 */

"use strict";

module.exports = {

    up: (queryInterface, Sequelize) => queryInterface.createTable("Users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        loggedin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),

    down: (queryInterface) => queryInterface.dropTable("Users")

};
