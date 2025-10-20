// import type { UserToken } from "./src/interfaces/user-token";
// declare global {
//     namespace Express {
//         interface Request {
//             user?: UserToken;
//         }
//     }
// }

// // import type { IUser } from "../models/user-model";
// // import { UserToken } from "./src/interfaces/user-token";

// // declare global {
// //   namespace Express {
    
// //     // interface User extends IUser {}
// //     interface Request {
// //       user?: UserToken | IUser;
// //     }
// //   }
// // }


// export {};

// import type { UserToken } from "./src/interfaces/user-token";

// declare global {
//   namespace Express {
//     interface User extends UserToken {}
//     interface Request {
//       user?: User;
//     }
//   }
// }
import type { UserToken } from "./src/interfaces/user-token";
import { IUser } from "./src/models/user-model";

declare global {
  namespace Express {
    interface User extends IUser {} 
    interface Request {
      user?: UserToken;
    }
  }
}

export {};
