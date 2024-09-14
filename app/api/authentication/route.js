import { NextResponse } from "next/server";
var request = require("request");
export async function POST(req) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "XjhQGYU5UZ3yrhJUcCdGt2jXAAabWMPa",
      client_secret:
        "2CAeWc5EB3vaBdzBbZNWXbQd2SbF328iz1D1o_Yigdoygla2txrTudLzcfHVJVUJ",
      audience: "http://localhost:3000",
      grant_type: "client_credentials",
    }),
  };

  try {
    const response = await fetch(
      "https://dev-6qkiop203j6uy2cc.us.auth0.com/oauth/token",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
