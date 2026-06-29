# Mein Weinkeller – Release Notes v2.4

**Datum:** 29.06.2026
**Vorherige Version:** v2.3

---

## Übersicht

Version 2.4 erweitert die Suche in der Kopfzeile um ein dediziertes Feld für Name und Weingut, ergänzt den Status «Bestellen» und macht das Eignung-Feld in der Erfassungsmaske mehrzeilig. Keine Datenbank-Migration nötig.

---

## 🔍 Neues Suchfeld: Name / Weingut

In der Kopfzeile gibt es neu ein zweites Suchfeld **Name / Weingut** direkt neben dem Eignung-Suchfeld. Damit kann gezielt nach Weinname oder Weingut gesucht werden, ohne das allgemeine Suchfeld im Filterpanel zu öffnen. Die beiden Kopfzeilen-Suchfelder (Eignung und Name/Weingut) arbeiten unabhängig und können kombiniert werden.

---

## 🏷️ Neuer Status: Bestellen

Die Status-Auswahl (Erfassungsmaske und Filter) kennt neu den Wert **🛒 Bestellen** – für Weine, die nachbestellt werden sollen. Dieser Status erscheint als orangefarbenes Label in der Weinliste und Detailansicht. Bestehende Werte (Aktiv, Bestellt, Inaktiv) bleiben unverändert.

---

## ✏️ Eignung als Textfeld (mehrzeilig)

Das Feld **Eignung** in der Erfassungsmaske ist neu ein mehrzeiliges Textarea – analog zum Feld «Degustation». Längere Einträge lassen sich damit bequemer erfassen und lesen.

---

## 🚀 Bereitstellung

Keine Supabase-Migration nötig. `index.html` auf GitHub aktualisieren – fertig.

---

# Mein Weinkeller – Release Notes v2.3

**Datum:** 27.06.2026
**Vorherige Version:** v2.2

---

## Übersicht

Version 2.3 ergänzt das neue Feld **Boden** (Bodentyp des Weinbergs) und verbessert die Benutzeroberfläche der Detailansicht: Alle Aktionsicons sind neu oben rechts neben dem Weinnamen platziert. Einmalig muss `add_boden_column.sql` in Supabase ausgeführt werden.

---

## 🌱 Neues Feld: Boden

Neues Textfeld **Boden** in der Erfassungsmaske (nach «Ausbau»), z.B. «Kalkstein», «Schiefer, Lehm». In der Detailansicht erscheint es in der Rubrik **Wein** nach Ausbau und Anbau. Wird im CSV- und JSON-Export mitgeführt.

**Supabase-Migration (einmalig):** `add_boden_column.sql` im SQL Editor ausführen.

---

## ✨ Aktionsicons oben rechts

Alle Aktionsicons der Detailansicht sind neu oben rechts neben dem Weinnamen: 🗑 Löschen · 📋 Duplizieren · ➖ Abbuchen · ✕ Schliessen · ✏️ Bearbeiten. Die separate Aktionsleiste am unteren Ende entfällt.

---

## 🚀 Bereitstellung

1. `add_boden_column.sql` im Supabase SQL Editor ausführen (einmalig)
2. `index.html` auf GitHub aktualisieren – fertig

---

# Mein Weinkeller – Release Notes v2.2

**Datum:** 26.06.2026
**Vorherige Version:** v2.1

---

## Übersicht

Version 2.2 bringt einen **Viewer-Login** (Lesezugriff ohne Bearbeitungsrechte), eine verfeinerte **Sortierung** der Weinliste sowie die Anzeige von **Erfassungs- und Mutationsdatum** in der Detailansicht. Keine Datenbank-Migration nötig – lediglich die RLS-Policies in Supabase müssen einmalig aktualisiert werden (siehe `viewer_role_setup.sql`).

---

## 👁 Viewer-Login

Ein zweiter Account kann neu als reiner Lesezugriff eingerichtet werden – z.B. für Familienmitglieder oder Gäste. Der Viewer sieht alle Weine, kann aber nichts erfassen, bearbeiten, abbuchen oder löschen.

**Erkennungsmerkmale im Viewer-Modus:**
- Blauer «👁 Viewer»-Badge in der Topbar
- FAB-Button (+) zum Erfassen ausgeblendet
- Detailansicht zeigt nur den Schliessen-Button, keine Aktionsbuttons
- Erstimport-Bereich ausgeblendet

**Einrichtung:** `viewer_role_setup.sql` im Supabase SQL Editor ausführen, dann im Dashboard unter Authentication → Users einen neuen User anlegen mit Raw user metadata `{"role": "viewer"}`. Details in der Installationsanleitung.

