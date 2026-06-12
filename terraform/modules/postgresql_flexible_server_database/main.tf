resource "azurerm_postgresql_flexible_server_database" "this" {
  name      = var.name
  server_id = var.server_id
  charset   = var.charset
  lifecycle {
    prevent_destroy = false
  }
}
