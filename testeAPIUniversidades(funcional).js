async function universidadesAPI() {
    let resp = await fetch("http://universities.hipolabs.com/search?name=rio");
    let respJson = await resp.json();

    let sugestoes = respJson.map(elem => {
        return elem.name;
    });

    console.log(sugestoes);
}

universidadesAPI()
