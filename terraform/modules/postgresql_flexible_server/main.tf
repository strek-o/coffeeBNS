resource "azurerm_postgresql_flexible_server" "this" {
  name                          = var.name
  resource_group_name           = var.resource_group_name
  location                      = var.location
  administrator_login           = var.administrator_login
  administrator_password        = var.administrator_password
  backup_retention_days         = var.backup_retention_days
  create_mode                   = var.create_mode
  public_network_access_enabled = var.public_network_access_enabled
  sku_name                      = var.sku_name
  storage_mb                    = var.storage_mb
  version                       = var._version
}
