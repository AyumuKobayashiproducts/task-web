import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
        content:
  "入力内容をタスクとして自然な形に整えてください。固有名詞は必ず残してください。形式は「カテゴリ > タスク名」。説明は禁止。20〜30文字以内。",},
        {
          role: "user",
          content: text,
        },
      ],
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    result: data.choices[0].message.content,
  });
}
