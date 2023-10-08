module.exports = {
  apps: [
    {
      name: "JCWD-0108-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3802,
      },
      time: true,
    },
  ],
};
