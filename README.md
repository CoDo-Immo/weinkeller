# Mein Weinkeller – Release Notes v1.4

**Datum:** 23.06.2026  
**Vorherige Version:** v1.3

---

## Übersicht

Version 1.4 ergänzt die Wein-Erfassung um das Feld **Trinktemperatur**, erweitert die **Anbau**-Auswahl und verlegt **Speichern/Abbrechen** als Symbole in die Kopfzeile der Erfassungsmaske. Datenhaltung (Supabase) und Bereitstellung (GitHub Pages) bleiben unverändert.

---

## 🌡️ Neue Felder & Werte

### Neues Feld: Trinktemperatur
In der Erfassen/Bearbeiten-Maske gibt es neu ein Textfeld **Trinktemperatur** direkt unter «Eignung» (z.B. „16–18 °C"). Der Wert erscheint in der Detailansicht und wird im CSV- und JSON-Export mitgeführt. In der Datenbank wurde dafür die Spalte `trinktemperatur` ergänzt (siehe `update_v1.4_trinktemperatur.sql`).

### Erweiterte Anbau-Werte
Das Auswahlfeld «Anbau» und der zugehörige Filter bieten neu zusätzlich **Biodynamisch** 🌙, **Demeter** 🌱 und **Konventionell** 🚜. Die bisherigen Werte BIO 🌿 und Nachhaltig ♻️ bleiben erhalten.

---

## ✨ Benutzeroberfläche

### Speichern & Abbrechen als Symbole oben
In der Erfassen/Bearbeiten-Maske sind «Speichern» und «Abbrechen» neu als Symbole oben rechts neben dem Titel platziert: ✓ (Speichern, mit Lade-Animation während des Speicherns) und ✕ (Abbrechen/Schliessen). Die frühere Button-Reihe am unteren Rand entfällt.

---

## 🚀 Bereitstellung

Vor dem ersten Speichern eines Trinktemperatur-Werts die Migration `update_v1.4_trinktemperatur.sql` in Supabase → SQL Editor ausführen. Anschliessend `index.html` auf GitHub aktualisieren (siehe `GitHub_Deploy_v1.4.md`). Die persönlichen Weindaten auf Supabase sind vom Upload nicht betroffen.

---

# Release Notes v1.3

**Datum:** 22.06.2026  
**Vorherige Version:** v1.2

---

## Übersicht v1.3

Version 1.3 ist ein grösserer Umbau: Die Datenhaltung wechselt von lokalem Browser-Speicher auf eine sichere Cloud-Datenbank (Supabase). Neu ist ein Login-System, geräteübergreifender Zugriff sowie ein App-Icon für den Smartphone-Homescreen.

---

## ☁️ Cloud & Synchronisation

### Supabase Cloud-Datenbank
Alle Weine werden neu in einer sicheren Cloud-Datenbank gespeichert – kein lokaler Browser-Speicher mehr. Daten bleiben erhalten, auch wenn der Browser-Cache gelöscht wird.

### Login mit E-Mail und Passwort
Neues Anmeldesystem mit Registrierung und Login. Daten sind nur nach erfolgreicher Anmeldung zugänglich.

### Geräteübergreifender Zugriff
Mit denselben Login-Daten kann die App auf beliebig vielen Geräten (Smartphone, Tablet, PC) genutzt werden. Alle Geräte zeigen denselben Weinbestand.

### Datenmigration vom Vorgänger
Bestehende Weine aus der Version ohne Cloud-Anbindung konnten einmalig per Erstimport in die neue Datenbank übernommen werden.

---

## ✨ Benutzeroberfläche

### Gleichmässige Aufteilung Rebsorte / Ausbau
In der Weinliste teilen sich Rebsorte und Ausbau neu je genau die Hälfte der Zeile – übersichtlicher und konsistenter.

### Bewertungssterne in Weinfarbe
Die Sterne in der Weinliste werden je nach Weintyp eingefärbt: Rot für Rotwein, Gold für Weisswein, Rosa für Rosé usw.

### Filter-Aktiv-Leiste dezenter gestaltet
Die Anzeige aktiver Filter erscheint neu in einem ruhigen, warmen Grauton statt dem früheren grellen Farbton.

### Neues Feld: Region
In der Weinliste und im Erfassungsformular wurde das Feld „Region" ergänzt (z.B. Médoc, Pauillac). Es erscheint zwischen Gebiet und Jahrgang.

---

## 📱 App & Installation

### App-Icon für Smartphone
Die App kann jetzt mit einem eigenen Icon zum Homescreen hinzugefügt werden. Das Icon zeigt eine Weinflasche mit Trauben auf weinrotem Hintergrund.

### Web App Manifest
Dank `manifest.json` verhält sich die App auf Android und iOS wie eine native App: kein Browser-Chrome, Vollbild, korrekter App-Name.

### Hosting auf GitHub Pages
Die App ist über **https://codo-immo.github.io/weinkeller/** erreichbar – kostenlos, HTTPS, immer aktuell nach jedem GitHub-Upload.

---

## 🗑️ Entfernte Funktionen

### Etiketten-Scanner entfernt
Der Kamera-Scanner für Weinetiketten wurde entfernt, da die Texterkennung keine zuverlässigen Ergebnisse lieferte.

### Datenergänzung via Claude API entfernt
Die automatische Datenanreicherung via KI wurde wieder entfernt, da direkte Browser-zu-API-Aufrufe aufgrund von CORS-Einschränkungen nicht zuverlässig funktionieren.

---

## ⚙️ Technischer Hintergrund

| Was | Details |
|---|---|
| Architektur | Single-File HTML-App (kein Framework) |
| Datenbank | Supabase PostgreSQL mit Row Level Security |
| Auth | Supabase Auth (E-Mail / Passwort) |
| Hosting | GitHub Pages |
| Kosten | CHF 0.– (Free Tier) |

| Ressource | Version | Zweck |
|---|---|---|
| Tabler Icons | 3.19.0 | Icons (CDN) |
| Supabase JS | 2.x | Datenbank & Auth (CDN) |

---

## Vorherige Versionen

### v1.2 – 21.06.2026
Etiketten-Scanner (OCR), erweiterte Filtermöglichkeiten (Eignung, Rebsorte als Freitextsuche), kompaktere Weinliste, Länderfahnen-Optimierung.

### v1.1
Grundversion mit lokalem Speicher, Barcode-Scanner, Grundfilter.
