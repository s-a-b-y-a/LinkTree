import { MongoClient } from "mongodb";

export async function POST(req) {
  const { email } = await req.json();

  const uri = process.env.MONGODB_URI;
  const client = await MongoClient.connect(uri);
  const db = client.db("linktree");

  try {
    const existingUser = await db.collection("users").findOne({ email });

    if (!existingUser) {
      return new Response(JSON.stringify({ error: "User doesn't exist" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  } finally {
    client.close();
  }
}
