# 🕵️‍♀️ Luma Attendees LinkedIn Scraper

This is a browser-based script to extract LinkedIn profile URLs of attendees from a Luma event page.

## Features

- Collects names and profile URLs of all attendees listed on a Luma event.
- Visits each attendee's profile and scrapes their LinkedIn (if the attendee attached on his/her profile).
- Outputs a CSV file with the following columns:
  - Name
  - Profile URL
  - LinkedIn URL

## Usage

1. Open a Luma event Attendees page (you must be logged in). Scroll till the end of the attendees list.
2. Open the browser's Developer Console (`Cmd+Option+J` on Mac, `Ctrl+Shift+J` on Windows).
3. Type there 'allow pasting'.
3. Paste the entire script into the console and hit Enter.
4. The script will process each attendee and download a CSV when complete.

## Note

- If an attendee has no LinkedIn link, the field will be empty.

## Disclaimer

This tool is for educational or internal use only.  
Respect privacy and terms of service of websites and platforms.

---

Happy scraping!

