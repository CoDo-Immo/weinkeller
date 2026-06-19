# weinkeller
Verwaltung des Weinkellers

# Release Notes — Weinkeller App

## Version 1.1 — 19.06.2026

### Neue Funktionen

**Sterne-Bewertung im Formular**
Die Bewertung lässt sich neu direkt durch Antippen von Sternen vergeben, statt über ein Zahlen-Dropdown. Ein ✕-Button setzt die Bewertung zurück.

**Duplizieren**
In der Detailansicht öffnet ein neuer Button «Duplizieren» einen bestehenden Wein als Vorlage für einen neuen Eintrag — nützlich z.B. für verschiedene Jahrgänge desselben Weins.

**Barcode-Scanner**
Ein Kamera-Button (⇅ über dem Plus-Button) scannt den EAN-Barcode der Flasche und befüllt das Formular automatisch via Open Food Facts. Bei unbekanntem Barcode öffnet sich das leere Formular. Funktioniert auf Android Chrome.

**Import / Export (Gerätesynchronisation)**
Ein neuer Sync-Button öffnet einen Dialog mit drei Optionen:
- JSON-Backup herunterladen (vollständige Datensicherung, Datum im Dateinamen)
- JSON-Datei importieren (neue Weine werden ergänzt, bestehende mit gleicher ID aktualisiert)
- CSV für Excel herunterladen (wie bisher)

---

### Übersichtskarte

- Weingut und Jahrgang auf einer eigenen Zeile: Weingut linksbündig, Jahrgang rechtsbündig
- Land und Gebiet auf separater Zeile (Region entfernt)
- Rebsorte auf eigener Zeile, Ausbau rechtsbündig daneben (Bordeaux-Rosa)
- Eignung als vierte Zeile, rechtsbündig in Olivgrün
- Weintyp-Tag entfernt — der Typ ist durch den farbigen Seitenstreifen erkennbar
- Weingut: weiss, fett
- Jahrgang: weiss, fett

---

### Detailansicht

Aktions-Buttons in zwei Zeilen gegliedert:
- Zeile 1: Abbuchen · Bearbeiten
- Zeile 2: Duplizieren · Löschen

---

### Design

- Slide-up Animation beim Öffnen von Sheets mit Backdrop-Blur
- Farbiger Akzentstreifen am linken Kartenrand je Weintyp
- Karten-Press-Effekt beim Antippen
- Verfeinerter Bordeaux-Farbton (#8B2E4A)
- Weicherer Topbar-Schatten statt harter Linie
- Fokus-Glow auf allen Eingabefeldern
- Handle-Bar am oberen Sheet-Rand
- v1.1-Badge im Header

---

### Zurückgestellt (geplant für spätere Version)

**Etikett-Scan via Claude Vision API**: Weinetikett fotografieren, Felder werden via KI automatisch ausgelesen. Erfordert Anthropic API-Key. Kosten ca. 1–3 Rappen pro Scan. (Entscheid: 19.06.2026)
