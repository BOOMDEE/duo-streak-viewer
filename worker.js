export default {
  async fetch(request) {
    const username = "BOOMDEE_Mango";
    const duoUrl = `https://www.duolingo.com/2017-06-30/users?username=${username}`;

    try {
      // 1. 后端逻辑：获取数据
      const response = await fetch(duoUrl, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });
      const data = await response.json();
      const streak = data.users[0].streak;

      // 2. 前端逻辑：动态生成 HTML
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>BOOMDEE | Engine</title>
          <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@500;700&family=Roboto+Mono&display=swap" rel="stylesheet">
          <style>
              :root { --m3-surface: #1a1c1e; --m3-primary: #d1e4ff; --m3-success: #b1f293; }
              body { background: var(--m3-surface); color: #e2e2e6; font-family: 'Google Sans', sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; margin: 0; }
              .m3-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 28px; padding: 40px; text-align: center; backdrop-filter: blur(10px); }
              .streak { font-size: 72px; font-weight: 700; color: var(--m3-success); margin: 20px 0; }
              .chip { background: #42474e; color: var(--m3-primary); padding: 4px 12px; border-radius: 8px; font-family: 'Roboto Mono'; font-size: 12px; }
          </style>
      </head>
      <body>
          <div class="m3-card">
              <div class="chip">2-IN-1 ENGINE ACTIVE</div>
              <div class="streak">${streak}</div>
              <div style="opacity: 0.6">Days of Persistence</div>
              <p style="font-size: 12px; margin-top: 30px; font-family: 'Roboto Mono'; color: #8d9199;">
                "Consistency is the only bridge to excellence."
              </p>
          </div>
      </body>
      </html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });

    } catch (e) {
      return new Response("Engine Error", { status: 500 });
    }
  }
};
