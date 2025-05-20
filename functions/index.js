// index.js – Firebase Cloud Function für das Kontaktformular

// === Imports und Setup ===
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// === POST-Endpunkt: /sendEmail ===
// Schritte:
// 1. Prüft, ob der Kontakt bereits existiert
// (GET-Anfrage an Brevo).
//
// 2. Wenn der Kontakt existiert und der Request nicht bestätigt ist
// (confirmUpdate fehlt oder false),
//    wird ein Response mit duplicate:true zurückgegeben –
// ohne weitere Aktionen.
//
// 3. Falls der Kontakt existiert und confirmUpdate true ist
// oder der Kontakt neu ist, wird der Kontakt
//    aktualisiert (bei Duplicate) oder neu erstellt.
//
// 4. Danach werden die Kundene-Mail (kritisch)
// und Admin-Mail (nicht kritisch) gesendet.
//
// 5. Zum Schluss wird eine Erfolgsmeldung
// mit dem duplicate-Flag zurückgegeben.

// === POST-Endpunkt: /sendEmail ===
// Dieser Endpunkt prüft, ob der Kontakt bereits existiert.
// Falls ja, wird er aktualisiert (duplicate=true).
// Anschließend werden Kundene-Mail (kritisch)
// und Admin-Mail (nicht kritisch) gesendet.
// Am Ende wird eine Erfolgsmeldung zurückgegeben,
// die das duplicate-Flag enthält.

app.post("/sendEmail", async (req, res) => {
  try {
    // ----- Parameter aus dem Request extrahieren -----
    const {
      name,
      email,
      message,
      category,
      customCategory,
      confirmUpdate,
      website,
      websiteOwnership,
    } = req.body;
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error("❌ BREVO_API_KEY fehlt! Prüfe .env Datei.");
      return res.status(500).json({
        success: false,
        message: "Serverfehler: API-Key fehlt!",
      });
    }
    console.log("📩 Empfangene Daten:", req.body);

    // Gemeinsame Header für alle Brevo-Anfragen
    const brevoHeaders = {
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
    };

    // ----- Schritt 1: Prüfen, ob der Kontakt bereits existiert -----
    let contactExists = false;
    try {
      const checkResponse = await axios.get(
        `https://api.brevo.com/v3/contacts/${email}`,
        brevoHeaders,
      );
      console.log("✅ Kontakt existiert bereits:", checkResponse.data);
      contactExists = true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("ℹ️ Kontakt existiert nicht, wird neu angelegt.");
      } else {
        console.error("❌ Fehler beim Prüfen des Kontakts:",
          error.response ? error.response.data : error.message);
      }
    }

    // Wenn der Kontakt bereits existiert und der Nutzer
    // nicht bestätigt hat, sende nur das Duplicate-Flag zurück.
    if (contactExists && !confirmUpdate) {
      console.log("ℹ️ Duplicate detected. Bitte bestätigen Sie das Update.");
      return res.status(200).json({
        success: true,
        message: "Duplicate detected. Please confirm update.",
        duplicate: true,
      });
    }

    // ----- Schritt 2: Kontakt-Daten vorbereiten -----
    const contactData = {
      email,
      attributes: {
        NAME: name,
        MESSAGE: message,
        CATEGORY: category === "other" ? customCategory : category,
        WEBSITE: website || "", // Falls leer, speichern wir ""
        WEBSITE_OWNERSHIP: websiteOwnership || "",
      },
      listIds: [4], // Kontaktliste ID #4
    };

    // ----- Schritt 3: Kontakt anlegen oder aktualisieren -----
    let duplicate = false;
    if (contactExists) {
      console.log("🔄 Aktualisiere bestehenden Kontakt...");
      try {
        await axios.put(
          `https://api.brevo.com/v3/contacts/${email}`,
          contactData,
          brevoHeaders,
        );
        duplicate = true; // Kontakt wurde aktualisiert
        console.log("✅ Kontakt aktualisiert");
      } catch (error) {
        console.error("❌ Fehler beim Aktualisieren des Kontakts:",
          error.response ? error.response.data : error.message);
      }
    } else {
      console.log("➕ Neuer Kontakt wird erstellt...");
      try {
        await axios.post(
          "https://api.brevo.com/v3/contacts",
          contactData,
          brevoHeaders,
        );
        console.log("✅ Neuer Kontakt erstellt");
      } catch (error) {
        console.error("❌ Fehler beim Erstellen des Kontakts:",
          error.response ? error.response.data : error.message);
      }
    }

    // ----- Schritt 4: Kundene-Mail senden (kritischer Teil) -----
    const customerEmail = {
      sender: { name: "Savas Boas", email: "no-reply@mail.metafeller.com" },
      to: [{ email }],
      subject: "Danke für deine Anfrage! 📩",
      htmlContent: `<h2>Hallo ${name},</h2>
        <p>Danke für deine Nachricht!</p>
        <p>Ich werde mich bald bei dir melden.</p>
        <p>Falls du nicht warten möchtest, 
        kannst du direkt einen Termin buchen:</p>
        <a href="https://calendly.com/dein-link" style="display:inline-block;
        padding:10px 20px;
        background:#007bff;
        color:white;
        text-decoration:none;
        border-radius:5px;">
          📅 Kostenloses Erstgespräch buchen
        </a>
        <p>Bis bald und beste Grüße,</p>
        <p><strong>Tai Savas Boas</strong></p>`,
    };

    console.log("📤 Sende Kundene-Mail:", JSON.stringify(customerEmail, null, 2));
    const emailResponse = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      customerEmail,
      brevoHeaders,
    );
    console.log("✅ Kundene-Mail gesendet:", emailResponse.data);

    // ----- Schritt 5: Admin-Mail senden (nicht kritisch) -----
    const adminEmail = {
      sender: { name: "Savas Boas", email: "no-reply@mail.metafeller.com" },
      to: [{ email: "mail@metafeller.com" }],
      subject: "Neue Kontaktanfrage erhalten! ✅",
      htmlContent: `<h2>Neue Anfrage von ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website || "N/A"}</p>
        <p><strong>Ownership:</strong> ${websiteOwnership || "N/A"}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
        <p><strong>Kategorie:</strong> ${category === "other" ? customCategory : category}</p>`,
    };
    try {
      console.log("📤 Sende Admin-Mail...");
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        adminEmail,
        brevoHeaders,
      );
      console.log("✅ Admin-Mail gesendet");
    } catch (error) {
      console.error("❌ Fehler beim Senden der Admin-Mail (ignoriert):",
        error.response ? error.response.data : error.message);
    }

    // ----- Schritt 6: Erfolg zurückgeben -----
    return res.status(200).json({
      success: true,
      message: "E-Mail erfolgreich gesendet!",
      duplicate,
      brevoResponse: emailResponse.data,
    });
  } catch (error) {
    console.error("❌ Kritischer Fehler in sendEmail:",
      error.response ? error.response.data : error.message);
    return res.status(500).json({
      success: false,
      message: "Fehler beim Senden der E-Mail.",
      error: error.response ? error.response.data : error.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
