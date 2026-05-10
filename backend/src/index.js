export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    
    if (!env.USERS) env.USERS = {};
    if (!env.ITEMS) {
      env.ITEMS = [];
      env.NEXT_ID = 1;
    }

    

    
    if (pathname === "/api/auth/register" && request.method === "POST") {
      const { email, password } = await safeJson(request);

      if (!email || !password) {
        return json({ message: "Email and password required" }, 400);
      }

      if (env.USERS[email]) {
        return json({ message: "User already exists" }, 400);
      }

      env.USERS[email] = { email, password };
      const token = makeToken(email);

      return json({ token, user: { email } }, 200);
    }

    
    if (pathname === "/api/auth/login" && request.method === "POST") {
      const { email, password } = await safeJson(request);

      if (!email || !password) {
        return json({ message: "Email and password required" }, 400);
      }

      
      const demoEmail = "demo@example.com";
      const demoPassword = "password123";

      let user =
        env.USERS[email] ||
        (email === demoEmail && password === demoPassword
          ? { email: demoEmail, password: demoPassword }
          : null);

      if (!user || user.password !== password) {
        return json({ message: "Invalid email or password" }, 401);
      }

      const token = makeToken(user.email);
      return json({ token, user: { email: user.email } }, 200);
    }

    

    if (pathname.startsWith("/api/items")) {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.replace("Bearer ", "").trim();

      if (!token) {
        return json({ message: "Missing token" }, 401);
      }

      
      if (!token.startsWith("demo-token-")) {
        return json({ message: "Invalid token" }, 401);
      }

      

      
      if (pathname === "/api/items" && request.method === "GET") {
        return json(env.ITEMS, 200);
      }

      
      if (pathname === "/api/items" && request.method === "POST") {
        const body = await safeJson(request);
        const item = {
          id: env.NEXT_ID++,
          ...body
        };
        env.ITEMS.push(item);
        return json(item, 201);
      }

      
      if (pathname.startsWith("/api/items/") && request.method === "PUT") {
        const id = Number(pathname.split("/").pop());
        const body = await safeJson(request);

        const index = env.ITEMS.findIndex((i) => i.id === id);
        if (index === -1) {
          return json({ message: "Item not found" }, 404);
        }

        env.ITEMS[index] = { ...env.ITEMS[index], ...body };
        return json(env.ITEMS[index], 200);
      }

      
      if (pathname.startsWith("/api/items/") && request.method === "DELETE") {
        const id = Number(pathname.split("/").pop());

        const index = env.ITEMS.findIndex((i) => i.id === id);
        if (index === -1) {
          return json({ message: "Item not found" }, 404);
        }

        const [deleted] = env.ITEMS.splice(index, 1);
        return json(deleted, 200);
      }
    }

    
    return new Response("Not found", {
      status: 404,
      headers: corsHeaders()
    });
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

async function safeJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function makeToken(email) {
  return `demo-token-${email}-${Date.now()}`;
}
