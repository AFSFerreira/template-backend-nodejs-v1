export default {
  apps: [
    {
      name: 'astrobiologia-backend',
      script: './dist/server.js',
      cwd: '/home/injunior-infra/dev/projects/astrobiologia-backend',
      max_memory_restart: '256M',

      // Node flags + Environment:
      node_args: '--env-file=.env',

      // Logging:
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      log_date_format: 'DD-MM-YYYY HH:mm:ss Z',
      log_type: 'json',

      // Hardening:
      restart_delay: 4000,
      min_uptime: '5s',
      max_restarts: 10
    }
  ]
}
