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
  
    async function getContactInfo(profileUrl) {
      try {
        const res = await fetch(profileUrl, { credentials: 'include' });
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const socialLinks = Array.from(doc.querySelectorAll('.social-links a'));
        const result = {
          linkedin: '',
          email: ''
        };
        for (const a of socialLinks) {
          const href = a.href;
          if (/linkedin\.com/i.test(href)) result.linkedin = href;
          else if (/mailto:/i.test(href)) result.email = href.replace(/^mailto:/, '');
        }
        return result;
      } catch (e) {
        return {
          linkedin: '',
          email: ''
        };
      }
    }
  
    const rows = [
      ['Name', 'Profile URL', 'LinkedIn', 'Email']
    ];
    for (const attendee of attendees) {
      const contact = await getContactInfo(attendee.profileUrl);
      rows.push([
        attendee.name,
        attendee.profileUrl,
        contact.linkedin,
        contact.email
      ]);
      console.log(`Processed: ${attendee.name}`);
      await new Promise(r => setTimeout(r, 500));
    }
  
    const csv = rows.map(r => r.map(x => `"${(x||'').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'luma_attendees_linkedin_email.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })();
  