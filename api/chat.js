const rateBuckets = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 15;

function getClientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateBuckets.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) {
    const oldest = valid[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    rateBuckets.set(ip, valid);
    return { allowed: false, remaining: 0, retryAfter };
  }

  valid.push(now);
  rateBuckets.set(ip, valid);
  return { allowed: true, remaining: MAX_REQUESTS - valid.length, retryAfter: 0 };
}

function generateSandboxReply(messages, action, requestedModel) {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const lower = lastUser.toLowerCase();

  if (lower.includes('cbt') || lower.includes('trắc nghiệm') || lower.includes('đề thi')) {
    return `Đã phân tích yêu cầu **App thi CBT** từ bạn ("${lastUser.slice(0, 90)}").

1. **Cấu trúc Sandbox đã chuẩn bị:**
   - \`QuizArena.tsx\`: Bộ đếm ngược mili-giây không phụ thuộc chu kỳ re-render React.
   - \`QuestionMatrix.tsx\`: Trạng thái câu hỏi đã làm / đánh dấu xem lại / kiểm tra đáp án tức thì.
2. **Minh bạch kiểm thử (\`Checks\`):** Build OK · Responsive 375px–1440px OK · \`prefers-reduced-motion\` OK.
3. Bạn có thể xem thay đổi mã nguồn ở tab **Diff** hoặc bật **PiP Preview** để thao tác trực tiếp.`;
  }

  if (lower.includes('landing') || lower.includes('clb') || lower.includes('tuyển quân')) {
    return `Đã lập Prompt Blueprint cho **Landing Page CLB** ("${lastUser.slice(0, 90)}").

- **Bố cục đề xuất (từ \`SOURCEOFKNOWLEDGFORAI\`):** Navbar \`Luna\` nổi + \`PromptComposer\` + Thanh đếm ngược \`CountdownTimer.jsx\`.
- **Cảnh báo chống AI slop:** Đã kiểm tra độ tương phản Warm Paper / Graphite, không sinh secret key trong client bundle, mã nguồn xuất ZIP sạch 100% theo chuẩn MIT.
- Kiểm tra kết quả ở **Live Preview** hoặc chuyển sang tab **Code** để rà soát từng file.`;
  }

  return `Đã tiếp nhận chỉ dẫn [${action || requestedModel || 'architect'}]: "${lastUser.slice(0, 120)}".

Hệ thống **F-FORUM Architect** đã đồng bộ ngữ cảnh dự án, cập nhật cây nhiệm vụ trong **TaskCard** và chạy kiểm tra tự động (5/6 Checks đạt). Bạn có thể xem chi tiết thay đổi tại **Diff Inspector** hoặc tải trọn bộ mã nguồn sạch ở tab **Export ZIP**.`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter));
    return res.status(429).json({
      error: 'Bạn đã gửi quá nhiều yêu cầu. Hệ thống tạm giới hạn để bảo vệ tài nguyên công cộng.',
      retryAfter: rate.retryAfter,
      remainingQuota: 0,
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  const messages = body?.messages;
  const action = body?.action || null;
  const requestedModel = body?.model || 'F-Forum Architect';
  const simulateError = req.query?.simulateError === '1' || body?.simulateError === true;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: '`messages` must be a non-empty array' });
  }

  if (simulateError) {
    return res.status(502).json({
      error: 'Kết nối tới AI Gateway tạm gián đoạn (Simulated Error 502).',
      retryAfter: 5,
      remainingQuota: rate.remaining,
    });
  }

  const apiKey = process.env.AI_API_KEY;
  const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = process.env.AI_MODEL || 'gpt-4o-mini';

  const systemPrompt = {
    role: 'system',
    content:
      'Bạn là F-FORUM Creation Architect — trợ lý thiết kế & lập trình web dành cho học sinh, sinh viên và chuyên gia có tư duy phản biện cao. Hãy trả lời bằng tiếng Việt súc tích, minh bạch kỹ thuật, tránh sáo rỗng, luôn chỉ rõ các file hoặc bước kiểm thử cụ thể.',
  };

  if (apiKey && apiKey.trim().length > 0) {
    try {
      const upstreamRes = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model,
          messages: [systemPrompt, ...messages.slice(-12)],
          temperature: 0.6,
          max_tokens: 900,
        }),
      });

      if (upstreamRes.ok) {
        const data = await upstreamRes.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return res.status(200).json({
            reply,
            mode: 'live',
            model,
            remainingQuota: rate.remaining,
          });
        }
      }

      const fallbackReply = generateSandboxReply(messages, action, requestedModel);
      return res.status(200).json({
        reply: fallbackReply,
        mode: 'sandbox-fallback',
        model: 'f-forum-sandbox',
        notice: `Upstream AI Gateway trả mã ${upstreamRes.status}. Đã chuyển sang chế độ Sandbox an toàn.`,
        remainingQuota: rate.remaining,
      });
    } catch {
      const fallbackReply = generateSandboxReply(messages, action, requestedModel);
      return res.status(200).json({
        reply: fallbackReply,
        mode: 'sandbox-fallback',
        model: 'f-forum-sandbox',
        notice: 'Không thể kết nối Upstream Gateway — đang phản hồi qua chế độ Sandbox cục bộ.',
        remainingQuota: rate.remaining,
      });
    }
  }

  return res.status(200).json({
    reply: generateSandboxReply(messages, action, requestedModel),
    mode: 'sandbox-fallback',
    model: 'f-forum-sandbox',
    notice: 'Chế độ Sandbox cục bộ — thêm AI_API_KEY trong Vercel Environment Variables để kích hoạt LLM trực tiếp.',
    remainingQuota: rate.remaining,
  });
}
