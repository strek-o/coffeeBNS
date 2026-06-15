# coffeeBNS

Sklep internetowy z ziarnami kawy: przeglądanie katalogu, koszyk, składanie zamówień.

## Stack

| Warstwa                     | Technologia                               |
| --------------------------- | ----------------------------------------- |
| Frontend                    | React + Vite (SPA)                        |
| Backend                     | Django + Django REST Framework (REST API) |
| Baza danych                 | PostgreSQL                                |
| Autentykacja                | JWT (`djangorestframework-simplejwt`)     |
| Uruchomienie                | Docker Compose                            |
| Infrastruktura (opcjonalna) | Terraform - Azure PostgreSQL              |

## Architektura

```
┌──────────────┐    HTTP / JSON    ┌──────────────┐         ┌──────────────┐
│   Frontend   │ ────────────────► │   Backend    │ ──────► │  PostgreSQL  │
│ React + Vite │ ◄──────────────── │ Django + DRF │ ◄────── │     baza     │
│    :5173     │                   │    :8000     │         │    :5432     │
└──────────────┘                   └──────────────┘         └──────────────┘
```

Trzy serwisy uruchamiane przez Docker Compose. Przeglądarka ładuje frontend z
portu `5173`; ten woła REST API backendu na `8000`; backend trzyma dane w
PostgreSQL. Logowanie odbywa się tokenem JWT dołączanym do żądań.

> Pełny opis decyzji architektonicznych i ich uzasadnień: **[docs/adr.md](docs/adr.md)**.

## Funkcje

- Katalog produktów (publiczny)
- Logowanie (JWT) i ochrona endpointów zamówień
- Koszyk - osobny dla każdego użytkownika, trwały po odświeżeniu strony
- Składanie zamówień (tylko zalogowani) i podgląd własnych zamówień
- Panel administracyjny (Django admin) do zarządzania produktami i zamówieniami

## Wymagania

- [Docker](https://www.docker.com/) + Docker Compose

## Uruchomienie

**1. Sklonuj repozytorium** i wejdź do katalogu projektu.

**2. Utwórz plik `.env`** w korzeniu projektu (zawiera sekrety, nie trafia do repo):

```env
DJANGO_SECRET_KEY=zmien-na-dlugi-losowy-klucz
DJANGO_DEBUG=True

POSTGRES_DB=coffeebns
POSTGRES_USER=coffeebns
POSTGRES_PASSWORD=zmien-haslo
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

**3. Uruchom całość jedną komendą:**

```bash
docker compose up --build
```

Podniosą się trzy serwisy: baza, backend (z automatycznymi migracjami) i frontend.

**4. Otwórz w przeglądarce:**

- Aplikacja: <http://localhost:5173>
- API: <http://localhost:8000/api/>
- Panel admina: <http://localhost:8000/admin/>

### Konto administratora

W osobnym terminalu (gdy kontenery działają):

```bash
docker compose exec backend python manage.py createsuperuser
```

Zwykłych użytkowników (klientów) tworzy się w panelu admina: **Users → Add user**.

### Dane przykładowe (opcjonalnie)

Wypełnia bazę przykładowymi produktami:

```bash
docker compose exec backend python manage.py seed
```
