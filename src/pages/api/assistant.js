export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  const { messages = [] } = req.body || {};
  const offline =
    "I'm in offline mode. Tips:\n- Good light, hold steady\n- Try common socket sizes (10/12/14mm on many Japanese cars)\n- Use Guides for detailed steps";
  if (!process.env.OPENAI_API_KEY) return res.status(200).json({ reply: offline });

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.3,
        messages: [{ role: 'system', content: 'You are the CarScan Pro repair assistant.' }, ...messages.slice(-30)]
      })
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || offline;
    return res.status(200).json({ reply });
  } catch {
    return res.status(200).json({ reply: offline });
  }
}