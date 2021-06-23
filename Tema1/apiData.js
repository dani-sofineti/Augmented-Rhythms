const PATH = "https://randomuser.me/api/";

async function getRandomUser() {
    const result = await fetch(PATH);
    const data = await result.json();
    const finalResult = data.results[0];

    document.getElementById("name").innerText = `${finalResult.name.first} ${finalResult.name.last}`;
    document.getElementById("gender").innerText = finalResult.gender;
    document.getElementById("email").innerText = finalResult.email;
    document.getElementById("age").innerText = finalResult.dob.age;
    document.getElementById("picture").setAttribute('src', finalResult.picture.large);
}

document.getElementById('generator').addEventListener('click', getRandomUser);