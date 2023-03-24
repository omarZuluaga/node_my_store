const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const  hash = '$2b$10$JvkSWNcz6TffGpQaUyUdR.g8yvh6IithPX6fYy.lq1X2nBPQFapUG';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
