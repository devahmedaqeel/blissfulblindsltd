---
title: Service Locations & Coverage Areas
source: index.html #areas-covered section, footer, app.js region/postcode data, LocalBusiness structured data
---

## Peterborough Area
Peterborough City Centre, Stamford, Spalding, Wisbech, March, Whittlesey, Market
Deeping, Oundle, Yaxley, Crowland.
Postcode prefix: PE

## Leicester Area
Leicester City Centre, Loughborough, Hinckley, Wigston, Coalville, Melton Mowbray,
Market Harborough, Oadby, Lutterworth, Ashby-de-la-Zouch.
Postcode prefix: LE

## Luton Area
Luton Town Centre, Dunstable, Bedford, Leighton Buzzard, Houghton Regis, Ampthill,
Flitwick, Sandy, Biggleswade, Kempston.
Postcode prefixes: LU, SG

## Watford Area
Watford Town Centre, South Oxhey, Stanmore, Wembley.
Postcode prefixes: WD, HA

## Milton Keynes Area
Central Milton Keynes, Bletchley, Wolverton, Newport Pagnell, Stony Stratford, Olney,
Woburn Sands, Shenley Church End, Great Linford, Westcroft, Bradwell, Kingston.
Postcode prefix: MK

## Postcode checker logic (as implemented on the site)
The site's own postcode checker matches only the first 1–2 letters of a postcode to a
region:
- PE → Peterborough area
- LE → Leicester area
- LU, SG → Luton area
- WD, HA → Watford area
- MK → Milton Keynes area

If a customer's postcode prefix isn't one of these, the site's own checker tells them
they're outside the current service area and to call to confirm — the chatbot should
do the same rather than guess.

## Head office
75 Ringwood Bretton, Peterborough, PE3 9SR.
