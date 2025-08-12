// Main application for Mathematics Knowledge Tree
// Depends on D3 v7 and global MATH_NODES, MATH_LINKS

(function() {
  const nodes = window.MATH_NODES;
  const links = window.MATH_LINKS;

  // Build alias index and canonical maps
  const canonicalByLower = new Map();
  const aliases = new Map(); // aliasLower -> canonical
  nodes.forEach(n => {
    const key = n.id.toLowerCase();
    canonicalByLower.set(key, n.id);
    (n.aliases || []).forEach(a => {
      aliases.set(a.toLowerCase(), n.id);
    });
  });

  // Combine canonical labels and aliases for searching suggestions
  const searchEntries = [];
  nodes.forEach(n => {
    searchEntries.push({ label: n.id, canonical: n.id });
    (n.aliases || []).forEach(a => searchEntries.push({ label: a, canonical: n.id }));
  });

  // Build maps (carry weights and scopes)
  const idToNode = new Map(nodes.map(n => [n.id.toLowerCase(), n]));
  const parentsMap = new Map(); // targetLower -> [{ id, weight, scope }]
  const childrenMap = new Map(); // sourceLower -> [{ id, weight, scope }]
  links.forEach(l => {
    const s = l.source.toLowerCase();
    const t = l.target.toLowerCase();
    const w = l.weight != null ? l.weight : 0.5;
    const scope = l.scope || 'supporting';
    if (!parentsMap.has(t)) parentsMap.set(t, []);
    if (!childrenMap.has(s)) childrenMap.set(s, []);
    parentsMap.get(t).push({ id: s, weight: w, scope });
    childrenMap.get(s).push({ id: t, weight: w, scope });
  });

  // DOM elements
  const svg = d3.select('#graph');
  const g = svg.append('g');
  const searchBox = document.getElementById('searchBox');
  const suggestionsEl = document.getElementById('suggestions');
  const suggestionsList = suggestionsEl.querySelector('ul');
  const infoPanel = document.getElementById('infoPanel');
  const infoTitle = document.getElementById('infoTitle');
  const infoDesc = document.getElementById('infoDesc');
  const infoMeta = document.getElementById('infoMeta');
  document.getElementById('infoClose').addEventListener('click', () => infoPanel.classList.remove('visible'));

  // Arrowheads
  const defs = svg.append('defs');
  defs.append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 24)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', 'rgba(200,210,255,0.7)');

  defs.append('marker')
    .attr('id', 'arrow-glow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 24)
    .attr('refY', 0)
    .attr('markerWidth', 7)
    .attr('markerHeight', 7)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#00e5ff');

  // Zoom
  const zoomBehavior = d3.zoom().scaleExtent([0.25, 3]).on('zoom', (event) => g.attr('transform', event.transform));
  svg.call(zoomBehavior);

  // Scales for weighted links
  const widthScale = d3.scaleLinear().domain([0.1, 1]).range([1.5, 5]);
  const baseOpacityScale = d3.scaleLinear().domain([0.1, 1]).range([0.35, 0.95]);
  const glowOpacityScale = d3.scaleLinear().domain([0.1, 1]).range([0.45, 1]);

  // Simulation
  const width = window.innerWidth;
  const height = window.innerHeight;
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(d => 150 + (d.source.group + d.target.group) * 3))
    .force('charge', d3.forceManyBody().strength(-850))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(42));

  const link = g.append('g')
    .attr('stroke-linecap', 'round')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('class', 'link')
    .attr('marker-end', 'url(#arrow)')
    .style('stroke-width', d => widthScale(d.weight != null ? d.weight : 0.5))
    .style('opacity', d => baseOpacityScale(d.weight != null ? d.weight : 0.5));

  const node = g.append('g')
    .selectAll('g')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .call(drag(simulation))
    .on('dblclick', (event, d) => {
      if (event.shiftKey) {
        // shift + double click pins/unpins
        const pinned = d.fx != null || d.fy != null;
        if (pinned) { d.fx = null; d.fy = null; }
        else { d.fx = d.x; d.fy = d.y; }
        return;
      }
      // Open description panel
      openInfo(d);
    })
    .on('click', (_, d) => highlightTopic(d.id));

  node.append('circle')
    .attr('r', 18)
    .attr('fill', d => d3.interpolateCool(d.group / 12));

  node.append('text')
    .text(d => d.id)
    .attr('x', 22)
    .attr('dy', 4);

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    svg.attr('width', w).attr('height', h);
    simulation.force('center', d3.forceCenter(w / 2, h / 2));
    simulation.alpha(0.3).restart();
  });

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x; d.fy = d.y;
    }
    function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      if (d.fx !== null && d.fy !== null && event.sourceEvent && event.sourceEvent.detail === 2 && event.sourceEvent.shiftKey) return;
      // release unless was pinned explicitly
      if (!event.sourceEvent || !event.sourceEvent.shiftKey) { d.fx = null; d.fy = null; }
    }
    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  }

  // Info panel
  function openInfo(n) {
    infoTitle.textContent = n.id;
    infoDesc.textContent = n.desc || '—';
    const lower = n.id.toLowerCase();
    const prereqEdges = (parentsMap.get(lower) || []).slice().sort((a,b) => b.weight - a.weight);
    const nextEdges = (childrenMap.get(lower) || []).slice().sort((a,b) => b.weight - a.weight);

    function badge(scope) { return `<span class="badge">${scope}</span>`; }
    function bar(widthPct) { return `<div class="bar-wrap"><div class="bar" style="width:${Math.round(widthPct)}%"></div></div>`; }

    const prereqHtml = prereqEdges.length ? prereqEdges.map(e => {
      const name = canonicalByLower.get(e.id) || e.id;
      const pct = Math.min(100, Math.max(10, e.weight * 100));
      return `<div class="item"><div><strong>${name}</strong> ${badge(e.scope)}</div>${bar(pct)}</div>`;
    }).join('') : '<div class="item">None listed</div>';

    const nextHtml = nextEdges.length ? nextEdges.map(e => {
      const name = canonicalByLower.get(e.id) || e.id;
      const pct = Math.min(100, Math.max(10, e.weight * 100));
      return `<div class="item"><div><strong>${name}</strong> ${badge(e.scope)}</div>${bar(pct)}</div>`;
    }).join('') : '<div class="item">—</div>';

    infoMeta.innerHTML = `
      <div><strong>Prerequisites (weighted):</strong></div>
      <div class="prereq-list">${prereqHtml}</div>
      <div style="height:8px"></div>
      <div><strong>Leads to (weighted):</strong></div>
      <div class="next-list">${nextHtml}</div>
    `;
    infoPanel.classList.add('visible');
  }

  // Highlighting
  function reapplyBaseLinkStyles() {
    link
      .style('stroke-width', d => widthScale(d.weight != null ? d.weight : 0.5))
      .style('opacity', d => baseOpacityScale(d.weight != null ? d.weight : 0.5))
      .style('filter', null)
      .attr('marker-end', 'url(#arrow)');
  }

  function clearGlow() {
    node.classed('glow-node', false).classed('glow-target', false).classed('dim', false);
    link.classed('glow-link', false).classed('dim', false);
    reapplyBaseLinkStyles();
  }

  function collectPrereqClosure(targetLower) {
    const visited = new Set();
    const edgeKeys = new Set();
    const queue = [targetLower];
    while (queue.length) {
      const cur = queue.shift();
      const parents = parentsMap.get(cur) || [];
      for (const p of parents) {
        if (!visited.has(p.id)) { visited.add(p.id); queue.push(p.id); }
        edgeKeys.add(`${p.id}||${cur}`);
      }
    }
    return { nodes: visited, edges: edgeKeys };
  }

  function zoomToNode(d, scale = 1.3) {
    const transform = d3.zoomIdentity
      .translate(window.innerWidth / 2, window.innerHeight / 2)
      .scale(scale)
      .translate(-d.x, -d.y);
    svg.transition().duration(900).ease(d3.easeCubicOut)
      .call(zoomBehavior.transform, transform);
  }

  function applyGlow(targetLower) {
    clearGlow();
    const n = idToNode.get(targetLower);
    if (!n) return;

    const { nodes: prereqSet, edges: edgeSet } = collectPrereqClosure(targetLower);

    node.classed('dim', true);
    link.classed('dim', true);

    node.filter(d => d.id.toLowerCase() === targetLower)
        .classed('glow-target', true)
        .classed('dim', false);

    const prereqArray = Array.from(prereqSet);
    let delay = 0;
    for (const nid of prereqArray) {
      setTimeout(() => {
        node.filter(d => d.id.toLowerCase() === nid)
            .classed('glow-node', true)
            .classed('dim', false);
      }, delay);
      delay += 140;
    }

    link.each(function(l) {
      const key = `${l.source.id.toLowerCase()}||${l.target.id.toLowerCase()}`;
      const w = l.weight != null ? l.weight : 0.5;
      if (edgeSet.has(key)) {
        d3.select(this)
          .classed('glow-link', true)
          .classed('dim', false)
          .attr('marker-end', 'url(#arrow-glow)')
          .style('stroke-width', widthScale(w) + 1.5)
          .style('opacity', glowOpacityScale(w))
          .style('filter', `drop-shadow(0 0 ${Math.round(6 + 12 * w)}px var(--link-glow))`);
      }
    });

    zoomToNode(n);
  }

  function highlightTopic(query) {
    const canonical = canonicalizeQuery(query);
    if (!canonical) { shake(searchBox); return; }
    applyGlow(canonical.toLowerCase());
  }

  // Fuzzy search (Damerau-Levenshtein)
  function damerauLevenshtein(a, b) {
    a = a.toLowerCase(); b = b.toLowerCase();
    const al = a.length, bl = b.length;
    const dp = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
    for (let i = 0; i <= al; i++) dp[i][0] = i;
    for (let j = 0; j <= bl; j++) dp[0][j] = j;
    for (let i = 1; i <= al; i++) {
      for (let j = 1; j <= bl; j++) {
        const cost = a[i-1] === b[j-1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] + 1,
          dp[i-1][j-1] + cost
        );
        if (i > 1 && j > 1 && a[i-1] === b[j-2] && a[i-2] === b[j-1]) {
          dp[i][j] = Math.min(dp[i][j], dp[i-2][j-2] + 1);
        }
      }
    }
    return dp[al][bl];
  }

  function scoreEntry(query, entry) {
    const q = query.toLowerCase();
    const lab = entry.label.toLowerCase();
    if (q === lab) return 0;
    if (lab.startsWith(q)) return 0.2;
    if (lab.includes(q)) return 0.4;
    const dist = damerauLevenshtein(q, lab);
    const norm = dist / Math.max(1, lab.length);
    return 0.6 + norm; // ensure worse than substring/prefix but ordered by distance
  }

  function bestMatches(query, max = 10) {
    if (!query) return [];
    const scored = searchEntries
      .map(e => ({ e, s: scoreEntry(query, e) }))
      .sort((a, b) => a.s - b.s)
      .slice(0, max)
      .map(x => x.e);
    // Deduplicate by canonical while keeping best label variant
    const seen = new Set();
    const out = [];
    for (const e of scored) {
      if (!seen.has(e.canonical)) { out.push(e); seen.add(e.canonical); }
    }
    return out;
  }

  function canonicalizeQuery(query) {
    const q = (query || '').trim();
    if (!q) return null;
    const lower = q.toLowerCase();
    if (canonicalByLower.has(lower)) return canonicalByLower.get(lower);
    if (aliases.has(lower)) return aliases.get(lower);
    const bm = bestMatches(q, 1)[0];
    if (!bm) return null;
    // Reject if extremely far (optional threshold)
    return bm.canonical;
  }

  // Suggestions UI
  let activeIndex = -1;
  function renderSuggestions(items) {
    suggestionsList.innerHTML = '';
    if (!items.length) { suggestionsEl.style.display = 'none'; return; }
    items.forEach((e, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${e.label}</span><span class="pill">${e.canonical === e.label ? 'topic' : 'alias'}</span>`;
      if (idx === activeIndex) li.classList.add('active');
      li.addEventListener('mousedown', evt => { evt.preventDefault(); selectSuggestion(e); });
      suggestionsList.appendChild(li);
    });
    suggestionsEl.style.display = 'block';
  }

  function selectSuggestion(entry) {
    searchBox.value = entry.canonical;
    suggestionsEl.style.display = 'none';
    highlightTopic(entry.canonical);
  }

  searchBox.addEventListener('input', (e) => {
    activeIndex = -1;
    const items = bestMatches(e.target.value, 8);
    renderSuggestions(items);
  });

  searchBox.addEventListener('keydown', (e) => {
    const items = Array.from(suggestionsList.querySelectorAll('li'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = items.length ? (activeIndex + 1 + items.length) % items.length : -1;
      const entries = bestMatches(searchBox.value, 8);
      renderSuggestions(entries);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = items.length ? (activeIndex - 1 + items.length) % items.length : -1;
      const entries = bestMatches(searchBox.value, 8);
      renderSuggestions(entries);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestionsList.children[activeIndex]) {
        const label = suggestionsList.children[activeIndex].querySelector('span').textContent;
        const entry = searchEntries.find(se => se.label === label);
        if (entry) selectSuggestion(entry);
      } else {
        const canonical = canonicalizeQuery(searchBox.value.trim());
        if (canonical) highlightTopic(canonical); else shake(searchBox);
      }
    } else if (e.key === 'Escape') {
      suggestionsEl.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (!suggestionsEl.contains(e.target) && e.target !== searchBox) suggestionsEl.style.display = 'none';
  });

  document.getElementById('searchButton').addEventListener('click', () => {
    const canonical = canonicalizeQuery(searchBox.value.trim());
    if (canonical) highlightTopic(canonical); else shake(searchBox);
  });

  document.getElementById('resetButton').addEventListener('click', () => {
    clearGlow();
    svg.transition().duration(700).call(zoomBehavior.transform, d3.zoomIdentity);
    searchBox.value = '';
    suggestionsEl.style.display = 'none';
    infoPanel.classList.remove('visible');
  });

  function shake(el) {
    el.style.transition = 'transform 60ms';
    let i = 0; const interval = setInterval(() => {
      el.style.transform = `translateX(${(i++ % 2 === 0) ? -3 : 3}px)`;
      if (i > 6) { clearInterval(interval); el.style.transform = 'translateX(0)'; }
    }, 60);
  }
})();