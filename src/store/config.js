// import io from 'socket.io-client';

/* -- set app title --*/
const AppTitle = 'Bitdandy Exchange';

/* -- set app mode -- */
// const AppMode = [''];
const AppMode = ['development'];
console.log(`***************Mode = `, AppMode[0]);

/* -- set API URLs --*/
const testing = 'https://dserver.bitdandy.com';
const production = 'https://pserver.bitdandy.com';
const development = 'https://dserver.bitdandy.com';

let SocketUrl;
switch (AppMode[0]) {
  case 'development':
    SocketUrl = development;
    break;
  case 'production':
    SocketUrl = production;
    break;
  case 'testing':
    SocketUrl = testing;
    break;
  default:
    SocketUrl = 'http://localhost:4000';
}
// let socket = io(SocketUrl);
let ApiUrl = `${SocketUrl}/api`;
export { AppTitle, ApiUrl, SocketUrl };
// export { AppTitle, ApiUrl, SocketUrl, socket };
