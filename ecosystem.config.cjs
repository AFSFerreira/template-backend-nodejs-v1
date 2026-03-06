module.exports = {
  apps: [
    {
      name: 'astrobiologia-staging',
      script: './dist/server.mjs',
      cwd: '/home/injunior-infra/dev/projects/astrobiologia-backend',
      max_memory_restart: '512M',

      // Node flags + Environment:
      node_args: '--env-file=.env --max-old-space-size=512',

      // Logging:
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      log_date_format: 'DD-MM-YYYY HH:mm:ss Z',
      log_type: 'json',

      // Hardening:
      restart_delay: 4000,
      min_uptime: '5s',
      max_restarts: 10,
    },
    {
      name: 'astrobiologia',
      script: './dist/server.mjs',
      cwd: '/home/astrobiologia-infra/infra/astrobio-infra/projects/astrobiologia-backend',

      // Cluster mode:
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '1.5G',

      // Node flags + Environment:
      node_args: '--env-file=.env --max-old-space-size=1536',

      // Logging:
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      log_date_format: 'DD-MM-YYYY HH:mm:ss Z',
      log_type: 'json',

      // Hardening:
      restart_delay: 4000,
      min_uptime: '5s',
      max_restarts: 10,

      // Graceful Shutdown:
      wait_ready: true,
      listen_timeout: 10000, // 10s to "ready"
      kill_timeout: 5000,    // 5s to kill process
    },
  ],
}
