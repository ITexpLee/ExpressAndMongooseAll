const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    // const hash = await bcrypt.hash(pw, 10);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if(result) {
        console.log("logged in");
    }else{
        console.log("try again");
    }
}

hashPassword('monkey');
login('monkey', '$2b$10$KzUX/FIf.2dbarY6FvdmV.Ssz0f./8Vb1/Nu3j50hczTu9xozxdO2');