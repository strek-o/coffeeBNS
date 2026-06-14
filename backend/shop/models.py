from uuid import uuid4

from django.db import models
from django.conf import settings


class Product(models.Model):
    class Roast(models.TextChoices):
        RAW = "raw"
        LIGHT = "light"
        MEDIUM = "medium"
        DARK = "dark"

    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=False)
    price_per_kg = models.DecimalField(max_digits=6, decimal_places=2)
    origin = models.CharField(max_length=100, blank=False)
    roast_level = models.CharField(
        max_length=10,
        choices=Roast.choices,
        default=Roast.RAW,
    )
    is_available = models.BooleanField(default=True)
    image = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Order(models.Model):
    class Status(models.TextChoices):
        NEW = "new"
        PAID = "paid"
        SHIPPED = "shipped"
        COMPLETED = "completed"
        CANCELLED = "cancelled"

    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders",
    )

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.NEW,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.pk}, {self.user}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name="order_items",
    )
    quantity_kg = models.DecimalField(max_digits=5, decimal_places=2)
    unit_price_per_kg = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.product}, {self.quantity_kg}"
