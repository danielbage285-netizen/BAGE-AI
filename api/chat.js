export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const { message } = req.body;

console.log("API KEY:", process.env.OPENAI_API_KEY);

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "user", content: message }
]
})
});

const data = await response.json();

console.log("FULL ERROR:", data);

if (!data.choices) {
return res.status(500).json({
reply: data.error?.message || "API Failed ❌"
});
}

res.status(200).json({
reply: data.choices[0].message.content
});

} catch (err) {
return res.status(500).json({ reply: "Server Error ❌" });
}

}
