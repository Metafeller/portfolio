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
        <p>Bis bald & beste Grüße,</p>
        <p><strong>Dein, Savas</strong></p>`,
    };

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
        <p><strong>Kategorie:</strong>
        ${category === "other" ? customCategory : category}</p>
        <p><strong>Nachricht:</strong> ${message}</p>`,
    };

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

    const emailResponse = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        customerEmail,
        brevoHeaders,
    );

    await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        adminEmail,
        brevoHeaders,
    );

    await axios.post(
        "https://api.brevo.com/v3/contacts",
        contactData,
        brevoHeaders,
    );

    console.log("✅ Brevo API Response:", emailResponse.data);

    res.status(200).json({
      success: true,
      message: "E-Mail erfolgreich gesendet!",
      brevoResponse: emailResponse.data,
    });
  } catch (error) {
    console.error("❌ Fehler beim Senden der E-Mail:", error.message);

    res.status(500).json({
      success: false,
      message: "Fehler beim Senden der E-Mail.",
      error: error.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
