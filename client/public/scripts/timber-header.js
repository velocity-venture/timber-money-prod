(function(){
  // Pages where mascot should be hidden (e.g., Stripe checkout/success/cancel or heavy-focus flows)
  var HIDE_PATHS = [/^\/api\//, /\/checkout/i, /success/i, /cancel/i, /invoice/i, /webhook/i];

  function shouldHide(){
    var p = (location.pathname + location.search).toLowerCase();
    return HIDE_PATHS.some(function(rx){ return rx.test(p); });
  }
  if (shouldHide()) return;

  var el = document.createElement('div');
  el.id = 'timber-header';
  el.style.cssText = [
    'position:fixed','top:14px','right:14px','z-index:9999',
    'width:64px','height:64px','pointer-events:auto',
    'box-shadow:0 0 0 1px rgba(16,185,129,.35), 0 6px 18px rgba(0,0,0,.18)',
    'border-radius:50%'
  ].join(';');

  el.innerHTML = '' +
    '<div id="timber-wrap" style="position:relative;width:100%;height:100%;">' +
      '<img src="/mascot/timber-animated.svg" alt="Timber, your money guide" ' +
      'style="width:100%;height:100%;display:block;border-radius:50%" />' +
      '<div id="timber-tip" style="position:absolute;top:-6px;right:72px;max-width:220px;' +
      'background:#0f172a;color:#f8fafc;border:1px solid #10b981;border-radius:10px;padding:8px 10px;' +
      'font:500 12px/1.2 system-ui,Segoe UI,Inter,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.25);' +
      'display:none;">' +
        'Tip: Every dollar needs a job. Be wise as serpents—harmless as doves. Steward your money on purpose!' +
      '</div>' +
    '</div>';

  function attach(){
    document.body.appendChild(el);
    
    // Per-page tip variations
    var path = location.pathname.toLowerCase();
    var tip = el.querySelector('#timber-tip');
    var TIP_MAP = [
      { match: /^\/$/, text: "Welcome back. Every dollar needs a job. Let's put your money to work!" },
      { match: /pricing/i, text: "Smart investing starts with the right tools. Choose your plan wisely!" },
      { match: /dashboard/i, text: "Track every dollar. Be wise as serpents—harmless as doves!" },
      { match: /upload/i, text: "Financial clarity begins with organized documents. Upload with confidence!" },
      { match: /profile/i, text: "Know your numbers. Your financial profile is your roadmap to freedom!" },
      { match: /advisor/i, text: "Wisdom is the principal thing. Ask and you shall receive guidance!" }
    ];
    
    var tipData = TIP_MAP.find(function(item){ return item.match.test(path); });
    if (tipData) {
      tip.textContent = tipData.text;
      setTimeout(function(){ tip.style.display = 'block'; }, 1200);
      setTimeout(function(){ tip.style.display = 'none'; }, 5200);
      // Hover to re-show
      el.addEventListener('mouseenter', function(){ tip.style.display = 'block'; });
      el.addEventListener('mouseleave', function(){ tip.style.display = 'none'; });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }

  // Responsive: move to bottom-right on small screens
  function onResize(){
    if (window.innerWidth < 520) {
      el.style.top = 'auto';
      el.style.bottom = '14px';
      el.style.right = '14px';
      el.style.width = '56px';
      el.style.height = '56px';
    } else {
      el.style.top = '14px';
      el.style.bottom = 'auto';
      el.style.right = '14px';
      el.style.width = '64px';
      el.style.height = '64px';
    }
  }
  window.addEventListener('resize', onResize);
  onResize();
})();
