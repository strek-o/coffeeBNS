module "resource_group" {
  source   = "./modules/resource_group"
  name     = "coffeebns-rg"
  location = "francecentral"
}

module "postgresql_flexible_server" {
  source                 = "./modules/postgresql_flexible_server"
  name                   = "coffeebns-psql"
  resource_group_name    = module.resource_group.name
  location               = module.resource_group.location
  administrator_login    = var.administrator_login
  administrator_password = var.administrator_password
}

module "postgresql_flexible_server_database" {
  source    = "./modules/postgresql_flexible_server_database"
  name      = "coffeebns-psqldb"
  server_id = module.postgresql_flexible_server.id
}

module "postgresql_flexible_server_firewall_rule" {
  source    = "./modules/postgresql_flexible_server_firewall_rule"
  name      = "AllowAll"
  server_id = module.postgresql_flexible_server.id
}