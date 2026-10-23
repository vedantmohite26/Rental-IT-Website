const path = require('path');
const sqlite3 = require(path.join(__dirname, 'RentIT_Backend', 'node_modules', 'sqlite3')).verbose();
const db = new sqlite3.Database(path.join(__dirname, 'RentIT_Backend', 'database', 'rentit.db'));

db.all("SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name", (e, rows) => {
  if (e) { console.error('ERR', e.message); process.exit(1); }
  rows.forEach(t => {
    console.log('=== ' + t.name + ' ===');
    console.log(t.sql);
  });
  const tables = rows.map(r => r.name);
  let i = 0;
  const next = () => {
    if (i >= tables.length) { db.close(); return; }
    const t = tables[i++];
    db.all('SELECT * FROM "' + t + '" LIMIT 4', (e2, r2) => {
      console.log('\n--- ' + t + ' (sample) ---');
      console.log(JSON.stringify(r2, null, 1));
      next();
    });
  };
  next();
});
