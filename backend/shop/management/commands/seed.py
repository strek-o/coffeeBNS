import json

from django.conf import settings
from django.core.management.base import BaseCommand

from shop.models import Product

DATA_FILE = settings.BASE_DIR / "data" / "products.json"


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open(DATA_FILE, encoding="utf-8") as f:
            products = json.load(f)

        created_count = 0
        updated_count = 0

        for entry in products:
            data = dict(entry)
            name = data.pop("name")
            _, created = Product.objects.update_or_create(name=name, defaults=data)
            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seed completed. Created {created_count} products, {updated_count} products updated."
            )
        )
