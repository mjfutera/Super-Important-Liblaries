const getData = async (url) => await fetch(url).then(r => r.json());
