# Warenvorrat Adlemsried

Eine kleine Web-App zum Verwalten unseres privaten Warenvorrats. Sie zeigt alle eingelagerten Produkte, lässt sich nach Typ, Form und Jahr filtern und läuft auf Android, Apple und Windows – direkt im Browser, ohne Installation.

## Funktionen

- Alphabetische Liste aller eingelagerten Produkte mit Buchstaben-Gliederung
- Arten als Kacheln (mit Anzahl, «Alle» an letzter Stelle), Filter nach Form und Jahr sowie ein Suchfeld; Button «Filter zurücksetzen»
- Einlagerungsdatum («Eingelagert am», Default = Erfassungstag, nur im Formular sichtbar); Warnung bei Einlagerung über 1 Jahr (Badge «über 1 Jahr», Hinweisbalken mit Schnellfilter)
- Typen mit Icon dargestellt: 🥕 Gemüse · 🍎 Früchte · 🧀 Milchprodukte · 🌾 Trockenprodukte · 🍲 Gerichte · 🛒 Lebensmittel
- Einträge erfassen, bearbeiten, duplizieren und löschen
- Abbuchen einzelner Mengen beim Verbrauchen (Standard 1, anpassbar bis zum vorhandenen Bestand)
- Fusszeile mit Statistik nach Produkttyp (Anzahl Einträge je Typ, folgt den aktiven Filtern)
- CSV-Export der aktuell gefilterten Einträge (Semikolon-getrennt, mit UTF-8-BOM für Excel)
- Installierbar als App (eigenes Icon, Einmachglas) auf Handy und Desktop, offline-startfähig
- Kompaktes Design in Lavendel-Tönen

## Datenmodell

Ein Eintrag entspricht einer konkreten Einlagerung. Vom gleichen Produkt kann es mehrere Einträge geben (z.B. gefroren und eingemacht).

| Feld | Bedeutung |
|------|-----------|
| `produkt` | Name des Produkts |
| `typ` | Gemüse / Früchte / Milchprodukte / Trockenprodukte / Gerichte / Lebensmittel |
| `form` | getrocknet / gefroren / eingekellert / eingemacht / eingekocht / eingelagert |
| `jahr` | Einlagerungsjahr |
| `menge` | Anzahl (optional) |
| `einheit` | freier Text, Auswahl kommt aus der Supabase-Tabelle `einheiten` (siehe unten) |
| `notiz` | Freitext (optional) |
| `eingelagert_am` | Datum der Einlagerung (date, Default heute). Seit v2.1 – Migration `supabase_migration_einlagerungsdatum.sql` |
| `erstellt_am` | Zeitstempel, automatisch |

### Einheiten erweiterbar ohne Code-Änderung

Die Liste der Einheiten (kg, Gläser (gross/klein), Gefäss (gross/klein/mini), Beutel (gross/mittel/klein), Stück, Liter, Flaschen (gross/klein), Portionen, …) steht **nicht** mehr im Code, sondern in der Supabase-Tabelle `einheiten` (Spalten `name`, `sortierung`, `aktiv`). Neue Einheit hinzufügen: im Supabase **Table Editor** eine Zeile in `einheiten` einfügen (`name` = Bezeichnung, `sortierung` = Zahl für die Reihenfolge, `aktiv` = true) – sie erscheint danach automatisch in der App-Auswahl, ganz ohne `index.html` anzufassen. Eine Einheit ausblenden: `aktiv` auf `false` setzen, statt die Zeile zu löschen (bestehende Einträge mit dieser Einheit bleiben dann trotzdem lesbar). Existiert die Tabelle einmal nicht (z.B. frisch aufgesetztes Projekt vor der Migration) oder läuft die App im Demo-Modus, fällt sie auf eine feste Liste im Code zurück.

## Technik

- Eine einzige `index.html` (HTML, CSS, JavaScript) – keine Build-Schritte
- Daten in [Supabase](https://supabase.com) (PostgreSQL), Zugriff über die Supabase-JS-Bibliothek
- Veröffentlicht über GitHub Pages

## Versionierung

Die aktuelle Version steht rechts in der zweiten Titelzeile der App (`<span id="appVersion">` in `index.html`). Bei jeder Änderung beide Stellen gemeinsam hochzählen: Versionsnummer `vX.Y` und der Cache-Name `warenvorrat-vY` in `sw.js` – sonst kommt das Update bei installierten Geräten nicht an. Aktuell: **v2.1** / `warenvorrat-v11`.

## Dateien

| Datei | Zweck |
|-------|-------|
| `index.html` | Die App |
| `sw.js` | Service Worker – macht die App installierbar und offline-startfähig |
| `manifest.json` | App-Metadaten für «Zum Startbildschirm hinzufügen» |
| `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png` | App-Icon (Einmachglas) |
| `supabase_setup.sql` | Legt alle Datenbank-Tabellen (inkl. `einheiten`) für ein **neues** Supabase-Projekt an (nur einmal nötig, **nicht** auf GitHub laden) |
| `supabase_migration_einheiten.sql` | Für ein **bestehendes** Projekt: ergänzt nur die neue Tabelle `einheiten` (nur einmal nötig, **nicht** auf GitHub laden) |
| `ANLEITUNG.md` | Schritt-für-Schritt-Einrichtung von Supabase und GitHub |

## Einrichtung

Die vollständige Anleitung steht in [`ANLEITUNG.md`](ANLEITUNG.md). Kurz:

1. In Supabase ein Projekt anlegen und `supabase_setup.sql` im SQL-Editor ausführen.
2. In `index.html` oben die beiden Werte `SUPABASE_URL` und `SUPABASE_ANON_KEY` eintragen.
3. Alle App-Dateien ins GitHub-Repository laden und GitHub Pages aktivieren.

Ohne eingetragene Supabase-Werte startet die App in einem Demo-Modus mit Beispieldaten.

## Hinweis zur Sicherheit

Der `anon`/Publishable-Key steht im veröffentlichten Code – bei Supabase vorgesehen und in Kombination mit Row Level Security unbedenklich. Wer die App-Adresse kennt, kann jedoch Einträge lesen und ändern. Für einen privaten Familien-Vorrat ist das in der Regel ausreichend.

---

Privates Projekt · nicht zur Weitergabe bestimmt.
