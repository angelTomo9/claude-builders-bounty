function diffSchemas(oldSchema, newSchema) {
  const upSql = [];
  const downSql = [];

  // Table creation / deletion
  for (const tableName in newSchema) {
    if (!oldSchema[tableName]) {
      const cols = Object.entries(newSchema[tableName])
        .map(([name, type]) => `  ${name} ${type}`)
        .join(',\n');
      upSql.push(`CREATE TABLE ${tableName} (\n${cols}\n);`);
      downSql.push(`DROP TABLE IF EXISTS ${tableName};`);
    } else {
      // Column additions
      for (const colName in newSchema[tableName]) {
        if (!oldSchema[tableName][colName]) {
          const type = newSchema[tableName][colName];
          upSql.push(`ALTER TABLE ${tableName} ADD COLUMN ${colName} ${type};`);
          downSql.push(`ALTER TABLE ${tableName} DROP COLUMN IF EXISTS ${colName};`);
        }
      }
    }
  }

  // Dropped tables
  for (const tableName in oldSchema) {
    if (!newSchema[tableName]) {
      upSql.push(`DROP TABLE IF EXISTS ${tableName};`);
      const cols = Object.entries(oldSchema[tableName])
        .map(([name, type]) => `  ${name} ${type}`)
        .join(',\n');
      downSql.push(`CREATE TABLE ${tableName} (\n${cols}\n);`);
    }
  }

  return { up: upSql.join('\n\n'), down: downSql.join('\n\n') };
}

module.exports = { diffSchemas };