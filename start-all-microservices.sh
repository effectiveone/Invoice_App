#!/bin/bash

echo "🚀 Uruchamianie wszystkich mikroserwisów InvoiceApp..."

# Kolory dla czytelności
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Sprawdzanie wymagań...${NC}"

# Sprawdź czy Docker jest zainstalowany
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker nie jest zainstalowany!${NC}"
    exit 1
fi

# Sprawdź czy Docker Compose jest zainstalowany
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose nie jest zainstalowany!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker i Docker Compose są dostępne${NC}"

# Funkcja do sprawdzania statusu kontenera
check_container() {
    local container_name=$1
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}Sprawdzanie kontenera: $container_name...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if docker ps | grep -q "$container_name"; then
            echo -e "${GREEN}✅ $container_name jest uruchomiony${NC}"
            return 0
        fi
        
        echo "⏳ Próba $attempt/$max_attempts - czekanie na $container_name..."
        sleep 2
        ((attempt++))
    done
    
    echo -e "${RED}❌ $container_name nie uruchomił się w oczekiwanym czasie${NC}"
    return 1
}

# Zatrzymaj istniejące kontenery
echo -e "${YELLOW}🛑 Zatrzymywanie istniejących kontenerów...${NC}"
docker-compose down

# Uruchom infrastrukturę
echo -e "${BLUE}🏗️ Uruchamianie infrastruktury...${NC}"
docker-compose up -d mongodb postgres redis elasticsearch zookeeper kafka

# Sprawdź statusy infrastruktury
check_container "invoice_mongodb"
check_container "invoice_postgres" 
check_container "invoice_redis"
check_container "invoice_elasticsearch"
check_container "invoice_kafka"

echo -e "${YELLOW}⏳ Czekanie 10 sekund na stabilizację infrastruktury...${NC}"
sleep 10

# Uruchom mikroserwisy
echo -e "${BLUE}🎯 Uruchamianie mikroserwisów...${NC}"
docker-compose up -d auth-service invoice-service product-service analytics-service notification-service utility-service-php

# Sprawdź statusy mikroserwisów
check_container "invoice_auth_service"
check_container "invoice_invoice_service"
check_container "invoice_product_service" 
check_container "invoice_analytics_service"
check_container "invoice_notification_service"
check_container "invoice_utility_service"

# Uruchom API Gateway
echo -e "${BLUE}🌐 Uruchamianie API Gateway...${NC}"
docker-compose up -d api-gateway

check_container "invoice_api_gateway"

# Uruchom frontend
echo -e "${BLUE}💻 Uruchamianie Frontend...${NC}"
docker-compose up -d frontend

check_container "invoice_v2_react"

# Uruchom monitoring
echo -e "${BLUE}📊 Uruchamianie monitoringu...${NC}"
docker-compose up -d kibana kafka-ui

check_container "invoice_kibana"
check_container "invoice_kafka_ui"

echo -e "${GREEN}🎉 Wszystkie serwisy zostały uruchomione!${NC}"

echo -e "${BLUE}📋 Status serwisów:${NC}"
echo "=================="
docker-compose ps

echo -e "\n${BLUE}🔗 Dostępne endpointy:${NC}"
echo "======================"
echo -e "${GREEN}Frontend:${NC}           http://localhost:3001"
echo -e "${GREEN}API Gateway:${NC}        http://localhost:5000"
echo -e "${GREEN}Swagger UI:${NC}         http://localhost:5000/api-docs"
echo -e "${GREEN}Product Service:${NC}    http://localhost:3003"
echo -e "${GREEN}Notification Service:${NC} http://localhost:3004"
echo -e "${GREEN}Utility Service:${NC}    http://localhost:3005"
echo -e "${GREEN}Kibana:${NC}             http://localhost:5601"
echo -e "${GREEN}Kafka UI:${NC}           http://localhost:8080"

echo -e "\n${BLUE}📊 Bazy danych:${NC}"
echo "==============="
echo -e "${GREEN}PostgreSQL:${NC}         localhost:5433"
echo -e "${GREEN}MongoDB:${NC}            localhost:27017"
echo -e "${GREEN}Redis:${NC}              localhost:6379"
echo -e "${GREEN}Elasticsearch:${NC}      localhost:9200"

echo -e "\n${YELLOW}💡 Aby zatrzymać wszystkie serwisy, uruchom:${NC}"
echo "   ./stop-all-microservices.sh"
echo "   lub"
echo "   docker-compose down"

echo -e "\n${GREEN}🎯 System mikroserwisów InvoiceApp jest gotowy do użycia!${NC}" 