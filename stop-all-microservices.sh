#!/bin/bash

echo "🛑 Zatrzymywanie wszystkich mikroserwisów InvoiceApp..."

# Kolory dla czytelności
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Zatrzymywanie wszystkich kontenerów...${NC}"
docker-compose down

echo -e "${YELLOW}Sprawdzanie statusu...${NC}"
if [ "$(docker ps -q)" ]; then
    echo -e "${BLUE}Pozostałe uruchomione kontenery:${NC}"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    echo -e "${GREEN}✅ Wszystkie kontenery zostały zatrzymane${NC}"
fi

echo -e "\n${BLUE}💾 Opcjonalnie - usunięcie danych:${NC}"
echo "=================================="
echo -e "${YELLOW}Aby usunąć wszystkie volume (UWAGA: utracisz dane!):${NC}"
echo "   docker-compose down -v"
echo ""
echo -e "${YELLOW}Aby usunąć nieużywane obrazy Docker:${NC}"
echo "   docker system prune -f"
echo ""
echo -e "${YELLOW}Aby usunąć wszystko (obrazy, kontenery, sieci, volume):${NC}"
echo "   docker system prune -a --volumes -f"

echo -e "\n${GREEN}🎯 Wszystkie mikroserwisy InvoiceApp zostały zatrzymane!${NC}" 