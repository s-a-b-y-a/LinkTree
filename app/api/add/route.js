import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise
  const db = client.db("linktree");
  const collection = db.collection("links");

  // if the handle is already claimed
  const doc = await collection.findOne({handle: body.handle})

  if(doc){
    return Response.json({
      message: "Linktree already exists!",
      success: false,
      error: true,
      result: null,
    });
  }

  const result = await collection.insertOne(body);
  return Response.json({
    message: "Your linktree is added successfully!",
    success: true,
    error: false,
    result: result,
  });
}
