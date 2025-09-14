class HomeScreen {
    constructor() {
        this.writerBtn = document.getElementById("writer");
        this.readerBtn = document.getElementById("reader");
        this.title = document.getElementById("title");
        this.name = document.getElementById("name");
        this.init();
    }

    init() {
        this.writerBtn.addEventListener("click", () => {
            location.href = "./writer.html";
            console.log("write click")
        });
        this.readerBtn.addEventListener("click", () => {
            location.href = "./reader.html";
            console.log("read click")
        });
    }


}

window.addEventListener('DOMContentLoaded', () => {
    new HomeScreen();
});