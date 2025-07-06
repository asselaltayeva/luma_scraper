(async function() {
  const attendeeLinks = Array.from(document.querySelectorAll('a[href^="/user/"]'));
  const seen = new Set();
  const attendees = [];

  for (const link of attendeeLinks) {
    const url = link.href.startsWith('http') ? link.href : (location.origin + link.getAttribute('href'));
    if (seen.has(url)) continue;
    seen.add(url);
    attendees.push({
      name: link.textContent.trim(),
      profileUrl: url
    });
  }

  async function getLinkedIn(profileUrl) {
    try {
      const res = await fetch(profileUrl, { credentials: 'include' });
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const socialLinks = Array.from(doc.querySelectorAll('.social-links a'));
      const linkedinLink = socialLinks.find(a => /linkedin\.com/i.test(a.href));
      return linkedinLink ? linkedinLink.href : '';
    } catch (e) {
      return '';
    }
  }

  const rows = [
    ['Name', 'Profile URL', 'LinkedIn']
  ];

  for (const attendee of attendees) {
    const linkedin = await getLinkedIn(attendee.profileUrl);
    rows.push([
      attendee.name,
      attendee.profileUrl,
      linkedin
    ]);
    console.log(`Processed: ${attendee.name}`);
    await new Promise(r => setTimeout(r, 500));
  }

  const csv = rows.map(r => r.map(x => `"${(x || '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'luma_linkedin.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
})();
