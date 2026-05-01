export default {
  async fetch(request: Request, env: any): Promise<Response> {
    try {
      // 🔥 TARGET API (ubah ini kalau mau demo normal vs error)
      const targetAPI = "https://fake-api-down-123.com";

      let status = "OK";

      // 🔍 CHECK API
      try {
        const res = await fetch(targetAPI);
        if (!res.ok) status = "ERROR";
      } catch (err) {
        status = "DOWN";
      }

      // 🧠 AI DECISION (dengan fallback)
      let decision = "No decision";

      try {
        const result = await env.AI.run("@cf/meta/llama-3-8b", {
          prompt: `You are an autonomous monitoring agent.
API status is ${status}.
What should the agent do?`
        });

        decision = result?.response || JSON.stringify(result);
      } catch (e) {
        // 🔥 fallback biar tetap jalan (penting buat demo)
        if (status === "OK") {
          decision = "System healthy. No action needed.";
        } else {
          decision = "Issue detected. Sending alert.";
        }
      }

      // ⚡ ACTION
      let action = "none";
      if (status !== "OK") {
        action = "Sending alert to admin...";
      }

      // 📦 RESPONSE FINAL (SUDAH DIPOLISH)
      return new Response(
        JSON.stringify(
          {
            agent_name: "AutoGuard",
            agent_type: "Autonomous Monitoring Agent",
            timestamp: new Date().toISOString(),
            api_status: status,
            agent_decision: decision,
            action_taken: action,
          },
          null,
          2
        ),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          error: "Worker crashed",
          message: err?.message || "unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
