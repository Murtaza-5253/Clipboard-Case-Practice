import axios from "axios";

async function fetchData(){
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(`Fetched ${res.data.length} posts`);
}

fetchData();