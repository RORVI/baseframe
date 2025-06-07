const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerSpec = require('../docs/swagger');

const outputPath = path.join(__dirname, '../docs/openapi.yaml');
const yamlStr = yaml.dump(swaggerSpec);

fs.writeFileSync(outputPath, yamlStr, 'utf8');
console.log('OpenAPI spec regenerated at', outputPath);
