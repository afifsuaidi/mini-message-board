const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT id, username, text, added FROM messages ORDER BY added DESC",
  );

  return rows.map((message) => ({
    id: message.id,
    user: message.username,
    text: message.text,
    added: message.added,
  }));
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    "SELECT id, username, text, added FROM messages WHERE id = $1",
    [id],
  );

  if (rows.length === 0) {
    return null;
  }

  return {
    id: rows[0].id,
    user: rows[0].username,
    text: rows[0].text,
    added: rows[0].added,
  };
}

async function insertMessage(username, text) {
  await pool.query(
    "INSERT INTO messages (username, text, added) VALUES ($1, $2, NOW())",
    [username, text],
  );
}

async function searchMessages(search) {
  const { rows } = await pool.query(
    `SELECT id, username, text, added
     FROM messages
     WHERE username ILIKE $1
        OR text ILIKE $1
     ORDER BY added DESC`,
    [`%${search}%`],
  );

  return rows.map((message) => ({
    id: message.id,
    user: message.username,
    text: message.text,
    added: message.added,
  }));
}

async function deleteAllMessages() {
  await pool.query("DELETE FROM messages");
}

module.exports = {
  getAllMessages,
  getMessageById,
  insertMessage,
  searchMessages,
  deleteAllMessages,
};
