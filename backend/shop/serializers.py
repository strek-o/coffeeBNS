from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price_per_kg",
            "origin",
            "roast_level",
            "is_available",
            "created_at",
        ]
