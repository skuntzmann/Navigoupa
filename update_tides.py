#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from urllib.request import Request, urlopen

URL = "https://maree.info/131"

HEADERS = {
    "User-Agent": "Navigoupa/1.0"
}

request = Request(URL, headers=HEADERS)

html = urlopen(request).read().decode("utf-8")

match = re.search(
    r'<table[^>]*id="MareeJourDetail_0".*?</table>',
    html,
    re.S
)

if not match:
    raise Exception("Impossible de trouver le tableau des marées.")

table = match.group(0)

times = re.findall(r'>(\d{2}h\d{2})<', table)

heights = re.findall(r'>(\d,\d{2}m)<', table)

coeffs = re.findall(r'<b>(\d+)</b>', table)

result = {
    "port": "Royan",
    "source": "https://maree.info/131",
    "times": times,
    "heights": heights,
    "coefficients": coeffs
}

with open("data/tides.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=4, ensure_ascii=False)

print("tides.json généré avec succès")
