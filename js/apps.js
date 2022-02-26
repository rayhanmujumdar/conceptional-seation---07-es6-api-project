const allplayers = async () => {
    const searchValue = document.getElementById("search-value");
    const searchText = searchValue.value
    searchValue.value = ""
    console.log(searchText)
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPlayer(data.player);
}
const displayPlayer = (players) => {
    for(const player of players){
        const parent = document.getElementById("player-container")
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card border text-center mt-5">
        <div class="pro-pic">
            <img width="200px" src="${player.strThumb}" alt="">
        </div>
            <h1>Name: ${player.strPlayer}</h1>
            <h5>Country: ${player.strNationality}</h5>
            <p></p>
            <div class="allbutton">
                <button onclick="getDetails('${player.idPlayer}')" class="btn btn-danger">Details</button>
                <button class="btn btn-success">Delete</button>
            </div>
        </div>
        `
        parent.appendChild(div);
    }
    
}

const getDetails = async (info) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`
    const res = await fetch(url)
    const data = await res.json();
    searchPlayer(data.players[0])
}
const searchPlayer = (details) => {
    document.getElementById("details-container").innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <img width="500px" src="${details.strThumb}" alt="">
        <h1>Name: ${details.strPlayer}</h1>
    </div>
    `
}