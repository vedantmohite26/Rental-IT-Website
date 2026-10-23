const path = require('path');
const sqlite3 = require(path.join(__dirname, 'RentIT_Backend', 'node_modules', 'sqlite3')).verbose();

const dbPath = path.join(__dirname, 'RentIT_Backend', 'database', 'rentit.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('DB open error:', err.message);
        process.exit(1);
    }

    db.all("SELECT name, type FROM sqlite_master WHERE type IN ('table','index') ORDER BY type, name", (e, rows) => {
        if (e) {
            console.error(e.message);
            process.exit(1);
        }

        const tables = rows.filter((r) => r.type === 'table');
        console.log('=== TABLES ===');
        tables.forEach((t) => console.log(' -', t.name));

        let pending = tables.length;

        if (!pending) {
            db.close();
            return;
        }

        tables.forEach((t) => {
            db.all(`SELECT sql FROM sqlite_master WHERE name = ?`, [t.name], (err, s) => {
                console.log(`\n=== ${t.name} ===`);
                console.log(s && s[0] ? s[0].sql : '(no sql)');
                db.all(`SELECT COUNT(*) AS c FROM "${t.name}"`, (e2, r2) => {
                    console.log('rows:', e2 ? e2.message : r2[0].c);
                    if (--pending === 0) {
                        console.log('\n=== SAMPLE DATA (max 5 rows per table) ===');
                        tables.forEach((tt) => {
                            db.all(`SELECT * FROM "${tt.name}" LIMIT 5`, (e3, r3) => {
                                console.log(`\n--- ${tt.name} ---`);
                                console.log(JSON.stringify(r3, null, 1));
                            });
                        });
                        setTimeout(() => db.close(), 500);
                    }
                });
            });
        });
    });
});
