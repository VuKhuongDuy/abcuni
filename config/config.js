let listuser = [
    {
        mssv: '17020650',
        password: 'duyvu'
    },
    {
        mssv: '17020000',
        password: 'vuduy'
    }
];

let listUrl = {
    getListSubjectStudent: "/subjectstudent",
    getUser: '/user',
    login: '/login'
}
const serverPath = 'http://localhost:3000';

module.exports.listuser = listuser;
module.exports.serverPath = serverPath;
module.exports.listUrl = listUrl;
