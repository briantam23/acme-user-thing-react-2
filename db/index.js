const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-user-thing-react-2', { logging: true });

const User = conn.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Thing = conn.define('thing', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const UserThing = conn.define('userThing', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.hasMany(UserThing);
Thing.hasMany(UserThing);
UserThing.belongsTo(User);
UserThing.belongsTo(Thing);

const syncAndSeed = () => {
    let moe, larry, curly, shep, joe, foo, bar, bazz;
    conn.sync({ force: true })
        .then(() => Promise.all([
            User.create({ name: 'moe' }),
            User.create({ name: 'larry' }),
            User.create({ name: 'curly' }),
            User.create({ name: 'shep' }),
            User.create({ name: 'joe' })
        ]))
        .then(users => {
            [moe, larry, curly, shep, joe] = users;
            return Promise.all([
                Thing.create({ name: 'foo' }),
                Thing.create({ name: 'bar' }),
                Thing.create({ name: 'bazz' })
            ])
        })
        .then(things => {
            [foo, bar, bazz] = things;
        })
}

module.exports = {
    syncAndSeed,
    models: {
        User,
        Thing,
        UserThing
    }
}