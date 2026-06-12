from django.contrib import admin

from .models import Order, OrderItem, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "origin", "roast_level", "price_per_kg", "is_available")
    list_filter = ("roast_level", "is_available")
    search_fields = ("name", "origin")


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "created_at")
    list_filter = ("status",)
    inlines = [OrderItemInline]
