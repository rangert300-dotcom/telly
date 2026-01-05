document.addEventListener('DOMContentLoaded', () => {
  // Update Copyright Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Copy SMS Template
  const copyBtns = document.querySelectorAll('[data-copy-sms]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const template = document.querySelector('.sms-template').textContent;
      navigator.clipboard.writeText(template).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
});
