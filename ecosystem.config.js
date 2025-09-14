module.exports = {
  apps: [
    {
      name: 'astrobiologia-backend',
      script: './dist/server.js',
      cwd: '/home/injunior-infra/dev/projects/astrobiologia-backend',
      exec_mode: 'fork',
      instances: 1,
      max_memory_restart: '512M',

      // Node flags + Environment:
      node_args: '-r dotenv/config --max_old_space_size=512',

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
