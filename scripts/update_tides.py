#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from datetime import datetime
from urllib.request import Request, urlopen

URL = "https://maree.info/131"

HEADERS = {
    "User-Agent": "Navigoupa/1.0"
}


def download_html():
    request = Request(URL, headers=HEADERS)
    return urlopen(request).read().decode("utf-8")


def extract_table(html):

    match = re.search(
        r'<table[^>]*id="MareeJourDetail_0".*?</table>',
        html,
        re.S
    )

    if not match:
        raise Exception("Tableau des marées introuvable.")

    return match.group(0)


def extract_events(table):

    # Heures
    times = re.findall(r'>(\d{2}h\d{2})<', table)

    # Hauteurs
    heights = re.findall(r'>(\d,\d{2}m)<', table)

    # Coefficients
    coeffs = re.findall(r'<b>(\d+)</b>', table)

    events = []

    coeff_index = 0

    for i in range(len(times)):

        if i % 2 == 0:

            events.append({

                "type": "BM",

                "time": times[i],

                "height": heights[i]

            })

        else:

            coef = None

            if coeff_index < len(coeffs):

                coef = int(coeffs[coeff_index])

                coeff_index += 1

            events.append({

                "type": "PM",

                "time": times[i],

                "height": heights[i],

                "coefficient": coef

            })

    return events


def main():

    html = download_html()

    table = extract_table(html)

    events = extract_events(table)

    result = {

        "port": "Royan",

        "updated": datetime.utcnow().isoformat() + "Z",

        "source": URL,

        "events": events

    }

    with open("data/tides.json", "w", encoding="utf-8") as file:

        json.dump(
            result,
            file,
            indent=4,
            ensure_ascii=False
        )

    print("tides.json généré.")


if __name__ == "__main__":
    main()
