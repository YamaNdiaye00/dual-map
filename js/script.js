const mainMap = document.getElementById('mainMap');
const refMap = document.getElementById('refMap');
const highlight = document.getElementById('highlight');
const refContainer = document.getElementById('refContainer');
const mainContainer = mainMap.parentElement;

mainMap.addEventListener('mousemove', e => {

    // Getting mouse coordinates on mainMap
    const rect = mainMap.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    // Position circle relative to refMap
    const refRect = refMap.getBoundingClientRect();
    const x = xRatio * refRect.width;
    const y = yRatio * refRect.height;

    // Placing highlight to refMap
    highlight.style.left = x + 'px';
    highlight.style.top = y + 'px';
    highlight.style.display = 'block';
});

// Remove Highlight when mouse not on mainMap
mainMap.addEventListener('mouseleave', () => {
    highlight.style.display = 'none';
});

// Load holes.json and place flags
fetch('assets/holes.json')
    .then(res => res.json())
    .then(holes => {
        holes.forEach(hole => {
            // Create flag for main map
            const flagMain = document.createElement('div');
            flagMain.className = 'flag';
            flagMain.innerText = '⛳';
            flagMain.style.left = hole.x + '%';
            flagMain.style.top = hole.y + '%';
            flagMain.title = `${hole.name} (Par ${hole.par}, ${hole.yardage} yds)`;
            mainContainer.appendChild(flagMain);

            // Create flag for drawn map
            const flagRef = document.createElement('div');
            flagRef.className = 'flag';
            flagRef.innerText = '⛳';
            flagRef.style.left = hole.x + '%';
            flagRef.style.top = hole.y + '%';
            flagRef.title = `${hole.name} (Par ${hole.par}, ${hole.yardage} yds)`;
            refContainer.appendChild(flagRef);
        });
    });