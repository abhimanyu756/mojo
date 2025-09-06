# MySQL Database Setup for EcoFinds

This guide will help you set up MySQL database for the EcoFinds project.

## Prerequisites

1. **Install MySQL Server**
   - **Windows**: Download from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)
   - **macOS**: `brew install mysql`
   - **Ubuntu/Debian**: `sudo apt-get install mysql-server`
   - **CentOS/RHEL**: `sudo yum install mysql-server`

2. **Install MySQL Client for Python**
   ```bash
   pip install mysqlclient
   ```
   
   If you encounter issues installing mysqlclient:
   - **Windows**: Install Microsoft Visual C++ Build Tools
   - **macOS**: `brew install mysql-client pkg-config`
   - **Ubuntu/Debian**: `sudo apt-get install python3-dev default-libmysqlclient-dev build-essential`

## Quick Setup

1. **Start MySQL Service**
   ```bash
   # Windows (as Administrator)
   net start mysql
   
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

2. **Configure Environment Variables**
   
   Copy `.env.example` to `.env` and update the database credentials:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   DB_NAME=ecofinds
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   DB_PORT=3306
   ```

3. **Run the Setup Script**
   ```bash
   python setup_mysql.py
   ```
   
   This script will:
   - Create the database if it doesn't exist
   - Run Django migrations
   - Optionally create a superuser account

## Manual Setup (Alternative)

If you prefer to set up manually:

1. **Create Database**
   ```sql
   mysql -u root -p
   CREATE DATABASE ecofinds CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   GRANT ALL PRIVILEGES ON ecofinds.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

2. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

## Database Configuration Details

The MySQL configuration in `settings.py` includes:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME', default='ecofinds'),
        'USER': config('DB_USER', default='root'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='3306'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        },
    }
}
```

## Troubleshooting

### Common Issues:

1. **"Access denied for user 'root'@'localhost'"**
   - Reset MySQL root password
   - Update DB_PASSWORD in .env file

2. **"Can't connect to MySQL server"**
   - Ensure MySQL service is running
   - Check DB_HOST and DB_PORT in .env file

3. **"mysqlclient installation failed"**
   - Install system dependencies (see Prerequisites)
   - Try alternative: `pip install PyMySQL` and add to settings.py:
     ```python
     import pymysql
     pymysql.install_as_MySQLdb()
     ```

4. **"Database doesn't exist"**
   - Run the setup script: `python setup_mysql.py`
   - Or create manually using MySQL command line

### Useful Commands:

```bash
# Check MySQL service status
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Connect to MySQL
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use database
USE ecofinds;

# Show tables
SHOW TABLES;
```

## Production Considerations

For production deployment:

1. **Create a dedicated MySQL user**
   ```sql
   CREATE USER 'ecofinds_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON ecofinds.* TO 'ecofinds_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Update environment variables**
   ```env
   DB_USER=ecofinds_user
   DB_PASSWORD=strong_password
   ```

3. **Enable SSL connections**
4. **Set up regular backups**
5. **Configure proper firewall rules**

## Backup and Restore

### Backup
```bash
mysqldump -u root -p ecofinds > ecofinds_backup.sql
```

### Restore
```bash
mysql -u root -p ecofinds < ecofinds_backup.sql
```