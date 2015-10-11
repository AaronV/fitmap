# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

admin = User.create([
  {
    id: 1,
    name: "Aaron",
    email: "aaron.vanderpoel@gmail.com",
    encrypted_password: "$2a$10$SOeRmVpxeH9L94x/m9wecOW7gTT4zlxsVEkyAjGLuC01mxalYQcQ."
  }
])