import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required." }),
      { status: 400 }
    );
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('linktree');

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      client.close();
      return new Response(
        JSON.stringify({ message: "User already exists." }),
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    client.close();
    return new Response(JSON.stringify({ message: "User created!" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating user." }),
      { status: 500 }
    );
  }
}
