import PocketBase from "pocketbase";

const pbN = new PocketBase("http://localhost:8090");
const pbO = new PocketBase("http://localhost:8090/");

export async function migrate(){
    const userO = await pbO.collection("user").getFullList({});
    const listO = await pbO.collection("list").getFullList({});
    const notesO = await pbO.collection("notes").getFullList({});

    userO.forEach(async item => {
        await pbN.collection("user").create(item);
        console.log(item);
    });
    listO.forEach(async item => {
        await pbN.collection("list").create(item);
        console.log(item);

    });
    notesO.forEach(async item => {
        await pbN.collection("notes").create(item);
        console.log(item);

    });
}