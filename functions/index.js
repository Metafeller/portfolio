const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.post("/sendEmail", async (req, res) => {
  try {
    const {name, email, message, category, customCategory} = req.body;
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      console.error("❌ BREVO_API_KEY fehlt! Prüfe .env Datei.");
      return res.status(500).json({
        success: false,
        message: "Serverfehler: API-Key fehlt!",
      });
    }

    console.log("📩 Empfangene Daten:", req.body);

    // console.log("📩 Sende Email an:", email);
    // console.log("📨 Admin wird benachrichtigt:", "mail@metafeller.com");

     // Kundene-Mail (kritischer Teil)
    const customerEmail = {
      sender: {
        name: "Savas Boas",
        email: "no-reply@mail.metafeller.com",
      },
      to: [{email}],
      subject: "Danke für deine Anfrage! 📩",
      htmlContent: `<h2>Hallo ${name},</h2>
        <p>Danke für deine Nachricht!</p>
        <p>Ich werde mich bald bei dir melden.</p>
        <p>Falls du nicht warten möchtest,
        kannst du direkt einen Termin buchen:</p>
        <a href="https://calendly.com/dein-link"
          style="display:inline-block;padding:10px 20px;
          background:#007bff;color:white;text-decoration:none;
          border-radius:5px;">
          📅 Kostenloses Erstgespräch buchen
        </a>
        <p>Bis bald und beste Grüße,</p>
        <p><strong>Dein, Savas</strong></p>`,
    };

    console.log("📤 Sende diese Daten an Brevo API für Kunde:",
      JSON.stringify(customerEmail, null, 2));

    // Admin-Mail (nicht kritisch – Fehler hier beeinflussen nicht die Gesamtantwort)  
    const adminEmail = {
      sender: {
        name: "Savas Boas",
        email: "no-reply@mail.metafeller.com",
      },
      to: [{email: "mail@metafeller.com"}],
      subject: "Neue Kontaktanfrage erhalten! ✅",
      htmlContent: `<h2>Neue Anfrage von ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
        <p><strong>Kategorie:</strong>
        ${category === "other" ? customCategory : category}</p>
        `,
    };

    // Kontaktanfrage/Kontaktanlage bei Brevo (ebenfalls nicht kritisch)
    const contactData = {
      email,
      attributes: {
        NAME: name,
        MESSAGE: message,
        CATEGORY: category === "other" ? customCategory : category,
      },
      listIds: [4],
    };

    const brevoHeaders = {
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
    };

    console.log("📤 Sende Anfrage an Brevo API...");
    const emailResponse = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        customerEmail,
        brevoHeaders,
    );

    console.log("✅ Kundene-Mail gesendet:", emailResponse.data);

    
    // Versuche, die Admin-Mail zu senden – falls Fehler auftreten, nur loggen

    // await axios.post(
    //     "https://api.brevo.com/v3/smtp/email",
    //     adminEmail,
    //     brevoHeaders,
    // );

    try {
      console.log("📤 Sende Admin-Mail an Brevo API...");
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        adminEmail,
        brevoHeaders
      );
      console.log("✅ Admin-Mail gesendet");
    } catch (error) {
      console.error("❌ Fehler beim Senden der Admin-Mail:",
        error.response ? error.response.data : error.message);
    }


    // Versuche, den Kontakt in der Brevo-Kontaktliste anzulegen – bei Fehlern (z. B. Duplikaten) ignorieren

    // await axios.post(
    //     "https://api.brevo.com/v3/contacts",
    //     contactData,
    //     brevoHeaders,
    // );

    try {
      console.log("📤 Füge Kontakt zur Brevo-Kontaktliste hinzu...");
      await axios.post(
        "https://api.brevo.com/v3/contacts",
        contactData,
        brevoHeaders
      );
      console.log("✅ Kontakt angelegt");
    } catch (error) {
      const errorMsg = error.response &&
                       error.response.data &&
                       error.response.data.message;
      if (errorMsg && errorMsg.toLowerCase().includes("already exist")) {
        console.log("ℹ Kontakt existiert bereits – Fehler ignorieren.");
      } else {
        console.error("❌ Fehler beim Anlegen des Kontakts:",
          error.response ? error.response.data : error.message);
      }
    }


    // Rückgabe eines Erfolgs, da die Kundene-Mail (der kritische Teil) erfolgreich gesendet wurde

    res.status(200).json({
      success: true,
      message: "E-Mail erfolgreich gesendet!",
      brevoResponse: emailResponse.data,
    });
  
//   } catch (error) {
//     console.error("❌ Fehler in index.js:", error.response ? error.response.data : error.message);
//     // console.error("❌ Fehler beim Senden der E-Mail:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "Fehler beim Senden der E-Mail.",
//       error: error.response ? error.response.data : error.message,
//     });
//   }
// });

} catch (error) {
  console.error("❌ Kritischer Fehler in sendEmail:",
    error.response ? error.response.data : error.message);
  res.status(500).json({
    success: false,
    message: "Fehler beim Senden der E-Mail.",
    error: error.response ? error.response.data : error.message,
  });
}
});

exports.api = functions.https.onRequest(app);
