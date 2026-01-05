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
      '<img src="/mascot/timber_v1.png" alt="Timber, your AI Financial Beaver" ' +
      'style="width:100%;height:100%;display:block;border-radius:50%;object-fit:contain;background:#0B1F3B;" />' +
      '<div id="timber-tip" style="position:absolute;top:-6px;right:72px;max-width:260px;' +
      'background:#0B1F3B;color:#f8fafc;border:1px solid #00D084;border-radius:10px;padding:10px 12px;' +
      'font:500 13px/1.4 system-ui,Segoe UI,Inter,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.4);' +
      'pointer-events:none;white-space:nowrap;opacity:0;transition:opacity 0.2s ease;">' +
        'Timber, your AI Financial Beaver' +
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
      setTimeout(function(){ 
        tip.style.opacity = '1'; 
        try{ window.TimberAnalytics && TimberAnalytics.send("tip_impression", tip.textContent||""); }catch(e){} 
      }, 1200);
      setTimeout(function(){ tip.style.opacity = '0'; }, 5200);
    }
    
    // Hover to show "Timber, your AI Financial Beaver" tooltip
    var hoverTip = el.querySelector('#timber-tip');
    el.addEventListener('mouseenter', function(){ 
      hoverTip.textContent = 'Timber, your AI Financial Beaver';
      hoverTip.style.opacity = '1';
      try{ window.TimberAnalytics && TimberAnalytics.send("tip_hover", hoverTip.textContent||""); }catch(e){} 
    });
    el.addEventListener('mouseleave', function(){ 
      hoverTip.style.opacity = '0';
      if (tipData) {
        hoverTip.textContent = tipData.text;
      }
    });
    el.addEventListener('click', function(){ 
      try{ window.TimberAnalytics && TimberAnalytics.send("tip_click", hoverTip.textContent||""); }catch(e){} 
    });
    
    // Add subtle float animation
    var img = el.querySelector('img');
    if (img) {
      img.style.animation = 'float 3s ease-in-out infinite';
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
  
  // Add float animation CSS if not already present
  if (!document.getElementById('timber-badge-styles')) {
    var style = document.createElement('style');
    style.id = 'timber-badge-styles';
    style.textContent = '@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }';
    document.head.appendChild(style);
  }
})();
