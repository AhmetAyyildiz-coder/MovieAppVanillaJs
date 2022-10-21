const template  = document.createElement("template");

template.innerHTML = `
<style>
    @import url('http://${location.host}/components/movieCard/movieCard.css')
</style>


<div class="movie-container">
    <div class="image-container">
        <img  />
    </div>
    <div class="info">
        <h3 class="title"></h3>
        <p>
            <slot />
        </p>
        <div class="action_container">
            <i class="isFavourite fa fa-heart "></i>
            <a target="_blank" class="button">IMDb</a>
        </div>
    </div>
</div>
`


class MovieCard extends HTMLElement{
    constructor() {
        super();
        this.isFavorite=false;

        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        //şimdi üst sınıflardan çağrılan attribute'leri okuyup template'de yazdıralım

        setTimeout(() =>{
            this.shadowRoot.querySelector("h3").innerHTML = this.getAttribute("title");
            this.shadowRoot.querySelector("img").src = this.getAttribute("poster");
            if (this.getAttribute("isFavorite")=="true"){

                this.shadowRoot.querySelector(".isFavourite").classList.add("is_favourite")
            }
            },100)


    }

    favToggle() {
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite){
            this.shadowRoot.querySelector(".isFavourite")
                .classList.add("is_favourite");
        }
        else {
            this.shadowRoot.querySelector(".isFavourite")
                .classList.remove("is_favourite");
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector(".isFavourite").addEventListener("click" , ()=>this.favToggle());
    }
}

window.customElements.define("movie-card" , MovieCard);