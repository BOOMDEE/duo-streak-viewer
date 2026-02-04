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
          <title>NODE_STREAK: ${streak}</title>
          <style>
              :root {
                  --bg: #050505;
                  --accent: #58cc02;
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

              /* 1. 双层光晕：模拟水波交织感 */
              .glow-container {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }

              /* 第一层：深层、缓慢、大范围 */
              .glow-1 {
                  position: absolute;
                  width: 500px;
                  height: 500px;
                  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
                  filter: blur(100px);
                  opacity: 0.08;
                  animation: wave-1 12s infinite alternate ease-in-out;
              }

              /* 第二层：核心、稍快、亮一点 */
              .glow-2 {
                  position: absolute;
                  width: 300px;
                  height: 300px;
                  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
                  filter: blur(80px);
                  opacity: 0.12;
                  animation: wave-2 7s infinite alternate-reverse ease-in-out;
              }

              .container {
                  position: relative;
                  z-index: 10;
                  text-align: center;
              }

              /* 2. 呼吸式排版：文字微弱舒张 */
              .streak-value {
                  font-size: 10rem;
                  font-weight: 800;
                  line-height: 1;
                  margin: 0;
                  background: linear-gradient(180deg, #fff 40%, rgba(255,255,255,0.1) 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  filter: drop-shadow(0 0 30px rgba(88, 204, 2, 0.25));
                  /* 核心动画：letter-spacing 舒张 */
                  animation: breathe-text 8s infinite alternate ease-in-out;
              }

              .label {
                  font-size: 0.7rem;
                  letter-spacing: 5px;
                  text-transform: uppercase;
                  opacity: 0.3;
                  margin-top: 10px;
              }

              .quote {
                  margin-top: 4rem;
                  font-style: italic;
                  font-family: serif;
                  font-size: 0.95rem;
                  opacity: 0.5;
                  max-width: 300px;
              }

              /* 光晕 1 动画：大范围慢漂 */
              @keyframes wave-1 {
                  from { transform: translate(-5%, -5%) scale(1); opacity: 0.05; }
                  to { transform: translate(5%, 5%) scale(1.2); opacity: 0.1; }
              }

              /* 光晕 2 动画：中范围快漂 */
              @keyframes wave-2 {
                  from { transform: translate(3%, 3%) scale(1.1); }
                  to { transform: translate(-3%, -3%) scale(0.9); }
              }

              /* 呼吸式排版动画 */
              @keyframes breathe-text {
                  from { 
                      letter-spacing: -6px; 
                      filter: drop-shadow(0 0 20px rgba(88, 204, 2, 0.2));
                  }
                  to { 
                      letter-spacing: -2px; 
                      filter: drop-shadow(0 0 45px rgba(88, 204, 2, 0.4));
                  }
              }
          </style>
      </head>
      <body>
          <div class="glow-container">
              <div class="glow-1"></div>
              <div class="glow-2"></div>
          </div>
          <div class="container">
              <div class="streak-value">${streak}</div>
              <div class="label">Consecutive Days</div>
              <div class="quote">“Persistence is the art of outlasting yourself.”</div>
          </div>
      </body>
      </html>`;

      return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    } catch (e) {
      return new Response("GATEWAY_TIMEOUT", { status: 504 });
    }
  }
};
