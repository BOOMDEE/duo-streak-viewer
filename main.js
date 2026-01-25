async function fetchStreak() {
    const streakElement = document.getElementById('streak');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');

    // 记得把这里的 URL 换成你部署好的 Cloudflare Worker 地址
    const PROXY_URL = 'https://dsv.yinjiaqi2021.workers.dev/';

    try {
        const res = await fetch(PROXY_URL);
        const data = await res.json();
        
        const streak = data.users[0].streak;
        
        // 更新 UI
        streakElement.innerText = streak;
        streakElement.style.color = "var(--m3-success)";
        statusDot.style.backgroundColor = "var(--m3-success)";
        statusDot.style.boxShadow = "0 0 10px var(--m3-success)";
        statusText.innerText = "Active Persistence";
        
    } catch (e) {
        streakElement.innerText = "OFFLINE";
        streakElement.style.color = "var(--m3-error)";
        statusDot.style.backgroundColor = "var(--m3-error)";
        statusText.innerText = "Tunnel Error";
        console.error("The grid is down:", e);
    }
}

// 页面加载完成后启动
window.addEventListener('DOMContentLoaded', fetchStreak);
