const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // ✅ Lädt die .env Datei

// Express-App für die API erstellen
const app = express();

// CORS aktivieren, damit Angular Anfragen senden kann
app.use(cors({origin: true}));
app.use(express.json()); // JSON-Parsing aktivieren

// 🔥 API-Route für das Kontaktformular (Proxy zu Brevo)
app.post("/sendEmail", async (req, res) => {
  try {
    // Formulardaten aus der Anfrage holen
    const {name, email, message, category, customCategory} = req.body;

    // 📌 Brevo API-Key sicher aus ENV-Variablen holen
    const brevoApiKey = process.env.BREVO_API_KEY;

    // ❌ Falls kein API-Key gefunden wurde, Fehler werfen
    if (!brevoApiKey) {
      console.error("❌ BREVO_API_KEY fehlt! Stelle die .env Datei korrekt.");
      return res.status(500).json({
        success: false,
        message: "Serverfehler: API-Key nicht gesetzt.",
      });
    }

    // 💌 E-Mail Daten für Brevo API
    const emailData = {
      sender: {
        name: "Savas Boas",
        email: "no-reply@mail.metafeller.com",
      },
      to: [{email}],
      subject: "Danke für deine Anfrage! 📩",
      htmlContent: `
        <h2>Hallo ${name},</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
        <p><strong>Kategorie:</strong> 
        ${category === "other" ? customCategory : category}</p>
        <p>Danke, dass du mich über mein Kontaktformular erreicht hast! 
        Ich werde mich bald bei dir melden.</p>
        <p>Falls du möchtest, kannst du direkt einen Termin buchen:</p>
        <a href="https://calendly.com/dein-link" 
          style="display: inline-block;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;">
          📅 Kostenloses Erstgespräch buchen
        </a>
        <p>Bis bald!</p>
      `,
    };

    // 📌 Anfrage an Brevo API senden und `response` speichern
    const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        emailData,
        {
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "api-key": brevoApiKey, // 🔥 API-Key aus .env Datei
          },
        },
    );

    // ✅ Erfolgreich → Logge die Antwort
    console.log("✅ Brevo API Response:", response.data);

    // Sende eine Erfolgsmeldung an den Client
    res.status(200).json({
      success: true,
      message: "E-Mail erfolgreich gesendet!",
      brevoResponse: response.data,
    });
  } catch (error) {
    console.error(
        "❌ Fehler beim Senden der E-Mail:",
      error.response ? error.response.data : error.message,
    );

    // Fehlerbehandlung → Sende detaillierte Fehlermeldung an den Client
    res.status(500).json({
      success: false,
      message: "Fehler beim Senden der E-Mail.",
      error: error.response ? error.response.data : error.message,
    });
  }
});

// 🔥 API als Firebase Cloud Function bereitstellen
exports.api = functions.https.onRequest(app);
