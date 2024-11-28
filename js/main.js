// Api classının import et
import { API } from "./api.js";
// UI classını import et
import { UI } from "./ui.js";

// Örneğini almak
const ui = new UI();
const api = new API();

document.addEventListener("DOMContentLoaded", () => {
  // Loaderi render et
  ui.renderLoader();
  // Api a istek at ve gelen verilerle ekrana kart render et
  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log("Hata:", err);
      alert("Üzgünüz bir hata oluştu...");
    });
});

// * Formun gönderilme olayını izle
ui.form.addEventListener("submit", (e) => {
  // Form gönderildiğinde sayfa yenilmeyi engelle
  e.preventDefault();

  // İnputtaki arama parametresine eriş
  const query = e.target[0].value;

  // Aratılan kelime yoksa fonksiyonu durdur.Bu sayede api hakkımızı boşa harcamadık
  if (query.trim() === "")
    return alert("Lütfen geçerli bir arama işlemi gerçekleştiriniz");

  // Loaderı render et
  ui.renderLoader();

  // Başlığı güncelle
  ui.updateTitle(query + " için sonuçlar");

  // Api a aratılan kelimeyi istek at
  api
    .searchMusics(query)
    // Gelen şarkı verileriyle ekrana kartları render et
    .then((data) => ui.renderCards(data))
    // Hata varsa bunu yakala ve uyarı ver
    .catch((err) => {
      alert("İşlem gerçekleştirilemedi");
      console.log(err);
    });
});

// * Liste alanında gerçekleşen tıklanma olaylarını izle
ui.list.addEventListener("click", (e) => {
  // Eğer play classına sahip bir elemana tıklandıysa şarkı çalma işlevini gerçekleştir
  if (e.target.className == "play") {
    const card = e.target.closest(".card");
    const data = card.dataset;
    console.log(data);
    ui.renderPlayer(data);
    console.log(ui);
  }
});
