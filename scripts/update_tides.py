#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from datetime import datetime
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup

URL = "https://maree.info/131"

HEADERS = {
    "User-Agent": "Navigoupa/1.0"
}


def download():

    request = Request(URL, headers=HEADERS)

    return urlopen(request).read().decode("utf-8")


def parse(html):

    soup = BeautifulSoup(html, "html.parser")

    table = soup.find("table", id="MareeJourDetail_0")

    if table is None:
        raise Exception("Table MareeJourDetail_0 introuvable.")

    rows = table.find_all("tr")

    events = []

    for row in rows:

        cells = row.find_all("td")

        if len(cells) < 6:
            continue

        # Première colonne : BM / PM
        types = [
            t.strip()
            for t in cells[0].stripped_strings
            if t.strip() in ("BM", "PM")
        ]

        # Deuxième colonne : coefficients
        coeffs = []

        for item in cells[1].stripped_strings:

            item = item.strip()

            if item.isdigit():
                coeffs.append(int(item))
            else:
                coeffs.append(None)

        # Troisième colonne : heures
        times = [
            t.strip()
            for t in cells[2].stripped_strings
        ]

        # Sixième colonne : hauteurs
        heights = [
            h.strip()
            for h in cells[5].stripped_strings
        ]

        coef_index = 0

        for i in range(min(len(types), len(times), len(heights))):

            event = {
                "type": types[i],
                "time": times[i],
                "height": heights[i]
            }

            if types[i] == "PM":

                coef = None

                if coef_index < len(coeffs):
                    coef = coeffs[coef_index]

                event["coefficient"] = coef

                coef_index += 1

            events.append(event)

        break

    return events


def main():

    html = download()

    events = parse(html)

    output = {

        "port": "Royan",

        "updated": datetime.utcnow().isoformat() + "Z",

        "source": URL,

        "events": events

    }

    with open(
        "data/tides.json",
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            output,
            f,
            indent=4,
            ensure_ascii=False
        )

    print("tides.json mis à jour.")


if __name__ == "__main__":
    main()
