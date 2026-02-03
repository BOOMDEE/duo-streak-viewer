export default {
  async fetch(request) {
    const username = "BOOMDEE_Mango";
    const duoUrl = `https://www.duolingo.com/2017-06-30/users?username=${username}`;

    try {
      const response = await fetch(duoUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
      const data = await response.json();
      const streak = data.users[0].streak;

      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NODE_STREAK // ${username}</title>
          <style>
              :root {
                  --bg: #0a0a0a;
                  --accent: #58cc02; /* Duolingo 典型的绿色 */
                  --glass: rgba(255, 255, 255, 0.03);
              }

              body {
                  background: var(--bg);
                  color: #fff;
                  font-family: 'Segoe UI', system-ui, sans-serif;
                  height: 100vh;
                  margin: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
              }

              /* 这里的环境光晕是加分的关键 */
              .glow {
                  position: absolute;
                  width: 300px;
                  height: 300px;
                  background: var(--accent);
                  filter: blur(120px);
                  opacity: 0.15;
                  z-index: 0;
                  animation: pulse 8s infinite alternate;
              }

              .container {
                  position: relative;
                  z-index: 1;
                  text-align: center;
              }

              .streak-value {
                  font-size: 10rem;
                  font-weight: 800;
                  letter-spacing: -5px;
                  line-height: 1;
                  background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.1) 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  filter: drop-shadow(0 0 30px rgba(88, 204, 2, 0.3));
              }

              .label {
                  font-size: 0.7rem;
                  letter-spacing: 5px;
                  text-transform: uppercase;
                  opacity: 0.4;
                  margin-top: -10px;
              }

              .quote {
                  margin-top: 4rem;
                  font-style: italic;
                  font-family: serif;
                  font-size: 1rem;
                  opacity: 0.7;
                  max-width: 300px;
              }

              .status-bar {
                  position: absolute;
                  bottom: 40px;
                  font-family: monospace;
                  font-size: 10px;
                  color: var(--accent);
                  opacity: 0.5;
              }

              @keyframes pulse {
                  from { transform: scale(1); opacity: 0.1; }
                  to { transform: scale(1.5); opacity: 0.2; }
              }
          </style>
      </head>
      <body>
          <div class="glow"></div>
          <div class="container">
              <div class="streak-value">${streak}</div>
              <div class="label">Consecutive Days</div>
              <div class="quote">“Persistence is the art of outlasting yourself.”</div>
          </div>
          <div class="status-bar">
              SYSTEM_READY // NODE_HZ_WESTLAKE // ${new Date().toISOString().split('T')[0]}
          </div>
      </body>
      </html>`;

      return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    } catch (e) {
      return new Response("GATEWAY_TIMEOUT", { status: 504 });
    }
  }
};
