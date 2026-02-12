import express from "express";
import cors from "cors";
import {Pool} from "pg";

const app = express();
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false
  }
});

app.get("/itemList",async(req,res)=>{
  try{
    const itemList = await pool.query("SELECT * FROM products");
    res.json(itemList.rows);
  }catch (e) {
    console.log(e);
  }
});

app.listen(process.env.PORT||3000,()=>{
  console.log(`Server running on port ${process.env.PORT||3000}`);
});




