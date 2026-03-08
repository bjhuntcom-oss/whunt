const instances = parseInt(process.env.INSTANCES || "1", 10);

module.exports = {
  apps: [
    {
      name: "whunt",
      script: "./dist/index.js",
      instances: instances,
      exec_mode: instances > 1 ? "cluster" : "fork",
      instance_var: "NODE_APP_INSTANCE",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        // Critical environment variables - ensure these are set in your .env file
        // or passed through the environment when starting PM2
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_READ_URL: process.env.DATABASE_READ_URL,
        SESSION_SECRET: process.env.SESSION_SECRET,
        REDIS_URL: process.env.REDIS_URL,
        // Optional but recommended
        DB_POOL_MAX: process.env.DB_POOL_MAX || "25",
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
        WIDGET_ALLOWED_ORIGINS: process.env.WIDGET_ALLOWED_ORIGINS,
      },
      max_memory_restart: "500M",
      restart_delay: 3000,
      max_restarts: 10,
      kill_timeout: 5000,
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true,
    },
  ],
};
