function generateSampleFromSchema(schema, components = {}) {
  if (!schema) return null;

  // Resolve $ref
  if (schema.$ref) {
    const refPath = schema.$ref.replace(/^#\/components\/schemas\//, '');
    if (components.schemas && components.schemas[refPath]) {
      return generateSampleFromSchema(components.schemas[refPath], components);
    }
  }

  if (schema.enum && Array.isArray(schema.enum)) {
    return schema.enum[0];
  }

  if (schema.example !== undefined) {
    return schema.example;
  }

  switch (schema.type) {
    case 'string':
      if (schema.format === 'uuid') return '123e4567-e89b-12d3-a456-426614174000';
      if (schema.format === 'email') return 'user@example.com';
      if (schema.format === 'uri') return 'https://api.example.com/v1/resource';
      if (schema.format === 'date-time') return new Date().toISOString();
      return 'sample_text';

    case 'integer':
    case 'number':
      return schema.minimum !== undefined ? schema.minimum : 42;

    case 'boolean':
      return true;

    case 'array':
      const itemSample = schema.items ? generateSampleFromSchema(schema.items, components) : 'item';
      return [itemSample, itemSample];

    case 'object':
    default:
      if (schema.properties) {
        const obj = {};
        for (const propName in schema.properties) {
          obj[propName] = generateSampleFromSchema(schema.properties[propName], components);
        }
        return obj;
      }
      return {};
  }
}

function parseOpenApiAndGenerateEndpoints(spec) {
  const routes = [];
  const paths = spec.paths || {};

  for (const pathStr in paths) {
    const pathItem = paths[pathStr];
    for (const method in pathItem) {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
        const operation = pathItem[method];
        const successResp = (operation.responses && (operation.responses['200'] || operation.responses['201'])) || {};
        const content = (successResp.content && successResp.content['application/json']) || {};
        const schema = content.schema;

        routes.push({
          method: method.toUpperCase(),
          path: pathStr,
          summary: operation.summary || '',
          mockResponse: generateSampleFromSchema(schema, spec.components)
        });
      }
    }
  }

  return routes;
}

module.exports = { generateSampleFromSchema, parseOpenApiAndGenerateEndpoints };