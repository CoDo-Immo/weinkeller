# Mein Weinkeller – Release Notes v1.2

**Datum:** 21.06.2026  
**Vorherige Version:** v1.1

---

## Übersicht

Version 1.2 bringt eine überarbeitete Weinliste mit kompakterer Darstellung, deutlich erweiterte Filtermöglichkeiten sowie einen komplett neuen Etiketten-Scanner mit OCR-Erkennung.

---

## Neue Funktionen

### Etiketten-Scanner (OCR)
Der bisherige Barcode-Scanner wurde durch einen Etiketten-Scanner ersetzt. Die Kamera fotografiert die Weinetikett; Tesseract.js analysiert das Bild und füllt das Erfassungsformular automatisch vor:
- Weinname und Weingut
- Jahrgang (vierstellige Jahreszahl)
- Weintyp (Rot, Weiss, Rosé, Schaum)
- Land (aus Regionen und Begriffen auf dem Etikett erkannt)
- BIO-Kennzeichnung

Unterstützte Sprachen: Deutsch, Französisch, Italienisch, Englisch.

### Filter: Eignung
Neues Textfeld im Filterpanel. Eingabe eines Begriffs (z. B. «Fisch», «Käse») zeigt alle Weine, in deren Eignungsfeld dieser Begriff vorkommt.

### Filter: Rebsorte als Suche
Die Rebsorte-Auswahl wurde von einem Dropdown auf ein Freitextfeld umgestellt. Die Suche arbeitet mit Teilübereinstimmung – Weine mit mehreren Rebsorten werden korrekt gefunden (z. B. «Pinot» findet «Pinot Noir, Merlot»).

---

## Verbesserungen

### Weinliste – kompaktere Darstellung
- Weingut, Länderfahne, Gebiet und Jahrgang werden auf einer einzigen Zeile zusammengefasst.
- Die Liste ist jetzt alphabetisch nach Weinname sortiert.
- Die Sternebewertung erscheint direkt in der Titelzeile zwischen dem Namen und der Flaschenanzahl.

### Länderfahnen
- In der Weinliste wird nur noch das Flaggen-Emoji angezeigt (ohne Ländernamen).
- In der Detailansicht bleibt der vollständige Ländername mit Flagge erhalten.

### Filter: Startreihenfolge
Der Trinkreife-Status-Filter ist beim Öffnen der App automatisch auf «Trinkbereit» voreingestellt. Alle anderen Filter starten auf «Alle».

### Filter: Neue Reihenfolge
Das Filterpanel ist jetzt logisch gegliedert:
1. Typ
2. Eignung
3. Rebsorte
4. Mindest-Bewertung
5. Trinkreife-Status
6. Anbau
7. Status

---

## Behobene Fehler

- Strukturfehler im HTML (doppeltes `</div>`) nach Umbau des Filterpanels behoben.
- Defekte `rebuildSorteDropdown`-Funktion nach Umstellung auf Texteingabe bereinigt.

---

## Technische Abhängigkeiten

| Ressource | Version | Zweck |
|---|---|---|
| Tabler Icons | 3.19.0 | Icons (CDN) |
| Tesseract.js | 5.x | OCR-Erkennung beim Etikett-Scan (lazy load) |

Alle Daten werden lokal im Browser (`localStorage`) gespeichert. Es wird keine Serververbindung benötigt – ausser beim Etikett-Scan (Tesseract.js-Download beim ersten Einsatz).
