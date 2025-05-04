import os
import json
import requests
from urllib.parse import quote
from bs4 import BeautifulSoup
import time

# Directory to save datasheets
DATASHEET_DIR = "datasheets"

# Load component database
with open("components_equiv_db.json", "r", encoding="utf-8") as f:
    components = json.load(f)

os.makedirs(DATASHEET_DIR, exist_ok=True)

# Helper to find a likely datasheet URL (alldatasheet.com search)
def find_alldatasheet_url(part_number):
    return f"https://www.alldatasheet.com/view.jsp?Searchword={quote(part_number)}"

# Try to download the first PDF from alldatasheet.com search results
def try_download_pdf_alldatasheet(part_number):
    search_url = f"https://www.alldatasheet.com/view.jsp?Searchword={quote(part_number)}"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        resp = requests.get(search_url, headers=headers, timeout=15)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.content, "html.parser")
        # Find first datasheet result link
        link = soup.find('a', href=True, string=lambda s: s and 'Datasheet' in s)
        if not link:
            return None
        detail_url = link['href']
        if not detail_url.startswith('http'):
            detail_url = "https://www.alldatasheet.com" + detail_url
        # Fetch the detail page
        detail_resp = requests.get(detail_url, headers=headers, timeout=15)
        if detail_resp.status_code != 200:
            return None
        detail_soup = BeautifulSoup(detail_resp.content, "html.parser")
        # Find the direct PDF download link
        pdf_link = detail_soup.find('a', href=True, string=lambda s: s and 'Download' in s)
        if not pdf_link:
            return None
        pdf_url = pdf_link['href']
        if not pdf_url.startswith('http'):
            pdf_url = "https://www.alldatasheet.com" + pdf_url
        # Download the PDF
        pdf_resp = requests.get(pdf_url, headers=headers, timeout=20)
        if pdf_resp.status_code == 200 and pdf_resp.headers.get("Content-Type", "").startswith("application/pdf"):
            return pdf_resp.content
    except Exception as e:
        print(f"[ERROR] Exception for {part_number}: {e}")
    return None

for c in components:
    part_number = c.get("partNumber")
    if not part_number:
        continue
    pdf_path = os.path.join(DATASHEET_DIR, f"{part_number}.pdf")
    if os.path.exists(pdf_path):
        print(f"[SKIP] {pdf_path} already exists.")
        continue
    # Try alldatasheet.com automatic download
    pdf_content = try_download_pdf_alldatasheet(part_number)
    if pdf_content:
        with open(pdf_path, "wb") as f:
            f.write(pdf_content)
        print(f"[OK] Downloaded {pdf_path} from alldatasheet.com")
        time.sleep(2)
        continue
    # If not found, print manual download info
    print(f"[MANUAL] Download for {part_number} at: {find_alldatasheet_url(part_number)}")
    time.sleep(1)
