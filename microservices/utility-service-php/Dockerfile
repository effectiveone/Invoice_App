FROM php:8.2-apache

# Kopiuj pliki aplikacji
COPY . /var/www/html/

# Ustaw uprawnienia
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Włącz mod_rewrite
RUN a2enmod rewrite

# Otwórz port 80
EXPOSE 80

# Komenda startowa
CMD ["apache2-foreground"] 