// Api Url
const url = "https://shazam.p.rapidapi.com/search?term=adele&locale=en-US";
// Headers: Api'ın bizi tanıyıp verileri iletmesi için gerekli obje
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "e52e3bfef4msh2b3dc66d0cfb4a8p16624ejsn1c91d9af0240",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

// Api Classı
export class API {
  // Popüler müzikleri api den alan fonksiyon
  async getPopular() {
    const data = await this.searchMusics("sezen aksu");
    const data1 = await this.searchMusics("adele");
    const data2 = await this.searchMusics("ahmet kaya");
    const data3 = await this.searchMusics("eminem");
    const data4 = await this.searchMusics("ajda pekkan");

    return [...data, ...data1, ...data2, ...data3, ...data4];
  }
  // Aratılan kelimeye göre şarkı verilerini alan fonksiyon
  async searchMusics(query) {
    // Url i dinamik hale getirme
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US`;
    // Api a istek at
    const res = await fetch(url, options);
    // Gelen cevabı js nesnesine çevir
    const data = await res.json();
    // Verinin içerisinde bulunan katmanlı yapıyı düzenlendik ve şarkı verisine eriştik
    const formatted = data.tracks.hits.map((item) => item.track);
    return formatted;
  }
}
