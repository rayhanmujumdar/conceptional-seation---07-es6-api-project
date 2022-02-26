document.getElementById("spinner").style.display = 'none'
const allplayers = async () => {
    document.getElementById("spinner").style.display = 'block'
    const searchValue = document.getElementById("search-value");
    const searchText = searchValue.value
    searchValue.value = ""
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`
    document.getElementById("player-container").innerHTML = ""
    try{
        const res = await fetch(url);
        const data = await res.json();
        document.getElementById("spinner").style.display = 'none'
        displayPlayer(data.player);
    }
    catch(error){
        const playerContainer = document.getElementById("player-container")
        playerContainer.innerHTML = ""
        const h2 = document.createElement("h2");
        h2.classList.add("text-muted")
        h2.innerHTML = 'Data Not Found';
        playerContainer.appendChild(h2)
    }
}
const displayPlayer = (players) => {
    for(const player of players){
        const parent = document.getElementById("player-container")
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card border text-center mt-5">
        <div class="pro-pic">
            <img width="200px" src="${player?.strThumb}" alt="" class="img-fluid rounded-3">
        </div>
            <h1>Name: ${player.strPlayer}</h1>
            <h5>Country: ${player.strNationality}</h5>
            <p></p>
            <div class="allbutton">
                <button onclick="getDetails('${player.idPlayer}')" class="btn btn-success"><a class="text-white text-decoration-none" href="#details-container">Details</a></button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>
        `
        parent.appendChild(div);
    }
    
}

const getDetails = async (info) => {
    document.getElementById("spinner").style.display = 'block'
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`
    const res = await fetch(url)
    document.getElementById("spinner").style.display = 'none'
    const data = await res.json();
    searchPlayer(data.players[0])
}
const searchPlayer = (details) => {
    console.log(details)
    document.getElementById("details-container").innerHTML = `
    <h2 class="text-center mt-2 text-success" id="details-title">Plyer Details</h2>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <img width="500px" src="${details.strThumb}" alt="" class="img-fluid rounded-3">
        <h1>Name: ${details.strPlayer}</h1>
        <p>Date of Birth: ${details.dateBorn}</p>
        <p>Country: ${details.strNationality}</p>
    </div>
    `
}