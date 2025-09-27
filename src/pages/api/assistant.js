export default async function handler(req, res){
  try{
    const { messages } = JSON.parse(req.body||'{}');
    const apiKey = process.env.OPENAI_API_KEY;
    if(!apiKey){
      return res.status(200).json({ reply: "AI Assistant demo: Add OPENAI_API_KEY in Vercel → Settings → Environment Variables for real answers." });
    }
    const r = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role:"system", content:"You are a helpful automotive repair assistant for CarScan Pro. Be concise, step-by-step, emphasize safety and torque specs where relevant." },
          ...(messages||[])
        ]
      })
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a response.";
    res.status(200).json({ reply });
  }catch(e){
    res.status(200).json({ reply: "Assistant error. Please try again." });
  }
}
