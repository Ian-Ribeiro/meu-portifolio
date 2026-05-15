import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token não fornecido." }, { status: 400 });
  }

  try {
    const subscribersRef = collection(db, "subscribers");
    const q = query(subscribersRef, where("token", "==", token));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Token inválido ou expirado." }, { status: 400 });
    }

    const docSnapshot = querySnapshot.docs[0];
    const docData = docSnapshot.data();

    if (docData.status === "verified") {
      // Already verified, redirect to home with success message
      return NextResponse.redirect(new URL("/?verified=already", request.url));
    }

    // Update status to verified
    const docRef = doc(db, "subscribers", docSnapshot.id);
    await updateDoc(docRef, {
      status: "verified",
      // Optional: remove the token after verification for security
      // token: null 
    });

    // Redirect to home with success state
    return NextResponse.redirect(new URL("/?verified=true", request.url));
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
