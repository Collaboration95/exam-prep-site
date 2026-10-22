// Keep the contents control available even when the sidebar is hidden or scrolled.
const sidebarToggle = document.querySelector('.sidebar-toggle');
if (sidebarToggle) {
  const sidebar = document.getElementById(sidebarToggle.getAttribute('aria-controls'));
  const layout = sidebar.closest('.layout');
  sidebarToggle.hidden = false;
  layout.classList.add('has-sidebar-toggle');
  sidebarToggle.addEventListener('click', () => {
    sidebar.hidden = !sidebar.hidden;
    layout.classList.toggle('sidebar-collapsed', sidebar.hidden);
    sidebarToggle.setAttribute('aria-expanded', String(!sidebar.hidden));
    sidebarToggle.textContent = sidebar.hidden ? 'Show contents' : 'Hide contents';
  });
}

// Diagram boxes with details: clicking one shows its text in that figure's detail panel.
document.addEventListener('click', e => {
  const box = e.target.closest('.visual [data-detail]');
  if (!box) return;
  const fig = box.closest('.visual');
  fig.querySelectorAll('[data-detail].on').forEach(b => {
    b.classList.remove('on');
    b.setAttribute('aria-pressed', 'false');
  });
  box.classList.add('on');
  box.setAttribute('aria-pressed', 'true');
  const panel = fig.querySelector('.detail');
  panel.innerHTML = `<strong></strong> `;
  panel.firstChild.textContent = box.querySelector('.label').textContent + ':';
  panel.append(box.dataset.detail);
});
