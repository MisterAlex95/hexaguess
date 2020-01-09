module.exports = {
  apps: [],
  deploy: {
    production: {
      user: "deploy",
      host: "alexdana.me",
      ref: "origin/master",
      repo: "git@github.com:misteralex95/hexaguess.git",
      path: "/home/deploy/hexaguess",
      "post-deploy":
        ". ~/.bashrc && npm install && pm2 reload ecosystem.config.js --env production && npm run build",
      env: {
        NODE_ENV: "production"
      }
    }
  }
};
