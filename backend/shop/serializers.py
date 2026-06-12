from django.db import transaction
from rest_framework import serializers

from .models import Order, OrderItem, Product


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


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity_kg", "unit_price_per_kg"]
        read_only_fields = ["unit_price_per_kg"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "status", "created_at", "items"]
        read_only_fields = ["user", "status", "created_at"]

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError("Order must contain at least one item.")
        for item in items:
            if not item["product"].is_available:
                raise serializers.ValidationError(
                    f"Product '{item['product'].name}' is not available."
                )
        return items

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item in items_data:
            product = item["product"]
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity_kg=item["quantity_kg"],
                unit_price_per_kg=product.price_per_kg,
            )
        return order
