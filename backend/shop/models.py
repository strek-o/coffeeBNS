from django.db import models


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
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