---

## 🔤 Sortierung Weinliste

Bei Weinen mit identischem Namen und Weingut (z.B. mehrere Jahrgänge desselben Weins) werden die Einträge neu zusätzlich **nach Jahrgang aufsteigend** sortiert. Die alphabetische Primärsortierung bleibt erhalten.

---

## 📅 Erfassungs- und Mutationsdatum

In der Detailansicht erscheint unterhalb der Aktionsbuttons ein dezenter Block mit:
- **Erfasst:** Datum und Uhrzeit der ersten Erfassung
- **Geändert:** Datum und Uhrzeit der letzten Mutation (wird nur angezeigt, wenn das Datum vom Erfassungsdatum abweicht)

---

## 🚀 Bereitstellung

1. `viewer_role_setup.sql` im Supabase SQL Editor ausführen (einmalig)
2. Viewer-Account im Supabase Dashboard anlegen (optional)
3. `index.html` auf GitHub aktualisieren – fertig

---

# Mein Weinkeller – Release Notes v2.1

**Datum:** 25.06.2026
**Vorherige Version:** v2.0

---

## Übersicht

Version 2.1 optimiert die Suchlogik und reorganisiert die Suchleiste für ein intuitiveres Bedienkonzept. Keine Datenbank-Migration, keine Supabase-Änderungen nötig.

---

## 🔍 Suche & Filter

### Eignung-Suche: OR-Logik statt AND
Die Eignung-Suche arbeitet neu mit **OR-Logik**: Es werden alle Weine angezeigt, die mindestens einen der eingegebenen Begriffe enthalten. Bisher wurden nur Weine angezeigt, die *alle* Begriffe enthielten (AND). Damit sind breitere Suchanfragen wie «Fisch Käse» deutlich praktikabler.

### Eignung-Suche direkt in der Topbar
Das Eignung-Suchfeld wurde aus dem Filterpanel in die **Topbar** verschoben und ersetzt dort das allgemeine Suchfeld. Das allgemeine Suchfeld (Name, Weingut, …) ist neu im Filterpanel unter «Wein suchen» zu finden. Dadurch ist die häufig genutzte Eignung-Suche sofort erreichbar, ohne das Panel öffnen zu müssen.

---

## 🚀 Bereitstellung

`index.html` auf GitHub aktualisieren – fertig.

---

# Mein Weinkeller – Release Notes v2.0

**Datum:** 25.06.2026
**Vorherige Version:** v1.4

---

## Übersicht

Version 2.0 bringt drei UI-Verbesserungen und ein vollständig neues Desktop-Layout. Keine Datenbank-Migration nötig – alle Änderungen sind rein im Frontend.

---

## 🔍 Filter

### Eignung-Filter mit mehreren Suchbegriffen
Das Filterfeld «Eignung» unterstützt neu mehrere Suchbegriffe gleichzeitig – getrennt durch Leerzeichen oder Komma (z.B. «Fleisch Käse»). Die App zeigt nur Weine, die **alle** Begriffe enthalten (AND-Logik). Reihenfolge und genaue Schreibweise spielen keine Rolle.

---

## ✨ Benutzeroberfläche

### Aktionsleiste als farbige Icons
Die Aktionen in der Detailansicht werden ausschliesslich als Icons in einer Zeile dargestellt – kein Textbalken mehr. Reihenfolge: 🗑 Löschen (Rot) · 📋 Duplizieren (Weinrot hell) · ✕ Abbruch (Grau) · ✏️ Bearbeiten (Weinrot) · ➖ Abbuchen (Blau).

### Löschbestätigung als App-interner Dialog
Das native Browser-Bestätigungsfenster wurde durch einen eigenen Dialog ersetzt, der den Weinnamen anzeigt und zwei klar beschriftete Buttons bietet: «Abbrechen» und «Ja, löschen».

---

## 🖥️ Desktop-Layout (neu)

Ab 768px Viewport-Breite wechselt die App automatisch in ein **dreispaltiges Layout**:

- **Links (260px):** Filterbereich – immer sichtbar, kein Toggle-Button mehr nötig.
- **Mitte (flexibel):** Weinliste mit Stat-Bar am unteren Rand.
- **Rechts (380px):** Detailansicht – öffnet direkt beim Klick auf einen Wein, ohne Popup. Aktiver Wein wird in der Liste hervorgehoben.

Auf dem Smartphone (unter 768px) bleibt das Mobile-Layout mit Overlays vollständig erhalten.

---

## 🚀 Bereitstellung

Keine Supabase-Migration nötig. `index.html` auf GitHub aktualisieren – fertig.

---

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
