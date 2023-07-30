import mysql from 'mysql2'

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Harsh@2511',
    database: 'social_media'
}).promise()

export async function readPosts() {
    const output = await connection.query("select * from posts");
    return output[0];
}

export async function readUser(profile) {
    const output = await connection.query("select * from users where profile = ?", [profile]);
    return output[0];
}

export async function insertUser(name, profile, password, headline) {
    await connection.query("insert into users(name, profile, password, headline) values (?, ?, ?, ?)", [name, profile, password, headline]);
}

export async function insertPost(profile, content, likes, shares) {
    await connection.query("insert into posts(profile, content, likes, shares) values (?, ?, ?, ?)", [profile, content, likes, shares]);
}

export async function likeFun(content) {
    const output = await connection.query("select likes from posts where content = ?", [content]);
    const likes = output[0][0].likes;
    const incLikes = likes + 1;
    await connection.query("update posts set likes = ? where content = ?", [incLikes, content]);
}

export async function shareFun(content) {
    const output = await connection.query("select shares from posts where content = ?", [content]);
    const shares = output[0][0].shares;
    const incShares = shares + 1;
    await connection.query("update posts set shares = ? where content = ?", [incShares, content]);
}

export async function deleteFun(content) {
    const output = await connection.query("delete from posts where content = ?", [content]);
}


const result = await readPosts()
console.log(result)
