import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inițializăm clientul Resend cu cheia API din fișierul .env.local
// process.env.RESEND_API_KEY va citi automat variabila.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("Contact API route called");

  try {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Extragem fișierele din formData
    const files: File[] = [];
    let fileIndex = 0;
    while (true) {
      const file = formData.get(`file_${fileIndex}`) as File;
      if (!file) break;
      files.push(file);
      fileIndex++;
    }

    console.log("Received data:", { email, messageLength: message?.length, fileCount: files.length });

    // --- Validarea datelor (păstrată din codul tău, este foarte bună) ---
    if (!email || !message) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json({ error: 'Email și mesajul sunt obligatorii' }, { status: 400 });
    }
    
    // --- ÎNCEPUT SECȚIUNE TRIMITERE EMAIL ---

    // 1. Pregătim atașamentele pentru Resend
    // Trebuie să le convertim în formatul Buffer pe care îl așteaptă Resend
    const attachments = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    console.log("Attempting to send email via Resend...");

    // 2. Trimiterea efectivă a e-mailului folosind await
    // Folosim 'await' pentru a aștepta finalizarea operațiunii
    const { data, error } = await resend.emails.send({
      from: 'Formular Contact <onboarding@resend.dev>', // Adresa de testare Resend
      to: ['meraalin45@gmail.com'], // Adresa ta unde vrei să primești email-urile
      subject: `Cerere nouă de dimensionare de la ${email}`,
      replyTo: email, // Foarte util! Când dai "Reply", vei răspunde direct utilizatorului
      html: `
        <h1>Cerere nouă pentru dimensionare sistem gaz</h1>
        <hr>
        <p><strong>De la (Email):</strong> ${email}</p>
        <p><strong>Mesaj / Descrierea proiectului:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        <hr>
        <p>Au fost atașate ${attachments.length} fișiere.</p>
      `,
      attachments: attachments, // Adăugăm fișierele procesate
    });

    // 3. Gestionarea răspunsului de la Resend
    if (error) {
      // Dacă Resend returnează o eroare, o afișăm în consolă și trimitem un răspuns de eroare
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Eroare la trimiterea email-ului.', details: error.message }, { status: 500 });
    }

    // Dacă a ajuns aici, totul a funcționat
    console.log("Email sent successfully! ID:", data?.id);

    return NextResponse.json({
      success: true,
      message: 'Cererea a fost trimisă cu succes!',
      data,
    });

  } catch (error) {
    // Eroare generală (ex: dacă formData e corupt sau altă problemă neașteptată)
    console.error('Internal Server Error in contact API:', error);
    return NextResponse.json(
      { error: 'Eroare internă de server.' },
      { status: 500 }
    );
  }
}