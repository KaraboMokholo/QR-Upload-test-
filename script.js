// Utility: get URL parameter
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Fake "current user" from localStorage
function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Fake database in localStorage (user → array of file objects)
function getUploadsForUser(uid) {
  const data = localStorage.getItem(`uploads_${uid}`);
  return data ? JSON.parse(data) : [];
}

function addUploadForUser(uid, fileInfo) {
  const uploads = getUploadsForUser(uid);
  uploads.push(fileInfo);
  localStorage.setItem(`uploads_${uid}`, JSON.stringify(uploads));
}

// For QR code page / dashboard
function generateQRCode(userId) {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;

  const uploadUrl = `${window.location.origin}${window.location.pathname.replace('index.html', '')}upload.html?uid=${userId}`;

  // Clear previous
  qrContainer.innerHTML = '';

  new QRCode(qrContainer, {
    text: uploadUrl,
    width: 220,
    height: 220,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Also show the link
  const linkEl = document.createElement('p');
  linkEl.innerHTML = `Share this link or QR:<br><small>${uploadUrl}</small>`;
  linkEl.style.textAlign = 'center';
  linkEl.style.marginTop = '16px';
  qrContainer.appendChild(linkEl);
}