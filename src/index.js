const USERS = {};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    
    if (
      url.pathname === "/api/auth/register" &&
      request.method === "POST"
    ) {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return Response.json(
          { message: "Email and password required" },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }

      USERS[email] = { email, password };

      return Response.json(
        {
          token: "demo-token",
          user: { email },
        },
        {
          headers: corsHeaders,
        }
      );
    }

    
    if (
      url.pathname === "/api/auth/login" &&
      request.method === "POST"
    ) {
      const body = await request.json();
      const { email, password } = body;

      const user = USERS[email];

      if (!user || user.password !== password) {
        return Response.json(
          { message: "Invalid credentials" },
          {
            status: 401,
            headers: corsHeaders,
          }
        );
      }

      return Response.json(
        {
          token: "demo-token",
          user: { email },
        },
        {
          headers: corsHeaders,
        }
      );
    }

    return Response.json(
      { message: "Not found" },
      {
        status: 404,
        headers: corsHeaders,
      }
    );
  },
};