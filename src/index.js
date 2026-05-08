export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    // Simple in-memory "database"
    // NOTE: This resets on every deploy; good enough for demo.
    if (!env.USERS) env.USERS = {};

    if (url.pathname === "/api/auth/register" && request.method === "POST") {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return json({ message: "Email and password required" }, 400);
      }

      // Save user in memory
      env.USERS[email] = { email, password };

      // Fake token
      const token = "demo-token-" + Date.now();

      return json({ token, user: { email } }, 200);
    }

    if (url.pathname === "/api/auth/login" && request.method === "POST") {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return json({ message: "Email and password required" }, 400);
      }

      // Hard-coded demo user + in-memory users
      const demoEmail = "demo@example.com";
      const demoPassword = "password123";

      const user =
        env.USERS[email] ||
        (email === demoEmail && password === demoPassword
          ? { email: demoEmail, password: demoPassword }
          : null);

      if (!user || user.password !== password) {
        return json({ message: "Invalid email or password" }, 401);
      }

      const token = "demo-token-" + Date.now();

      return json({ token, user: { email: user.email } }, 200);
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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
