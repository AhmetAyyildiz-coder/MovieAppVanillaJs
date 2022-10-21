//servise istek atıcak ve data çekicek olan js dosyamız.

let movies = [
    {
        title: "The Man From Earth 1",
        description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
        poster:
            "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_.jpg",
        isFavourite: true
    },
    {
        title: "The Man From Earth 2",
        description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
        poster:
            "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_.jpg",
        isFavourite: false
    },
    {
        title: "The Man From Earth 3",
        description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
        poster:
            "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_.jpg",
        isFavourite: true
    }
];
const apiKey = "9c48e0e0";
const siteUrl ="http://www.omdbapi.com/?apikey=9c48e0e0&s=";
//arama filtresi
const search_text = document.querySelector(".search_text");

search_text.addEventListener("keydown" , e => {


   if (e.keyCode == 13) {
       searchMovie();
   }
})


//film çekmek için api kullanalım
async function  searchMovie() {
 const request =  await fetch(`${siteUrl}${search_text.value}`);
 const data = await request.json();
 //çekdiğimiz datayı custom bir nesneye map'ledik.
 let moviess = data.Search.map(m=> {
     return {
         title:m.Title ,
         description : `${m.Year}/${m.Type}`,
         IMDB : m.imdbID,
         poster:m.Poster,
         isFavourite:false
     }
 });
 console.log(moviess);
    prepareMovies(moviess);

}


//movie card üretecek olan fonksiyon. Önemli !

function prepareMovies(movies) {
    //dataları servistek çekmiş gibi düşünelim.

    document.querySelector("#movies").innerHTML='';
    // let moviecard = document.createElement("movie-card");
    // document.querySelector("#movies").append(moviecard);
    movies.forEach(x=> {
        //çekilen data sayısı kadar kart ürettik.
        let moviecard = document.createElement("movie-card");
        //gelen her datayı teyit etmek için direkt bir div içerisine append edebiliriz.
        //document.querySelector("#movies").append(moviecard);

        //gelen dizideki datalara göre kart içerisini doldurmak !
        //şimdi bizim movie card template'i içerisindeki attribute'lere bu taraftan değer atmamız
        //gerekiyor.

        /*burada bazı sorunlar oluyor. Fonksiyon içerisinde attribute set ederken
        * html elementi çoktan sayfaya yüklenmiş oluyor. bu sebeple attribute'ler aslında
        * yüklenmemiş gibi börünüyor. Bu sebeple sınıf yüklenirken ctor'da sınıfı bekletmemiz
        * gerekebilir.
        * */
        moviecard.setAttribute("title" , x.title);
        moviecard.setAttribute("poster" , x.poster);
        moviecard.setAttribute("isFavorite" , x.isFavourite);
        moviecard.setAttribute("IMDB" , x.IMDB),
        moviecard.innerHTML = x.description;

        document.querySelector("#movies").append(moviecard);

    })

}
