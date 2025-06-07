const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database/models');
const getProfile = require('./middleware/getProfile');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const { express: voyagerMiddleware } = require('graphql-voyager/middleware');

const contractRoutes = require('./routes/contracts');
const jobRoutes = require('./routes/jobs');
const balanceRoutes = require('./routes/balances');
const adminRoutes = require('./routes/admin');
const applyApollo = require('./graphql');

const app = express();
app.use(bodyParser.json());

// Sequelize and Models injection
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

// Load routes
app.use('/contracts', getProfile, contractRoutes);
app.use('/jobs', getProfile, jobRoutes);
app.use('/balances', getProfile, balanceRoutes);
app.use('/admin', getProfile, adminRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

(async () => {
    await applyApollo(app);
})();

module.exports = app;
