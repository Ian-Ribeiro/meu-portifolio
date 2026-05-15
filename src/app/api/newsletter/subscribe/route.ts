import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // 1. Check if email already exists
    const subscribersRef = collection(db, "subscribers");
    const q = query(subscribersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0].data();
      if (existingDoc.status === "verified") {
        return NextResponse.json({ error: "Este email já está inscrito." }, { status: 400 });
      }
      if (existingDoc.status === "pending") {
         return NextResponse.json({ error: "Verifique sua caixa de entrada para o link de confirmação." }, { status: 400 });
      }
    }

    // 2. Generate unique token
    const token = crypto.randomUUID();

    // 3. Save to Firestore as pending
    await addDoc(subscribersRef, {
      email,
      token,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    // 4. Send verification email via Resend
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const verifyLink = `${baseUrl}/api/newsletter/verify?token=${token}`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>", // Replace with your verified domain
        to: email,
        subject: "Confirme sua inscrição na Newsletter",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2>Quase lá!</h2>
            <p>Obrigado por se inscrever na minha newsletter. Por favor, clique no botão abaixo para confirmar seu email.</p>
            <a href="${verifyLink}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px;">
              Confirmar Inscrição
            </a>
            <p style="margin-top: 32px; font-size: 14px; color: #666;">
              Se você não solicitou esta inscrição, pode ignorar este email.
            </p>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      const errorData = await resendRes.json();
      console.error("Resend API Error:", errorData);
      return NextResponse.json({ error: "Falha ao enviar email de verificação." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Email enviado com sucesso." });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
