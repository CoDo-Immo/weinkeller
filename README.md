# Mein Weinkeller – Release Notes v3.6

**Datum:** 20.08.2026
**Vorherige Version:** v3.5

---

## Übersicht v3.6

Version 3.6 ergänzt das bestehende Rebsorten-Info-Fenster (🍇-Symbol, Weinliste und Detailansicht) um eine
**zweite Ebene**: Neben jeder Rebsorte steht jetzt ein **ℹ️-Symbol**, das ein Detailfenster mit der
ausführlichen Beschreibung und bekannten Alias-Namen dieser einen Sorte öffnet. Schliessen führt zurück zur
Rebsorten-Übersicht des Weins, nicht zur Weinliste. **Keine Datenbank-Migration nötig.**

### ℹ️ Rebsorten-Detailfenster

- **Trigger:** neues ℹ️-Symbol neben jedem Rebsortennamen im bestehenden Rebsorten-Fenster
  (`showRebsorteInfo()`), sowohl beim Icon in der Weinliste als auch beim Icon in der Detailansicht.
- **Inhalt:** Struktur (Körper/Säure/Tannin), Herkunft, Passt zu, Alias-Namen und die vollständige
  Beschreibung (`rebsorten.beschreibung`) der einzelnen Sorte.
- **Navigation:** eigenes Overlay `#rebiDetailOverlay` über dem bestehenden Rebsorten-Fenster; Schliessen
  (X, „Zurück", Klick daneben oder Escape) schliesst nur diese Ebene – die Rebsorten-Übersicht des Weins
  bleibt darunter offen.
- Fehlt zu einer Sorte die ausführliche Beschreibung, zeigt das Fenster einen entsprechenden Hinweistext
  statt eines leeren Felds.

---

# Mein Weinkeller – Release Notes v3.5

**Datum:** 14.08.2026
**Vorherige Version:** v3.4

---

## Übersicht v3.5

Version 3.5 ergänzt den **Weintyp «Alkoholfrei»** für entalkoholisierte Weine – als vollwertiger Typ mit
eigenem Filter-Chip, eigener Farbe und eigenem Badge. **Keine Datenbank-Migration nötig** (`typ` ist ein
freies Textfeld). Dazu kommt das neue Hilfsskript `skript/bilder_finder.mjs`, das Flaschenfotos für Weine
ohne Bild recherchiert.

### 🌿 Neuer Weintyp «Alkoholfrei»

- **Formular:** neuer Eintrag im Typ-Dropdown (nach Brandwein).
- **Filter:** neuer Chip 🌿 Alkoholfrei im Filterpanel, kombinierbar wie alle anderen Filter.
- **Farbe:** Grün `#5FA37E` – als Streifen links auf der Weinkarte (`.c-alk`), als Punkt vor dem Weinnamen
  (`.d-alk`) und in `dotColor()`; Badge in der Detailansicht hellgrün auf dunkelgrün (`#E3F1E9` / `#1F6B4A`).
- **Enricher:** `enricher.js` kennt den Typ und schlägt passende Werte vor – Entalkoholisierungsverfahren
  beim Ausbau, kurze Trinkreife (nicht lagerfähig), «nicht empfohlen» bei der Dekantierung, kühlere
  Serviertemperatur, Tannin nur bei entalkoholisierten Rotweinen.
- **Lückenfinder und Statistik** ziehen automatisch mit, da sie typunabhängig arbeiten.

### 📷 Neu: `skript/bilder_finder.mjs`

Sucht für alle Weine ohne `bild_url` Flaschenfotos: liest die Weine aus Supabase, lässt Claude AI mit
Web-Recherche **und Seitenabruf** (`web_search` + `web_fetch`) Produktseiten von Produzenten und Händlern
finden und liest dort die echte Bild-URL aus. Ergebnis ist ein HTML-Bericht mit Vorschau, Quelle,
Sicherheitsstufe (hoch/mittel/tief) und Direktlinks. Das Skript schreibt **nichts** in die Datenbank –
das gewählte Bild wird in der App hochgeladen, damit beide Grössen entstehen und die Datei im eigenen
Storage liegt statt an einem fremden Shop-Link zu hängen.

```
node bilder_finder.mjs              # alle Weine ohne Bild
LIMIT=5 OFFSET=0 node bilder_finder.mjs   # in Häppchen (empfohlen)
MERGE=j node bilder_finder.mjs      # Häppchen zu einem Bericht zusammenführen
NUR_GROSS=j node bilder_finder.mjs  # nur Weine ohne grosse Bildvariante
```

---

# Mein Weinkeller – Release Notes v3.3

**Datum:** 20.07.2026
**Vorherige Version:** v3.2

---

## Übersicht

Version 3.3 bringt **Weinbilder**: zu jedem Wein lässt sich ein Foto der Flasche hinterlegen. In der Weinübersicht erscheint es als schmales Bild links auf der Karte, in der Detailansicht gross – und ein Tipp darauf öffnet es formatfüllend mit **Pinch-Zoom** wie in der Fotos-App. Die Fotos liegen in einem neuen Supabase-Storage-Bucket. **Datenbank-Migration nötig** (`add_bild_url_und_storage.sql`).

### Nachtrag 24.07.2026

Der **Weinlücken-Finder** prüft neu auch das Feld **Boden** (bisher nicht abgedeckt). Passend dazu ergänzt der **Wein-Enricher** (`skript/enricher.js`) das Feld `boden` und zieht seit diesem Stand nach den Weinfeldern automatisch auch die **Rebsorten- und Weingut-Detailbeschreibungen** nach (Kombilauf). Keine Datenbank-Migration nötig (Spalte `boden` bestand bereits). Kein Versionssprung – Parity-Fix in v3.3.

---

## 📷 Neu: Bild pro Wein

Im Erfassungs- und Bearbeiten-Formular steht zuunterst im Abschnitt Keller das Feld **Bild der Flasche**: eine Vorschau links, daneben zwei Symbol-Buttons im Stil der Kopfzeilen-Icons – **Kamera** (Foto wählen bzw. auf dem Handy direkt knipsen) und **Papierkorb** (Bild entfernen, erscheint nur wenn ein Bild gesetzt ist). Während des Uploads dreht sich das Kamera-Symbol als Spinner, darunter läuft ein kurzer Statustext. Nach dem Upload muss der Wein wie gewohnt mit dem Häkchen gespeichert werden.

**In der Weinübersicht** steht das Bild links auf der Karte (44 × 100 px). Weine ohne Foto zeigen an derselben Stelle eine graue Flaschen-Silhouette, damit die Kartenhöhe einheitlich bleibt. Auch bei einem defekten Bild-Link springt die Karte auf diese Silhouette zurück.

**In der Detailansicht** steht das Bild zuoberst über dem Weinnamen, maximal 280 px hoch.

---

## 🔍 Vergrössern mit Zoom

Ein Tipp auf das Bild in der Detailansicht öffnet die Vollansicht auf schwarzem Grund:

- **Zwei Finger** zum Zoomen, stufenlos bis 6-fach
- **Doppeltipp** springt auf 2,5-fach und wieder zurück
- **Ziehen** verschiebt den Ausschnitt (im gezoomten Zustand)
- **Nach unten wischen**, neben das Bild tippen oder ✕ oben rechts schliesst
- Am Computer: **Mausrad** zoomt, **Esc** schliesst

Umgesetzt mit Pointer-Events und CSS-`transform`, ohne externe Bibliothek – die App bleibt eine einzige Datei.

---

## 🗜 Zwei Bildgrössen

Aus jedem Foto entstehen beim Upload **zwei Dateien** im Bucket `weinbilder`:

| Datei | Kante | ca. Grösse | Verwendung |
|-------|-------|-----------|------------|
| `…-thumb.jpg` | 200 px | ~10 KB | Liste und Detailansicht |
| `…-gross.jpg` | 1400 px | ~200 KB | nur bei der Vollansicht |

Das Verkleinern passiert im Browser (Canvas, JPEG-Qualität 0.82), bevor etwas hochgeladen wird – das spart Upload-Zeit und Speicher. Ohne diese Trennung würde das Blättern durch 75 Weine rund 15 MB laden.

Dazu kommen zwei neue Spalten in `wines`: `bild_url` und `bild_url_gross`. Fehlt die grosse Fassung (Bilder aus einer Zwischenfassung), fällt die Vollansicht auf das kleine Bild zurück.

---

## 🔐 Rechte

Der Bucket `weinbilder` ist **öffentlich lesbar** (nötig, damit die Bilder ohne Signatur angezeigt werden), Schreiben ist auf eingeloggte Nutzer beschränkt – der **Viewer-Demo-Zugang ist ausgenommen** und kann Bilder nur ansehen. Maximal 2 MB pro Datei, nur JPEG, PNG und WebP.

---

## 🚀 Bereitstellung

1. `add_bild_url_und_storage.sql` im Supabase SQL-Editor ausführen (Spalten + Bucket + Policies, idempotent).
2. `index.html` (v3.3) auf GitHub aktualisieren.
3. `Weinkeller_Bedienungsanleitung_v3.3.html` (gleicher Dateiname wie im Hilfe-Link!) zusätzlich ins Repo hochladen.

---

# Mein Weinkeller – Release Notes v3.2

**Datum:** 19.07.2026
**Vorherige Version:** v3.1

---

## Übersicht

Version 3.2 bringt einen **Weinlücken-Finder** und räumt die Rebsorten- und Weingut-Ansichten optisch auf. Ein neues Symbol in der Suchzeile listet alle Weine mit fehlenden Angaben auf. Die Aktions-Buttons **Neu** und **Lücken** wandern bei Rebsorten und Weingütern nach oben in die Titelzeile und werden zu farbig getönten Symbol-Buttons. Bei den Rebsorten kommt die Beschreibungs-Quelle neu von **Delinat** statt Wikipedia. Dazu diverse Feinschliffe: grössere Schrift, grössere Bearbeiten-Fenster, Zeilenumbrüche in Beschreibungen, dezenterer Filter-Balken. **Keine Datenbank-Migration nötig.**

---

## 🔍 Neu: Weinlücken-Finder

In der Suchzeile (neben Filter- und Import/Export-Symbol) gibt es ein neues **Lücken-Symbol** (`file-search`). Es öffnet die Liste **«Weine mit Lücken»**: alle aktiven Weine mit mindestens einem leeren Beschreibungsfeld, pro Wein mit den konkret fehlenden Feldern und deren Anzahl. **«Ergänzen»** öffnet den Wein direkt zum Bearbeiten. Geprüft werden dieselben Felder wie beim Wein-Enricher (Degustation, Eignung, Ausbau, Anbau, Rebsorte, Trinkreife ab/bis, Trinktemperatur, Dekantierung, Gebiet, Region, Marktpreis); Degustation und Eignung zählen auch als Lücke, wenn sie sehr kurz sind (<40 Zeichen). Inaktive Weine werden ausgeblendet, im Viewer-Modus ist das Symbol versteckt.

---

## 🧭 Kopfzeilen-Umbau: Rebsorten & Weingüter

Die Buttons **Neu** und **Lücken** sitzen neu oben in der Titelzeile (statt in der Toolbar) und sind farbig getönte Symbol-Buttons im Stil der Wein-Detailansicht: **Neu** in Weinrot-Ton, **Lücken** in Blau-Ton, **Schliessen (X)** neutral. Bei den Rebsorten bleiben die Filter-Chips (Alle/Rot/Weiss) darunter; bei den Weingütern bleibt nur das Suchfeld.

---

## 🍇 Rebsorten: Delinat, «Passt zu» grün, «Alias»

- **Quelle Delinat statt Wikipedia:** Der Button beim Beschreibungsfeld heisst neu **«Auf Delinat»** und öffnet die passende Delinat-Rebsortenseite (`delinat.com/<sorte>.html`) in einem neuen Tab zum Nachlesen und Kopieren. (Ein automatisches Ausfüllen aus Delinat ist wegen CORS nicht zuverlässig möglich – daher bewusst «Seite öffnen».)
- **«Passt zu» in Grün:** Die Eignungs-Zeile ist neu grün (`#7A8B5A`) wie die Speisebegleitung in der Weinübersicht.
- **«Alias» statt «Auch»:** Das Synonym-Label heisst neu «Alias».
- **Zeilenumbrüche** in der Beschreibung werden angezeigt.

Die Weingüter behalten den Wikipedia-Button.

---

## 🏰 Weingüter: Zeilenumbrüche & Leerzeile

Beschreibung und Anbau zeigen neu **Zeilen- und Absatzumbrüche** – im Weingut-Info-Fenster wie in der Verwaltungsliste. Zwischen Beschreibung und Anbau steht neu eine **Leerzeile** zur besseren Lesbarkeit.

---

## 🔠 Feinschliff

- **Grössere Schrift:** Fliesstext etwas grösser (Titel nur leicht), Link-Icons grösser – bessere Lesbarkeit auf dem Handy.
- **Grössere Bearbeiten-Fenster:** Die Bearbeiten-Popups von Rebsorte und Weingut öffnen fast bildschirmhoch, mit **fixierter Kopfzeile** (Speichern/Abbrechen immer sichtbar) und höheren Textfeldern.
- **Dezenter Filter-Balken:** Der Balken für aktive Filter hat einen fast neutralen Hintergrund mit **roter Schrift**.

---

## 🚀 Bereitstellung

1. Keine Datenbank-Migration nötig.
2. `index.html` (v3.2) auf GitHub aktualisieren.
3. `Weinkeller_Bedienungsanleitung_v3.2.html` (gleicher Dateiname wie im Hilfe-Link!) zusätzlich ins Repo hochladen – sonst führt das Hilfe-Symbol ins Leere.

---

# Mein Weinkeller – Release Notes v3.1

**Datum:** 17.07.2026
**Vorherige Version:** v3.0

---

## Übersicht

Version 3.1 ergänzt bei den Weingütern ein Feld **Webseite** und bringt den **Google-Maps-Link direkt in die Weinliste**. Neben jedem Weingut erscheinen neu kleine Icons: ein **Globus** (öffnet die offizielle Weingut-Webseite) und ein **Pin** (Google-Maps-Suche) – sowohl in der Weinliste als auch im Weingut-Info-Fenster. Der farbige Akzentbalken der Weingut-Karten (Übersicht und Info-Fenster) wechselt von Weinrot auf **Grün**. Einmalig muss `add_weingut_webseite.sql` in Supabase ausgeführt werden; die Webseiten der 34 bestehenden Weingüter sind bereits erfasst.

---

## 🌐 Neues Feld: Webseite (Weingut)

Die Tabelle `weingueter` erhält die Spalte `webseite`. Ist eine URL hinterlegt, erscheint neben dem Weingut – in der Weinliste, in der Weingut-Übersicht und im Weingut-Info-Fenster – ein Globus-Icon bzw. ein «Webseite öffnen»-Link, der die offizielle Seite in einem neuen Tab öffnet. Die Webseiten der bestehenden 34 Weingüter wurden recherchiert und eingetragen (5 ohne eigene Seite: Calendal, Capolavoro, Château Lafon La Tuilerie, Château Roc Mignon, Josep Girones Llop).

**Supabase-Migration (einmalig):** `add_weingut_webseite.sql` im SQL Editor ausführen.

---

## 📍 Google-Maps-Link in der Weinliste

Der bisher nur im Weingut-Info-Fenster verfügbare Google-Maps-Link (Namenssuche aus Weingut + Region/Gebiet/Land) erscheint neu als Pin-Icon **direkt in der Weinliste** neben dem Weingut – ohne dass zuerst das Info-Fenster geöffnet werden muss.

---

## 🟢 Weingut-Karten in Grün

Der farbige Balken links an den Weingut-Karten – in der Weingut-Übersicht wie im Info-Fenster – ist neu **grün** (hell `#3B6D11`, dunkel `#97C459`) statt weinrot. Die «Weingut»-Plakette im Info-Fenster ist entsprechend grün. Rebsorten-Karten bleiben unverändert.

---

## 🚀 Bereitstellung

1. `add_weingut_webseite.sql` im Supabase SQL Editor ausführen (einmalig).
2. `index.html` (v3.1) auf GitHub aktualisieren.
3. `Weinkeller_Bedienungsanleitung_v3.1.html` (gleicher Dateiname wie im Hilfe-Link!) zusätzlich ins Repo hochladen – sonst führt das Hilfe-Symbol ins Leere.

---

# Mein Weinkeller – Release Notes v3.0

**Datum:** 16.07.2026
**Vorherige Version:** v2.10

---

## Übersicht

Version 3.0 macht **Rebsorten- und Weingut-Übersicht bearbeitbar**: beide lassen sich neu direkt in der App **hinzufügen, bearbeiten und löschen**, je mit einem neuen Freitextfeld **Beschreibung**. Ein **«Lücken»-Button** zeigt fehlende bzw. unbeschriebene Einträge aus dem eigenen Weinbestand, und **«Aus Wikipedia laden»** füllt die Beschreibung als Entwurf. Zusätzlich wurde die Kopfzeile entlastet – die **Versionsbezeichnung** wanderte in eine neue **Fusszeile** zusammen mit der **Anzahl Weine**. Einmalig müssen `add_beschreibung_und_crud_policies.sql` (Rebsorten) und `add_weingut_beschreibung_und_crud_policies.sql` (Weingüter) in Supabase ausgeführt werden.

---

## 🍇 Rebsorten bearbeiten, hinzufügen, löschen

In der Rebsortenübersicht (Trauben-Symbol im Header) gibt es für angemeldete Admins neu einen **+ Neu**-Button in der Filterleiste sowie pro Rebsortenkarte die Symbole **✏️ Bearbeiten** und **🗑 Löschen**. Das Formular umfasst Name, Typ (Rot/Weiss), Herkunft, Körper, Säure, Passt zu (Eignung), Charakter, Aliase und das neue Feld Beschreibung. Änderungen werden direkt in der Supabase-Tabelle `rebsorten` gespeichert und die Übersicht sofort aktualisiert. **Viewer** sehen die Rebsorten weiterhin nur lesend – die Bearbeiten-/Neu-/Löschen-Schaltflächen sind ausgeblendet und serverseitig per RLS blockiert.

---

## 📝 Neues Feld: Beschreibung

Rebsorten erhalten ein mehrzeiliges Freitextfeld **Beschreibung** für ausführlichere Angaben. Ist ein Wert erfasst, erscheint er als eigener Absatz unten auf der Rebsortenkarte. Das Feld kann leer bleiben und jederzeit später ergänzt werden.

**Supabase-Migration nötig (einmalig):**
```sql
ALTER TABLE public.rebsorten ADD COLUMN IF NOT EXISTS beschreibung text;
```
Vollständig inkl. Schreibrechte (Insert/Update/Delete für Nicht-Viewer) in Datei: `add_beschreibung_und_crud_policies.sql`

---

## 📐 Kopfzeile & Fusszeile

Da der Platz in der Kopfzeile knapp ist, wurde die **Versionsbezeichnung aus der Kopfzeile entfernt**. Sie steht neu in einer schlichten **Fusszeile** am unteren Rand – zusammen mit der **Anzahl Weine** im Keller (z.B. «124 Weine · v3.0»). Der Zähler aktualisiert sich automatisch.

---

## 🏰 Weingut-Verwaltung (analog Rebsorten)

Neu gibt es im Header ein **🏰 Weingut-Symbol**, das eine **Weingut-Übersicht** öffnet – analog zur Rebsortenübersicht, mit Suche sowie (als Admin) **+ Neu**, **✏️ Bearbeiten** und **🗑 Löschen**. Das Bearbeiten-Formular umfasst Name, **Beschreibung** (führendes Feld), Anbau und Aliase. Das frühere Feld **Charakter** wurde mit der Beschreibung zusammengeführt: bestehende Charakter-Texte wandern per Migration in die Beschreibung, und in der Kartenansicht erscheint die Beschreibung ohne Label zuoberst. Änderungen gehen direkt in die Supabase-Tabelle `weingueter`. Dafür ist einmalig `add_weingut_beschreibung_und_crud_policies.sql` auszuführen (Spalte `beschreibung` + Datenübernahme aus `charakter` + Schreibrechte für Nicht-Viewer).

---

## 🔎 «Lücken»-Button: fehlende Beschreibungen finden

In beiden Übersichten (Rebsorten und Weingüter) gibt es für Admins einen **«Lücken»-Button**. Er scannt alle Weine im Keller und listet zwei Gruppen: Einträge, die **ganz fehlen** (in Weinen verwendet, aber ohne Referenzzeile → «Anlegen»), und Einträge **ohne Beschreibung** (→ «Ergänzen»). Jede Zeile zeigt, in wie vielen Weinen der Eintrag vorkommt; ein Tipp öffnet die vorausgefüllte Bearbeiten-Maske. So sieht man auf einen Blick, wo noch Pflege nötig ist.

---

## 🌐 «Aus Wikipedia laden»

Im Bearbeiten-Formular (Rebsorte wie Weingut) gibt es beim Beschreibungsfeld einen Button **«Aus Wikipedia laden»**. Er holt die Zusammenfassung der deutschen (ersatzweise englischen) Wikipedia direkt aus der App und setzt sie als **Entwurf** ins Beschreibungsfeld – du prüfst und kürzt vor dem Speichern. Bei Rebsorten meist ein Treffer; bei kleinen Weingütern oft kein Eintrag (dann ein Hinweis). Strukturierte Felder (Körper, Säure, Herkunft, Charakter) füllt Wikipedia nicht – dafür bleibt der bestehende Enricher (`weinkeller-rebsorten` / `weinkeller-enricher`) zuständig. Ein direkter Claude-KI-Abruf aus der App ist wegen CORS/Key-Schutz nicht möglich.

---

## 🚀 Bereitstellung

1. `add_beschreibung_und_crud_policies.sql` (Rebsorten) **und** `add_weingut_beschreibung_und_crud_policies.sql` (Weingüter) im Supabase SQL Editor ausführen (je einmalig) – **ohne diese Schritte schlägt das Speichern/Löschen fehl**.
2. `index.html` (v3.0) auf GitHub aktualisieren.
3. `Weinkeller_Bedienungsanleitung_v3.0.html` (gleicher Dateiname wie im Hilfe-Link!) zusätzlich ins Repo hochladen – sonst führt das Hilfe-Symbol ins Leere.

---

# Mein Weinkeller – Release Notes v2.10

**Datum:** 11.07.2026 (Rebsorten-Übersicht ergänzt 15.07.2026)
**Vorherige Version:** v2.9

---

## Übersicht

Version 2.10 ergänzt zwei neue Header-Symbole. Das **🍇 Rebsorten-Symbol** (rechts vom Hilfe-Symbol) öffnet direkt in der App eine Übersicht aller im Keller erfassten und beschriebenen Rebsorten. Das **🍽 Weinkombinationen-Symbol** verlinkt auf eine separat gehostete Seite (`Weinkeller_weinkombinationen.html`) mit fertig zusammengestellten Wein-Kombinationen für ein vegetarisches 4-Gänge-Menü aus dem eigenen Keller. Keine Datenbank-Migration nötig.

---

## 🍇 Neu: Rebsorten-Übersicht im Header

Neues Icon im Header direkt **rechts vom Hilfe-Symbol**. Ein Tipp darauf öffnet – ohne neuen Tab, als Overlay in der App – eine Übersicht **aller Rebsorten**, die im Keller erfasst und beschrieben sind (Supabase-Tabelle `rebsorten`). Mit Suchfeld (Name, Herkunft, Charakter) und Filter nach **Rot/Weiss**. Pro Sorte werden Herkunft, Körper, Säure, Charakter, passende (vegetarische) Gerichte und bekannte Synonyme angezeigt. Die Daten sind bereits beim App-Start geladen – es entsteht keine zusätzliche Datenbank-Abfrage. Im Unterschied zum Trauben-Icon bei einem einzelnen Wein (B5) zeigt dieses Fenster alle Sorten auf einmal.

---

## 🍽 Neu: Weinkombinationen-Symbol im Header

Icon im Header (nach dem Rebsorten-Symbol, vor dem Abmelde-Symbol) öffnet in einem neuen Tab eine statische Seite mit fünf Wein-Kombinationen (A–E), je aufgebaut nach Weincharakteristik (Säure, Körper, Tannin, Holzeinsatz, Süsse) statt nach den Datenbankfeldern „Bewertung"/„Eignung". Pro Kombination eine Tabelle mit Gang, Wein, Bestand, Trinkreife-Status, Eigenschaft und passendem Gericht.

---

## 🚀 Bereitstellung

1. Keine Supabase-Migration nötig – die Rebsorten-Übersicht liest die bereits vorhandene Tabelle `rebsorten`.
2. `index.html` auf GitHub aktualisieren.
3. `Weinkeller_Bedienungsanleitung_v2.10.html` UND `Weinkeller_weinkombinationen.html` (beide mit exakt diesem Dateinamen) zusätzlich ins Repo hochladen – sonst führen Hilfe- bzw. Weinkombinationen-Symbol ins Leere. (Die Rebsorten-Übersicht selbst braucht keine zusätzliche Datei, sie steckt in der `index.html`.)

---

# Mein Weinkeller – Release Notes v2.9

**Datum:** 11.07.2026
**Vorherige Version:** v2.8

---

## Übersicht

Version 2.9 teilt die bisherige einheitliche **Bewertung** in zwei getrennte Bewertungen auf: **Bewertung Jill** und **Bewertung Gian**, beide neu auf einer **4-Sterne-Skala** (vorher 5). In der Weinübersicht erscheinen beide Bewertungen jetzt immer – auch unbewertet – farbig auf derselben Zeile wie der Weinname: **grün für Jill**, **gelb/gold für Gian**. Einmalig muss `add_bewertung_jill_falstaff.sql` in Supabase ausgeführt werden – dabei werden **alle bestehenden Bewertungen zurückgesetzt** (Skalenwechsel 5 → 4 Sterne lässt sich nicht verlustfrei übertragen).

---

## ⭐ Neu: Bewertung Jill / Gian getrennt, 4-Sterne-Skala

Die bisherige Spalte `bewertung` wurde in `bewertung_gian` umbenannt, dazu kommt die neue Spalte `bewertung_jill`. Beide laufen neu auf einer 1–4-Skala statt 1–5. In der Erfassungsmaske (Abschnitt Keller) stehen Jill und Gian nebeneinander in einer Zeile, je als 4-Sterne-Auswahl mit Lösch-Symbol (✕). In der Detailansicht erscheinen beide zusammengefasst in der Zeile «Bewertung».

---

## 🟢🟡 Weinübersicht: Bewertungen farbig und immer sichtbar

Die Kartenliste zeigt neu beide Bewertungen als je 4 Sterne auf derselben Zeile wie der Weinname – **Jill grün**, **Gian gelb/gold**. Anders als bisher werden sie immer angezeigt (auch unbewertet, dann als graue Umrisssterne), nicht mehr nur wenn ein Wert vorhanden ist.

---

## 🔍 Filter: Mindest-Bewertung berücksichtigt Jill oder Gian

Der Mindest-Bewertung-Filter im Filterpanel erfüllt sich neu, sobald **eine der beiden** Bewertungen (Jill oder Gian) den gewählten Wert erreicht – nicht mehr nur eine einzelne Bewertung.

---

## 🚀 Bereitstellung

1. `add_bewertung_jill_falstaff.sql` im Supabase SQL Editor ausführen (einmalig – **setzt alle bestehenden Bewertungen zurück**, benennt `bewertung` in `bewertung_gian` um, legt `bewertung_jill` an und entfernt eine allfällig vorhandene Spalte `falstaff` wieder)
2. `index.html` auf GitHub aktualisieren
3. `Weinkeller_Bedienungsanleitung_v2.9.html` (gleicher Dateiname!) zusätzlich ins Repo hochladen – sonst 404 beim Hilfe-Symbol

---

# Mein Weinkeller – Release Notes v2.8

**Datum:** 11.07.2026
**Vorherige Version:** v2.7

---

## Übersicht

Version 2.8 ergänzt einen **Google-Maps-Link** in der Weingut-Info sowie ein **Hilfe-Symbol im Header**, das direkt auf die Bedienungsanleitung verlinkt. Keine Datenbank-Migration nötig – zusätzlich zur `index.html` muss aber `Weinkeller_Bedienungsanleitung_v2.8.html` mit exakt diesem Namen mit hochgeladen werden, sonst führt der neue Hilfe-Link ins Leere.

---

## 📍 Neu: Google-Maps-Link in der Weingut-Info

Im Weingut-Info-Fenster (🏰-Icon) gibt es jetzt einen Link **«Auf Google Maps anzeigen»**. Er öffnet eine Kartensuche aus Weingut-Name + Region/Gebiet/Land des jeweiligen Weins im Browser bzw. in der Maps-App des Geräts. Keine exakte Adresse, aber die Gegend wird zuverlässig gezeigt.

---

## ❓ Neu: Hilfe-Symbol im Header

Links vom Abmelde-Symbol im Header erscheint ein neues Hilfe-Symbol, das die Bedienungsanleitung in einem neuen Tab öffnet (`Weinkeller_Bedienungsanleitung_v2.8.html`, auf GitHub Pages neben der `index.html`).

---

## 🚀 Bereitstellung

1. `index.html` auf GitHub aktualisieren
2. `Weinkeller_Bedienungsanleitung_v2.8.html` (gleicher Dateiname!) zusätzlich ins Repo hochladen – sonst 404 beim Hilfe-Symbol
3. Fertig, keine Supabase-Migration nötig

---

# Mein Weinkeller – Release Notes v2.7

**Datum:** 10.07.2026
**Vorherige Version:** v2.6

---

## Übersicht

Version 2.7 ergänzt zwei neue Felder: **Marktpreis** (Anzeige direkt unter dem Kaufpreis) und **Dekantierung** (neues Freitextfeld direkt nach der Trinktemperatur). Einmalig muss `add_dekantierung_column.sql` in Supabase ausgeführt werden.

---

## 💰 Neu: Marktpreis-Anzeige

In der Detailansicht erscheint neu der **Marktpreis** direkt unterhalb des Kaufpreises (Rubrik «Keller») – eine unverbindliche Einschätzung des aktuellen Werts, getrennt vom tatsächlich bezahlten Kaufpreis. Neues Zahlenfeld «Marktpreis (CHF)» in der Erfassungsmaske, im CSV-Export mitgeführt. Die Datenbankspalte `marktpreis` existierte bereits (vom Enricher genutzt), war aber bisher nicht in der App sichtbar.

---

## 🍷 Neues Feld: Dekantierung

Neues Freitextfeld **Dekantierung** in der Erfassungsmaske, direkt nach «Trinktemperatur» (z. B. «90 Minuten», «60–90 Minuten», «nicht empfohlen»). In der Detailansicht erscheint es ebenfalls direkt nach der Trinktemperatur. Für alle 68 bestehenden Weine wurde der Wert anhand der bisherigen Dekantier-Einschätzungen befüllt (45 mit konkreter Zeitangabe, 23 mit «nicht empfohlen»).

**Supabase-Migration (einmalig):** `add_dekantierung_column.sql` im SQL Editor ausführen.

---

## 🚀 Bereitstellung

1. `add_dekantierung_column.sql` im Supabase SQL Editor ausführen (einmalig)
2. `index.html` auf GitHub aktualisieren – fertig

---

# Mein Weinkeller – Release Notes v2.4

**Datum:** 29.06.2026
**Vorherige Version:** v2.3

---

## Übersicht

Version 2.4 erweitert Suche und Filter der App: neues Kopfzeilen-Suchfeld für Name/Weingut, Land-Filter im Filterpanel, neuer Status «Bestellen», mehrzeiliges Eignung-Feld und bereinigtes Filterpanel. Keine Datenbank-Migration nötig.

---

## 🔍 Neues Suchfeld: Name / Weingut

In der Kopfzeile gibt es neu ein zweites Suchfeld **Name / Weingut** direkt über dem Eignung-Suchfeld. Damit kann gezielt nach Weinname oder Weingut gesucht werden, ohne das Filterpanel zu öffnen. Die beiden Felder arbeiten unabhängig und können kombiniert werden.

---

## 📐 Suchfelder untereinander

Die zwei Kopfzeilen-Suchfelder sind **vertikal gestapelt** – gleiche Höhe, gleicher Look: «Name / Weingut» oben (volle Breite), «Eignung» darunter mit den Aktionsbuttons (Filter, Import/Export) rechts daneben.

---

## 🗺️ Neuer Filter: Land

Im Filterpanel gibt es nach «Rebsorte» neu ein **Land-Dropdown**. Die verfügbaren Länder werden dynamisch aus den geladenen Weinen befüllt (inkl. Länderfahne). Wird kein Land ausgewählt, werden alle Weine angezeigt. Das gewählte Land erscheint auch in der Filter-Aktiv-Leiste.

---

## 🏷️ Neuer Status: Bestellen

Die Status-Auswahl (Erfassungsmaske und Filter-Chips) kennt neu den Wert **🛒 Bestellen** – für Weine, die nachbestellt werden sollen. Der Filter-Chip erscheint im Filterpanel zwischen «📦 Bestellt» und «○ Inaktiv». In Weinliste und Detailansicht wird der Status als orangefarbenes Label dargestellt. Bestehende Werte (Aktiv, Bestellt, Inaktiv) bleiben unverändert.

---

## ✏️ Eignung als Textfeld (mehrzeilig)

Das Feld **Eignung** in der Erfassungsmaske ist neu ein mehrzeiliges Textarea – analog zum Feld «Degustation». Längere Einträge lassen sich damit bequemer erfassen und lesen.

---

## 🧹 Filterpanel: «Wein suchen» entfernt

Das Suchfeld «Wein suchen» wurde aus dem Filterpanel entfernt, da die Suche nach Name und Weingut neu direkt in der Kopfzeile verfügbar ist.

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
