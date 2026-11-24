const LINKS = [
  { title: "전화로 문의\n010 2474 2797", caption: "PHONE / INQUIRY", icon: "phone", url: "tel:+821024742797" },
  { title: "작업 문의\n카카오톡", caption: "CONTACT / KAKAO", icon: "kakao", url: "https://open.kakao.com/o/sJ9qi2jg" },
  { title: "GreyMusicStudio\n홈페이지", caption: "WEBSITE / HOME", icon: "home", url: "https://greymusicstudio-site.pages.dev/" },
  { title: "GreyMusicStudio\nDiscord", caption: "COMMUNITY / CHAT", icon: "discord", url: "https://discord.com/users/back_forest" },
];
const PLAYLISTS = [
  { title: "Edit / Mix / Mastering 1", url: "https://www.youtube.com/watch?v=fnD4locuw7E&list=PLFRXeB5vSYVrxi93hIderp_GELlzIEWUI" },
  { title: "Edit / Mix / Mastering 2", url: "https://www.youtube.com/watch?v=Qt43JwzzhZ4&list=PLrA63SOUwmbUxQ3z4YfWBzthoCbZxltkQ" },
  { title: "Directing / Recording", url: "https://www.youtube.com/watch?v=fnD4locuw7E&list=PLFRXeB5vSYVpNu54Hqlizlagvrrj6UJ_N" },
];

const linksRoot = document.querySelector("#links");
const playlistsRoot = document.querySelector("#playlists");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

LINKS.forEach(({ title, caption, icon, url }, index) => {
  const link = document.createElement("a");
  link.className = "link-card";
  link.href = url;
  const mark = icon === "youtube" ? '<img class="brand-logo" src="./youtube-logo.svg" alt="" />' : icon === "home" ? '<img class="brand-logo grey-card-logo" src="./grey-musicstudio-logo.png" alt="" />' : icon === "kakao" ? '<img class="brand-logo kakao-card-logo" src="./kakaotalk-logo.png" alt="" />' : icon === "discord" ? '<img class="brand-logo discord-card-logo" src="./discord-logo.svg" alt="" />' : "☎";
  link.innerHTML = `<div class="link-head"><span class="link-number">${String(index + 1).padStart(2, "0")}</span><span class="brand-icon ${icon}" aria-hidden="true">${mark}</span></div><span class="link-title">${title.replace("\n", "<br />")}</span><span class="link-caption"><span>${caption}</span><b>↗</b></span>`;
  if (icon === "discord") {
    link.href = "#";
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      try { await navigator.clipboard.writeText("back_forest"); showToast("디스코드 ID를 복사했어요"); }
      catch { showToast("디스코드 ID: back_forest"); }
    });
  } else if (url.startsWith("http")) { link.target = "_blank"; link.rel = "noreferrer"; }
  linksRoot.appendChild(link);
});

PLAYLISTS.forEach(({ title, url }) => {
  const link = document.createElement("a");
  link.className = "playlist-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `<span>${title}</span><b>↗</b>`;
  playlistsRoot.appendChild(link);
});

document.querySelector("#shareButton").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(window.location.href); showToast("페이지 링크를 복사했어요"); }
  catch { showToast("브라우저 메뉴에서 링크를 공유해 주세요"); }
});

let lastNoteAt = 0;
window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const now = performance.now();
  if (now - lastNoteAt < 85) return;
  lastNoteAt = now;
  const note = document.createElement("span");
  note.className = "cursor-note";
  note.textContent = ["♪", "♫", "♩", "♬"][Math.floor(Math.random() * 4)];
  note.style.left = `${event.clientX + (Math.random() * 18 - 9)}px`;
  note.style.top = `${event.clientY + (Math.random() * 18 - 9)}px`;
  note.style.setProperty("--note-size", `${12 + Math.random() * 8}px`);
  note.style.setProperty("--note-drift", `${Math.random() * 70 - 35}px`);
  note.style.setProperty("--note-spin", `${Math.random() * 50 - 25}deg`);
  document.body.appendChild(note);
  note.addEventListener("animationend", () => note.remove(), { once: true });
});
