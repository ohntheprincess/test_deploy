// app/api/allBrand/route.js
import { BigQuery } from '@google-cloud/bigquery';

// สร้าง BigQuery Client
const bigQuery = new BigQuery();

export async function GET(request) {
  try {
    // เขียนคำสั่ง SQL เพื่อดึงข้อมูลจาก BigQuery
    const query = `SELECT * FROM \`bit15-ev-decision-support.EV_Dataset.EV_Brands\``;
    const options = {
      query: query,
      location: 'asia-southeast1', // เปลี่ยนเป็น asia-southeast1
    };

    // รัน query
    const [rows] = await bigQuery.query(options);

    // ส่งผลลัพธ์กลับไปที่ Frontend
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('BigQuery error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from BigQuery' }),
      { status: 500 }
    );
  }
}
