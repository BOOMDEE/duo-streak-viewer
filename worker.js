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
          <title>DuoStreak:  ${streak}</title>
          <style>
              body {
                  background: #000;
                  color: #fff;
                  margin: 0;
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  overflow: hidden;
              }

              /* 核心环境光晕：极其柔和的动态感 */
              .ambient-glow {
                  position: absolute;
                  width: 60vw;
                  height: 60vw;
                  background: radial-gradient(circle, rgba(88, 204, 2, 0.15) 0%, transparent 70%);
                  filter: blur(60px);
                  animation: float 12s infinite alternate ease-in-out;
                  z-index: 1;
              }

              .container {
                  position: relative;
                  z-index: 2;
                  text-align: center;
              }

              /* 极致渐变数字 */
              .streak-count {
                  font-size: 14rem;
                  font-weight: 800;
                  margin: 0;
                  letter-spacing: -10px;
                  background: linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.2) 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  /* 这里的投影增加了一种空气感 */
                  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
              }

              .label {
                  font-size: 0.8rem;
                  letter-spacing: 8px;
                  text-transform: uppercase;
                  opacity: 0.3;
                  margin-top: -20px;
              }

              @keyframes float {
                  0% { transform: translate(-10%, -10%) scale(1); }
                  100% { transform: translate(10%, 10%) scale(1.1); }
              }

              /* 极简底部 */
              .footer {
                  position: absolute;
                  bottom: 40px;
                  font-size: 11px;
                  font-family: monospace;
                  opacity: 0.2;
                  letter-spacing: 3px;
              }
          </style>
      </head>
      <body>
          <div class="ambient-glow"></div>
          
          <div class="container">
              <h1 class="streak-count">${streak}</h1>
              <div class="label">Days of Persistence</div>
          </div>

          <div class="footer">
              STREAK_ID: ${username.toUpperCase()} // HZ.WESTLAKE
          </div>
      </body>
      </html>`;

      return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    } catch (e) {
      return new Response("GATEWAY_ERROR", { status: 502 });
    }
  }
};
