import { AuthController, AuthService,
         PostController, PostService } from "./api/index";
import App from "./App";
import config from "./config";

(async() => {
  const app = new App({
    controllers: [
      new AuthController(new AuthService()),
      new PostController(new PostService()),
    ],
    port: +config.port,
    dev: config.dev as "dev" | "build"
  });

  await app.listen();
})();