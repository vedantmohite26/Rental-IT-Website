const path=require('path');
const sqlite3=require(path.join(__dirname,'RentIT_Backend','node_modules','sqlite3')).verbose();
const db=new sqlite3.Database(path.join(__dirname,'RentIT_Backend','database','rentit.db'));
db.all('SELECT product_id,owner_id,name,category,price,deposit,rentUnit,quantity FROM products',(e,r)=>{
  console.log('PRODUCTS:',JSON.stringify(r,null,1));
  db.all('SELECT * FROM orders',(e2,r2)=>{
    console.log('ORDERS:',JSON.stringify(r2,null,1));
    db.all('SELECT owner_id,name,email FROM owners',(e3,r3)=>{
      console.log('OWNERS:',JSON.stringify(r3,null,1));
      db.close();
    });
  });
});
