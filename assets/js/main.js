(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Copy SMS template
  const copyBtn = $("[data-copy-sms]");
  const sms = $(".sms-template");
  if (copyBtn && sms) {
    copyBtn.addEventListener("click", async () => {
      const text = sms.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied ✅";
        setTimeout(() => (copyBtn.textContent = "Copy template"), 1400);
      } catch (e) {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        copyBtn.textContent = "Copied ✅";
        setTimeout(() => (copyBtn.textContent = "Copy template"), 1400);
      }
    });
  }

  // Copy phone number
  const copyNumBtn = $("[data-copy-number]");
  if (copyNumBtn) {
    copyNumBtn.addEventListener("click", async () => {
      const num = "(504) 345-8049";
      try {
        await navigator.clipboard.writeText(num);
        copyNumBtn.textContent = "Copied ✅";
        setTimeout(() => (copyNumBtn.textContent = "Copy phone number"), 1400);
      } catch (e) {
        copyNumBtn.textContent = num;
        setTimeout(() => (copyNumBtn.textContent = "Copy phone number"), 2200);
      }
    });
  }

  // Share
  const shareBtn = $("[data-share]");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const url = window.location.href;
      const title = "Telly Tech — In-home tech help";
      const text = "Same-day in-home tech support in New Orleans. $75 flat rate (most jobs).";
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url });
        } catch (e) { /* user canceled */ }
      } else {
        try {
          await navigator.clipboard.writeText(url);
          shareBtn.textContent = "Link copied ✅";
          setTimeout(() => (shareBtn.textContent = "Share with a neighbor"), 1400);
        } catch (e) {
          window.prompt("Copy this link:", url);
        }
      }
    });
  }

  // Cheap reveal animations
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          ent.target.classList.add("is-visible");
          io.unobserve(ent.target);
        }
      }
    }, { threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

})();
